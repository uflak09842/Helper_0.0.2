const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { MovieDb } = require('moviedb-promise')
const { TMDBAPI } = require(../config.json) 
const moviedb = new MovieDb(TMDBAPI)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('film_öner')
		.setDescription('Bu Komut Sayesinde Günün Popüler Filmlerini Görebilirsiniz!'),
	async execute(interaction) {
        if(!interaction.isCommand()) return;
        const num = Math.floor(Math.random () * 19)
		moviedb
		.moviePopular({ language: 'tr'})
        .then((res) => {
			var ytLink = 'https://www.youtube.com/watch?v='
			var movieId = res.results[num].id
            var tırnak = '`' // embedda `` içine alıp kod gibi yazdırmayı sağlıyor bu sayede de embed daha düzenli :D
            var space = ' ' // boşluk manasında :D bi alt satıra geçirip temiz görüntü için kullandım
            const embed = new MessageEmbed()
            .setColor('DARK_GOLD')
            .setThumbnail(`https://image.tmdb.org/t/p/original${res.results[num].poster_path}`) // bu baştaki link ana resim linki sitenin sonrasından gelen çektiğimiz veri /dg45JSFKLJ.jpg olark geldi için böyle kullanmak gerek
            .setImage(`https://image.tmdb.org/t/p/original${res.results[num].backdrop_path}`)
            .setTitle(`Günün Popüler Filmleri #${num}`) //kullanımı bu şekilde res.results da ki ilk [] array ı çektik ve içinden .title ile title değerini yazdırdık
            .setDescription('**--------------------------------------**')
            .addFields(
                { name: `Film Hakkında Bilgiler\n----------------------------`, value: `**İsmi:** ${tırnak}${res.results[num].title}${tırnak}\n${space}\n**Orjinal İsmi:** ${tırnak}${res.results[num].original_title}${tırnak}\n${space}\n**Orjinal Dili:** ${tırnak}${res.results[num].original_language}${tırnak} **Yapım Yılı:** ${tırnak}${res.results[num].release_date}${tırnak} **Puanı:**${tırnak}☆ ${res.results[num].vote_average}${tırnak}`},
                //{ name: `İsmi: ${tırnak}${res.results[0].title}${tırnak}`, value: `Orjinal İsmi: ${tırnak}${res.results[0].original_title}${tırnak}\n${space}\ndsa: ${tırnak}${res.results[0].overview}${tırnak}`}
            )
            .addField(`Özet:`,`${tırnak}${res.results[num].overview}${tırnak}`);

			moviedb
			.movieVideos(movieId)
			.then((res) => {
				var trailerResult = res.results.filter(result => result.type == "Trailer") // type: 'Trailer' olan arraylere filtreliyor
               console.log(trailerResult[0].key);

				var url = ytLink + trailerResult[0].key
				const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setLabel('Fragman')
						.setURL(url)
						.setStyle('LINK'),
				);

				interaction.reply({embeds: [embed], components: [row]})
			})
        })
	},
};
