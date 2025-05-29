const { MessageEmbed, Client, Intents } = require('discord.js');
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((p, c) => p + c, 0)});

module.exports = {
    name: 'guildCreate',
    execute(gCreate) {
    const a = '`'
	const owner = gCreate.members.cache.get(gCreate.ownerId)

	const embed = new MessageEmbed()
	.setTitle('Yeni Sunucuya Eklendim !!!')
	.setDescription('**Sunucu Bilgileri**')
	.addFields(
		{name: `Sunucunun Adı:`, value: `${a}${gCreate}${a}`},
		{name: 'Sunucu Sahibi:', value: `${a}${owner.user.tag}${a}`},
		{name: 'Sunucunun Oluşturulduğu Tarih:', value: `${a}${gCreate.createdAt}${a}`},
	);
	console.log(`Beni yeni sunucuya eklediler ! ${gCreate} \n Detayları cokbeklerrsiniz #yeni-sunucular da görebilirsin.`);

	global.client.channels.resolve("1043518336564207756").send({embeds: [embed]});
    }
}