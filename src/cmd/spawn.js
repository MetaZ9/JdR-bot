const {owner, gm} = require("./../auth.json");
const {flatten} = require("lodash");
const {DMChannel} = require("discord.js");

module.exports = function(message) {
	return function() {
		if (message.channel instanceof DMChannel &&
			flatten([owner, gm]).includes(message.author.id)) {
			// send help
		} 
	};
};