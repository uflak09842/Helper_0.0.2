const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, MessageEmbed, MessageAttachment } = require("discord.js");
const VirusTotalApi = require("virustotal-api");
const virusTotal = new VirusTotalApi("988616a0cbe95e098dd2b2725cb922d88741ea31619f0f7729bc3858fc1b7da0");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tarat')
		.setDescription(`Bu Komut Sayesinde Yükleyeceğiniz Dosyanın Güvenli Olup Olmadığını Doğrulayabilirsiniz!`)
		
		.addAttachmentOption((option) => option
		.setRequired(true)
		.setName('tarat')
		.setDescription('Nitro Sahibi Değilseniz 8mb üstü dosya yükleyemezsiniz !')),
	async execute(interaction) {
		if(!interaction.isCommand()) return;
		
		
		const attachment = interaction.options.getAttachment('tarat');

		virusTotal
		.fileScan(attachment)
		.then(res => {
			let resource = res.resource;
			virusTotal.fileReport(resource).then(async result => {
				//console.log(result)
				var a = '`'
				var check = result.positives > 0;
				if(check = true) {
					var embed = new MessageEmbed()
					.setTimestamp()
					.setURL(result.permalink)
					.setTitle('Dosya Durumu')
					.setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
					.addFields(
						{ name: 'Sonuç', value: `${a}Temiz${a} :white_check_mark:`, inline: true},
						{ name: '\u200B', value: '\u200B' },
						{ name: 'Dosya Değerleri', value: `**Sha1:** ${a}${result.sha1}${a}\n**Sha256:** ${a}${result.sha256}${a}\n**Md5:** ${a}${result.md5}${a}\n!!!\n${a}Bu Komut Henüz Test Aşamasında!${a}`},
					)
					.setFooter({text: 'Virus Total', iconURL: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/virustotal_logo_icon_171247.png'})
					.setThumbnail('https://img.cppng.com/download/2020-06/27895-7-green-tick-transparent.png')
					.setColor('#00FF00');

					await interaction.deferReply();
					await wait(1000);
					await interaction.editReply({embeds: [embed], files: [attachment]});
				}
			})
			.catch(err => console.log(`Scan Failed. ${err}`));
		})
	},
};
