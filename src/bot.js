const {Client} = require("discord.js");
const config = require("./config.json");
const Gabriel = new Client();

Gabriel.on("message", message => {
	if (message.content.startsWith("g!")) {
		message.channel.send("pouet");
	}
});

Gabriel.login(config.token);