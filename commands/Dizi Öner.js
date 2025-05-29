const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb('6c1d7c48d27222dd4b6b9f2a2b547116')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dizi_öner')
		.setDescription('Bu Komut İle Enfes Dizi Önerileri Alabilirsiniz !'),
	async execute(interaction) {
		if(!interaction.isCommand()) return;
        /*interaction.reply({content: 'Test Komutudur !!!', ephemeral: true})*/
        const num = Math.floor(Math.random () * 19)
        moviedb
        .trending({media_type: 'tv', time_window: 'week'}) // trend dizileri çektim
        .then((res) => {
            var trendId = res.results[num].id

        moviedb                                          // rastgele belirlenen trend dizinin bütün bilgilerini çektim
        .tvInfo({id: trendId, language: 'tr'}) // Params olup query string girmen gerektiğinde (dil mesela) bu şekilde yap // .tvInfo({id: trendId, language: 'tr'})
        .then(async (resInfo) => {
            //arrayde olan bütün dizinleri alıyo
            const noNull = resInfo.genres.filter(x => x !== null).map(x => x.name);
            const veri = noNull ? noNull.join(" / ") : "Veri Bulunamadı";
            //end

            //Yapımcılar için arradye olan bütün dizinleri alıyor
            const noNull2 = resInfo.created_by.filter(x => x !== null).map(x => x.name);
            const yapimcilar = noNull2.length !== 0 ? noNull2.join(' & ') : 'Bulunamadı!';
            //end

            var tirnak = '```'
            var airdate = resInfo.first_air_date.slice(0,4)
            var vote = resInfo.vote_average.toString().slice(0,3)
            var embed = new MessageEmbed()
           // .setAuthor({name: resInfo.created_by[0].name})
            .setTitle(resInfo.name) 
            .setThumbnail(`https://image.tmdb.org/t/p/original${resInfo.poster_path}`)
            .setImage(`https://image.tmdb.org/t/p/original${resInfo.backdrop_path}`)
            .setDescription(resInfo.overview)
            .addFields(
                {name: 'Tür', value: `${tirnak}${veri}${tirnak}`, inline: true},
                {name: 'Yapımcılar', value: `${tirnak}${yapimcilar}${tirnak}`, inline: true},
                {name: '゜', value: `${tirnak}${airdate} | ${resInfo.spoken_languages[0].english_name} | ☆${vote}${tirnak}`}
            )
            const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setLabel('Dizi Ana Sayfası')
						.setURL(resInfo.homepage)
						.setStyle('LINK'),
				);
            await interaction.reply({embeds: [embed], components: [row]})         
        })
        })
	},
};
