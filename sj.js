const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, MessageEmbed } = require("discord.js");
const VirusTotalApi = require("virustotal-api");
const virusTotal = new VirusTotalApi("988616a0cbe95e098dd2b2725cb922d88741ea31619f0f7729bc3858fc1b7da0");
const fetch = require('node-fetch');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('test')
		
		.addAttachmentOption((option) => option
		.setRequired(true)
		.setName('tarat')
		.setDescription('Taranacak Dosyayı Seçin')),
	async execute(interaction) {
		if(!interaction.isCommand()) return;
		const attachment = interaction.options.getAttachment('attachment');
		virusTotal
		.fileScan(attachment)
		.then(res => {
			let resource = res.resource;
			virusTotal.fileReport(resource).then(async result => {
				console.log(result)
				const a = '`'

				var check = result.positives > 0
				var sonuc = check ? check.join(`${a}Dosya Zararlı KAÇ!!!${a}`) : `${a}dosya zararlı değil${a}`;

				if(check = true) {
					const embedo = new MessageEmbed()
				.setTitle('Tarama Sonuçları')
				.setDescription(`Durum: ${sonuc}`)
				.setURL(result.permalink)
				.setThumbnail('https://www.citypng.com/public/uploads/preview/-31622652360keqnmdomq3.png')
				.setColor('#0051DB');

					await interaction.reply({embeds: [embedo]});
				}
				else {
					const embedx = new MessageEmbed()
				.setTitle('Tarama Sonuçları')
				.setDescription(`Durum: ${sonuc}`)
				.setURL(result.permalink)
				.setThumbnail('https://w7.pngwing.com/pngs/1007/768/png-transparent-check-mark-x-mark-others-angle-logo-desktop-wallpaper.png')
				.setColor('#DB1700');

					await interaction.reply({embeds: [embedx]});
				}
			})
			.catch(err => console.log(`Scan Failed. ${err}`));
		})
	},
};
