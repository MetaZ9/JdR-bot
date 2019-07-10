const Help = require("./help.js");
const {RichEmbed} = require("discord.js");

module.exports = function sendMessage(message) {
	return function(arg) {
		let [cmd] = arg;
		try {
			let payload = createHelp(cmd || "");
			let embeds = createEmbeds(payload);
			Promise.all(embeds.map(embed => {
				return message.channel.send(embed);
			}));
		} catch (e) {
			console.log(e);
			message.channel.send("An error occured. Please refer to the console for more details.");
		}
	};
};

function createEmbeds(payload) {
	if (Array.isArray(payload)) {
		return payload.map(spawnEmbed);
	} else if (payload instanceof Object) {
		return [createSimpleEmbed(payload)];
	}
};

function createSimpleEmbed(payload) {
	let newEmbed = new RichEmbed({
		color: random(),
		title: `Single command (${payload.name})`,
		fields: [{ name: "Short description", value: payload.shortDesc }, { name: "Detailed description", value: payload.longDesc },
				 { name: "Syntax", value: payload.syntax }, { name: "Example", value: payload.example })]
	});

	return newEmbed;
};

function spawnEmbed(payload, i, array) {
	let newEmbed = new RichEmbed({
		title: "Command list",
		color: random(),
		footer: `Page ${i+1} of ${array.length}.`,
		fields: payload.map(formatPayload({name: "name", value: "shortDesc"}))
	});

	return newEmbed;
};

function random() {
	return +`0x${Array.from({length: 3}).map(slot => {
		let color = Math.random() * 255;
		return color.toString(16);
	}).join("")}`;
};

function formatPayload({name, value}) {
	return function(item) {
		return {
			name: item[name],
			value: item[value]
		};
	};
};
