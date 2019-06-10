const {prefix} = require("./auth.json");
const {flatten} = require("lodash");
const COMMANDS = require("./cmd/index.js");
const Rule = require("./rule.js");

// Function parse
// Effet : 
function parse(message) {
	let {content} = message;
	if (!content.startsWith(prefix)) {
		return;
	}
	let realContent = content.replace(prefix, "").trim();
	let matchedCommand = realContent.match(/.+?(?=\s+)/);
	if (matchedCommand === null) {
		return; // le bot ne va pas réagir
	}
	let [command] = matchedCommand;
	let args = getArgs(realContent.replace(command, ""));
	return determineCommandSource(command).then((cmd, isCustomCommand) => {
		if (isCustomCommand) {
			applyRule(cmd, args, message);
		} else {
			cmd(message).apply(null, args);
		}
	});
};

// Function determineCommandSource
// Effet : déterminer d'où provient la commande (si c'est une rule user-defined ou si c'est un preset)
// Arguments :
// ** String command : le nom de la commande à rechercher
// Valeur de retour : instance de Rule
function determineCommandSource(command) {
	return new Promise((resolve, reject) => {
		if (command in COMMANDS) {
			resolve(COMMANDS[command], false);
		} else {
			Rule.getRule(command).then(rule => {
				if (rule) {
					resolve(rule, true);
				} else {
					reject(`${command} command is unknown.`);
				}
			});
		}
	});
};

function getArgs(str) {
	let spacedArguments = str.match(/['"].+?['"]/g);
	let holderStr = str;
	let args = [];
	if (spacedArguments) {
		for (let arg of spacedArguments) {
			holderStr = str.replace(arg, "");
		}
		spacedArguments = spacedArguments.map(arg => arg.replace(/['"]/g, ""));
		args = args.concat(spacedArguments);
	}
	let classicArguments = holderStr.match(/ +/g);
	if (classicArguments) {
		args = args.concat(classicArguments);
	}
	return args.sort((arg1, arg2) => str.indexOf(arg1) - str.indexOf(arg2));
};


// Function applyRule
// Effet : Appliquer une règle. Si cette règle est liée à une autre, continuer avec l'autre jusqu'à cul-de-sac
// Arguments :
// ** Rule rule : instance de Rule dont les propriétés sont le callback à exécuter,
// *** String ruleName : nom de la rule, propriété indispensable qui sera la cible du callback de la rule précédente
// *** Object core : la série d'instructions à exécuter pour un core donné
// *** String callback : dès qu'on a fini d'appliquer la rule, par quelle rule faire suivre.
// **** Si callback est vide, terminer le cycle, sinon, continuer.
// ---------------------------------------------------------------
// ** Array args : tableau d'arguments séparés par des espaces ou délimités par des guillemets, fournis avec le message parsé
// ---------------------------------------------------------------
// ** Message message : instance de message Discord. Fournira les retours du bot.
// Valeur de retour : Promise<Array<Message>>

function applyRule(rule, args, message) {
	return new Promise((resolve, reject) => {
		let messages = [];
		if (rule.name) {
			Rule.getRule(rule.name).then(RULE => { // j'avais besoin d'un autre nom que de rule D:
				if (RULE.callback) {
					let fct = parseCore(RULE.ruleCore);
					fct(args, messages);
					applyRule(RULE.callback, args, message);
				}
			});
		}
		const preparedMessages = messages.map(msg => {
			return message.channel.send(msg).then(() => {
				cooldown();
			});
		});
		return Promise.all(preparedMessages);
	});
};

function parseCore(core) {
	return function() {

	}; // TBD
};

function cooldown() {
	const msDuration = 700;
	return new Promise((res, rej) => {
		setTimeout(() => {
			res();
		}, msDuration);
	});
}

module.exports = parse;
