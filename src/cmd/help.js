const cmdIndex = require('./index.js');
const json = require("./help.json");
const helpMessageList = require('./help.json');
const {chunk} = require("lodash");
// var helpMessages = ['Look ! An error'];		// Au cas où les deux fonctions foirent, ça te permet d'avoir un cas d'erreur
											// Je la mets en global pour éviter d'avoir à la passer en paramètre
// on va laisser discord_help.js gérer les erreurs et l'envoi, pour purifier la fonction de création de help

function createHelp(command) {
	if (command) {
		return prepareDetailedHelp(command);
	} else {
		return prepareCommandList();
	}
};

/*function sendHelp(command) {
	helpingString = command ? prepareDetailedHelp(command) : prepareCommandList();
	sendHelpMessage(helpingString);
	//Est-ce que je pousse le vice jusqu'au bout en faisant sendHelpMessage(command ? prepareDetailedHelp(command) : prepareCommandList()); :} ?
};*/

// t'auras peut-être ton mot à dire pour le truc donc je mets en commentaire just in case

function prepareCommandList() {
	let helpMessages = [];
	for (var helpCommand in helpMessageList) {
		helpMessages.push({name: helpCommand.name, desc: helpCommand.shortDesc});
	}
	return chunk(helpMessages, 25); // un embed de discord supporte 25 champs maximum
};


function prepareDetailedHelp(command) {
	if (command && !cmdIndex[command]) {
		throw new Error(`Unknown command: ${command}`);
	}

	if (command && !json[command]) {
		throw new Error(`No entry available for command ${command}.`);
	}
	if (!command)
		return;						//should not be here => error | Pas nécessaire, juste pour test au début
	
	return json[command];
	// helpMessages.push(helpMessageList[command]);
};

module.exports = createHelp;