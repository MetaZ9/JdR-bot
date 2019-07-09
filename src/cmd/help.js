const CmdIndex = require('./index.js');
const helpMessageList = require('help.json');
var helpMessages = ['Look ! An error'];		// Au cas où les deux fonctions foirent, ça te permet d'avoir un cas d'erreur
											// Je la mets en global pour éviter d'avoir à la passer en paramètre

function sendHelp(command)
{
	helpingString = command ? prepareDetailedHelp(command) : prepareCommandList();
	sendHelpMessage(helpingString);
}

function prepareCommandList()
{
	for (var command in CmdIndex)
	{
		var currentCommand = helpMessageList[command];
		helpMessages.push({name: currentCommand.name, desc: currentCommand.shortDesc});
	}
}

module.exports = sendHelp;