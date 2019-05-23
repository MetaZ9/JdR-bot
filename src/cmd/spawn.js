const {owner, gm} = require("./../auth.json");
const {flatten} = require("lodash");
const {DMChannel} = require("discord.js");

//add RPG element to session pool
//args
//1 : content type
//2 : content name
//3 : object name in pool
function addPoolObject(contentType, contentName, poolName) {
	// body...
}

module.exports = addPoolObject;

/*
module.exports = function(message) {
	return function() {
		if (message.channel instanceof DMChannel &&
			flatten([owner, gm]).includes(message.author.id)) {
			// send help
		}
	};
};*/