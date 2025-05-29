

module.exports = {
	name: 'ready',  // hangi event için yaptık bu komutu onu belirttik
	once: true,  // boolean değeri bu eventin sadece bir kez çalışıp çalışmayacağını belirtiyor true dediğim için bir kez çalışacak
	execute(client) { // event ismi client.on('ready') demek yerine name yerinde ready yi tanıttık burda da client'i
		client.user.setActivity({
			name: "Rias'ı",
			type: 'WATCHING'
		})
		console.log(`${client.user.tag} 0NLİNE !!!`);
	},
};

