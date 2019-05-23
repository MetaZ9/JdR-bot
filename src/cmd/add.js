const Rule = require('./rule.js');
const Content = require('./content.js');

function addNewContent(contentType, ...paramValues) {
	let target = {};

	if (contentType === "rule") {
		target = new Rule();
	} else if (contentTypeExists(contentType)) {
		target = new Content();
	}

	let newContent = listArrayToMap(paramValues);
	target.create(newContent);
}

function contentTypeExists(contentType) {
	// check if this form of content exists in the ruleset
	// check contentTypes in the ruleset
}

//***************************************** TMP - Mettre dans un script utils.js
function listArrayToMap(...paramValues) {
	let object = {};

	for (var i = 0; i < paramValues.length - 1; i + 2) {
		object[paramValues[i]] = paramValues[i+1];
	}

	return object;
}

module.exports = addNewContent;