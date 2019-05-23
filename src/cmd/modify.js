const {owner, gm} = require("./auth.json");
const Content = require("./../content.js");
const {flatten} = require("lodash");

function modifyContent(contentName, contentType, ...paramValues) {
	// check if content Type exists
	// fetch content from content name
	// transforme paramValues en Map
	// apply modifications to object
	// content.alterContent(blablabla)
}

//***************************************** TMP - Mettre dans un script utils.js
function listArrayToMap(...paramValues) {
	let object = {};

	for (var i = 0; i < paramValues.length - 1; i + 2) {
		object[paramValues[i]] = paramValues[i+1];
	}

	return object;
}


module.exports = modifyContent;
/*
module.exports = function(message) {
	return function(...args) {
		if (flatten([owner, gm]).includes(message.author.id)) {
			// send help
		}
	};
};
*/