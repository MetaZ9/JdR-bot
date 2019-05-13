const {owner, gm} = require("./../auth.json");
const Rule = require("./")
const {flatten} = require("lodash");

module.exports = function(message) {
	return function(...args) {
		if (flatten([owner, gm]).includes(message.author.id)) {
			// send help 
		}
	}
};