const Rule = require('./rule.js');
const Content = require('./content.js');

function addNewContent(contentType, ...paramValues) {
	let target = {
		[contentType === "rule"]: new Rule(),
		[contentTypeExists(contentType)]: new Content()
	}["true"] || undefined;

	if (target) {
		let newContent = listArrayToMap(paramValues);
		return target.create(newContent);
	} else {
		// erreur: contenu existant
	}
}

function contentTypeExists(contentType) {
	// check if this form of content exists in the ruleset
	// check contentTypes in the ruleset
}

//***************************************** TMP - Mettre dans un script utils.js
function listArrayToMap(...paramValues) {
	let Item = {};

	for (var i = 0; i < paramValues.length - 1; i + 2) {
		Item[paramValues[i]] = paramValues[i+1];
	}

	return Item;
}

module.exports = addNewContent;
