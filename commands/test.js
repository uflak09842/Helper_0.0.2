const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, StageInstanceManager } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Test!'),
	async execute(interaction) {
		if(!interaction.isCommand()) return;

		await interaction.reply({content: '[Test !](https://google.com)', ephemeral: true});
	},
};
