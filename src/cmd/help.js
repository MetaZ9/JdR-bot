const CmdIndex = require('./index.js');
const helpMessageList = require('help.json');
var helpMessages = ['Look ! An error'];		// Au cas où les deux fonctions foirent, ça te permet d'avoir un cas d'erreur
											// Je la mets en global pour éviter d'avoir à la passer en paramètre

function sendHelp(command)
{
	helpingString = command ? prepareDetailedHelp(command) : prepareCommandList();
	sendHelpMessage(helpingString);
	//Est-ce que je pousse le vice jusqu'au bout en faisant sendHelpMessage(command ? prepareDetailedHelp(command) : prepareCommandList()); :} ?
}

function prepareCommandList()
{
	for (var helpCommand in helpMessageList)
	{
		helpMessages.push({name: helpCommand.name, desc: helpCommand.shortDesc});
	}

}

function prepareDetailedHelp(command)
{
	if (!command)
		return;						//should not be here => error | Pas nécessaire, juste pour test au début

	helpMessages.push(helpMessageList[command]);
}

module.exports = sendHelp;