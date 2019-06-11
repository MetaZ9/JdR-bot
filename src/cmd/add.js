const Rule = require('./../rule.js');
const Content = require('./../content.js');
const Session = require("./../session.js");

function addNewContent(message) {
	let {attachments} = message;
	if (!attachments.size) {
		throw new Error(`"Add" command must have at least one JSON file attached with it.`);
	}
	if (attachments.size > 1) {
		throw new Error("More than one attachment were detected. Please limit yourself to a single attachment.");
	}
	return function(args) {
		const [contentType, contentName] = args;
		const file = attachments.first();
		if (!file.url.endsWith(".json")) {
			throw new Error("The provided file was not a .json file.");
		} else {
			fs.readFile(file.url, "utf-8").then(handleJSON(message, contentType, contentName));
		}
	};

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
};

function handleJSON(message, contentType, contentName) {
	return function(err, data) {
		if (err) {
			throw err;
		}
		let jason = JSON.parse(data);
		validateCustomContent(jason, contentType);
		let assignedClass = contentType === "rule" ? Rule : Content;
		assignedClass.set(jason, {contentType});
	};
};

function validateCustomContent(json, contentType) {
	if (contentType in Session.currentRPG.contentTypes) {
		let content = Session.currentRPG.contentTypes[contentType];
		if (typeof content.validate !== "function") {
			throw new Error("You must provide a validation function for your content type.");
		} else if (typeof content.name !== "string") {
			throw new Error("Content name must be a string.");
		} else {
			content.validate(json);
		}
	} else {
		throw new Error(`Unknown content type "${contentType}" (current RPG: ${Session.currentRPG.name}).`);
	}
};


function contentTypeExists(contentType) {
	// check if this form of content exists in the ruleset
	// check contentTypes in the ruleset
}

//***************************************** TMP - Mettre dans un script utils.js
/*function listArrayToMap(...paramValues) {
	let Item = {};

	for (var i = 0; i < paramValues.length - 1; i + 2) {
		Item[paramValues[i]] = paramValues[i+1];
	}

	return Item;
}*/

module.exports = addNewContent;