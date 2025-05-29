const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');
const path = require('node:path');
const { clientId, guildId, guildId2, token } = require('./config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

/*
Global yapmak için;
rest.put(     Routes.applicationCommands(clientId),     { body: commands }, );
*/
rest.put(Routes.applicationCommands(clientId), { body: commands },) //
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);