const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'inviteCreate',
    execute(invite) {
        var exdateVar = new Date(invite.expiresTimestamp)  // zamanı almamı sağlıyor
    var date    = exdateVar.toLocaleDateString("tr")
    var time    = exdateVar.toLocaleTimeString("tr")

    var dateVar = new Date(invite.createdAt)    // zamanı almamı sağlıyor
    var date2 = dateVar.toLocaleDateString("tr")
    var time2 = dateVar.toLocaleTimeString("tr")

    const inviteEmbed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle("Tarafından Yeni Davet Oluşturuldu !")
    .setAuthor({ name: `${invite.inviter.tag}`, iconURL: `${invite.inviter.displayAvatarURL()}`}) //  parametresini girdik ve .displayAvatarURL() ile kişinin profil fotosunu çıktı aldık
    .addFields(
		{ name: `**Detaylar**`, value: `**---------------**` },
        { name: 'Davet Oluşturulan Sunucu:', value: `${invite.guild.name}`, inline: true},
        { name: `**Davet Oluşturulan Kanal:**`, value: `${invite.channel}`, inline: true},
		//{ name: '\u200B', value: '\u200B' }, //alttaki satırlara baya boşluk bıraktırıp yazdırıyor
        { name: 'Davet Kodu:', value: `${invite}`, inline: true },
		{ name: 'Oluşturulma Tarihi:', value: `${date2} ${time2}`, inline: true },
	)
    .addField('Bitiş Tarihi:', `${date} ${time}`, true)      
    .setThumbnail(invite.guild.iconURL())                                           

    console.log("yeni davet oluşturuldu");              //${burda davet oluşturulduğu zaman daveti oluşturan kişiyi yazdırdım}                                            //${checkDays(membed.user.creationDate())}
    invite.guild.channels.cache.get("1043518336564207756").send({embeds: [inviteEmbed]}); // execute(invite) olduğu için hep invite kullan !!!
    }

};