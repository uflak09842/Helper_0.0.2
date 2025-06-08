//TANIMLAMALAR
const { Client, Collection, Intents, Interaction, MessageEmbed, MessageActionRow, MessageButton, UserManager, Message, Guild } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { token } = require('./config.json');
// END

// Create a new client instance // Bütün izinleri aldık böylece
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((p, c) => p + c, 0)});

global.client = client;
//END

// COMMANDS KLASÖRÜNÜ ÇEKİYO VE İÇİNDEKİ .JS UZANTILILARI AYIKLIYOR 
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	
	client.commands.set(command.data.name, command);
}
//END

// EVENTS KLASÖRÜNÜ ÇEKİYOR VE İÇİNDEKİ .JS LERİ AYIKLIYOR
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// SLASH KOMUTTA HATA OLURSA BU ÇALIŞIYOR
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	const row = new MessageActionRow()
	.addComponents(
		new MessageButton()
		.setLabel('Destek Sunucusu')
		.setURL('https://discord.gg/hD2Hxuhnyk')
		.setStyle('LINK'),
	);

	const embed = new MessageEmbed()
	.setColor('ff0000')
	.setTitle('**❌ ÖLÜMCÜL HATA ❌**')
	.addFields(
		{ name: '**Komut Kullanılırken Bir Sorun Oluştu**', value: '--------------------------------------------------------'},
		{ name: '**Destek Almak Veya Sorunu Bildirmek İçin;**', value: "Aşağıdaki Butona Tıklayıp Karşılaştığınız Sorunu\ncanskld#4439'a Bildirebilirsiniz."},
	);


	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({embeds: [embed], components: [row], ephemeral: true });
	}
});
//END

/*const fetch = require('node-fetch');
const VirusTotalApi = require("virustotal-api");
const virusTotal = new VirusTotalApi("988616a0cbe95e098dd2b2725cb922d88741ea31619f0f7729bc3858fc1b7da0");

client.on('message', async (message) => {
	if (message.author.bot) return;
  
	// get the file's URL
	const file = message.attachments.first()?.url;
	if (!file) return console.log('No attached file found');
  
	try {
	  message.channel.send('Reading the file! Fetching data...');
  
	  // fetch the file from the external URL
	  const response = await fetch(file);
  
	  // if there was an error send a message with the status
	  if (!response.ok)
		return message.channel.send(
		  'There was an error with fetching the file:',
		  response.statusText,
		);

		virusTotal
		.fileScan(response)
		.then(vtResponse => {
			let resource = vtResponse.resource;
			virusTotal.fileReport(resource).then(result => {
				console.log(result);
			})
		})
		.catch(err => console.log(`Scan Failed. ${err}`));
  
	  // take the response stream and read it to completion
	  const text = await response.text();
  
	  if (text) {
		message.channel.send(`\`\`\`${text}\`\`\``);
	  }
	} catch (error) {
	  console.log(error);
	}
});
*/


client.on('guildMemberRemove', memberremove => {
	const channel = memberremove.guild.channels.cache.find(channel => channel.id === "987015614897979392")
	if(!channel) return;

	var embed = new MessageEmbed()
	.setTitle('asd')
	.setDescription(`asd ${memberremove}`)
	channel.send({embeds: [embed]})
})*/

// Discord a client tokeni ile giriş yapmanı sağlar (botun kimliği yani)
client.login(token);
