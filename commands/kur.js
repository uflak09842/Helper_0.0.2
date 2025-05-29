const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kur')
		.setDescription('Tl Kurunu Gösterir. Durma Dene!'),
	async execute(interaction) {
		if(!interaction.isCommand()) return;
		fetch('http://hasanadiguzel.com.tr/api/kurgetir')
			.then(response => response.json())
			.then((data) => {
				var embed = new MessageEmbed()
            .setColor('#4eff26')
            .setThumbnail('https://i.imgur.com/iV6fO1V.png') // forumlar için olan linki kullan
            .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
            .setTitle('**TL Kuru**')
            .setDescription(`--------------------------------------------`) // 5
            .addFields(                                       
                {name: '**💵 Dolar**\n------------', value: `**${data.TCMB_AnlikKurBilgileri[0].ForexBuying.toString().slice(0,5)} ₺**`, inline: true}, // bu metodla daha okunabilir şekilde veriyi kullanıcıya gösterdim yani saf dolar kuru 17.280110592707793 iken bunu slice a 0,5 değerini vererek 17.28 e çevirdim daha okunabilir değil mi :D
                {name: '**💶 Euro**\n-----------', value: `**${data.TCMB_AnlikKurBilgileri[3].ForexBuying.toString().slice(0,5)} ₺**`, inline: true },
                {name: '<:sterlin:986341493025407048> **Sterlin**\n--------------', value: `**${data.TCMB_AnlikKurBilgileri[4].ForexBuying.toString().slice(0,5)} ₺**`, inline: true },
                { name: '\u200B', value: '\u200B' },
                {name: 'Diğer Birimler\n-------------------', value: `**fr** Frank: ${data.TCMB_AnlikKurBilgileri[5].ForexBuying.toString().slice(0,5)} ₺ \n**kr** Kron: ${data.TCMB_AnlikKurBilgileri[6].ForexBuying.toString().slice(0,4)} ₺`, inline: true},
            )
            .addField('_\n-----------------------_', `**¥** Yen: ${data.TCMB_AnlikKurBilgileri[11].ForexBuying.toString().slice(0,5)} ₺ \n**CN¥** Yuan: ${data.TCMB_AnlikKurBilgileri[16].ForexBuying.toString().slice(0,5)} ₺`, true);
				interaction.reply({embeds: [embed]})
			})
	},
};
