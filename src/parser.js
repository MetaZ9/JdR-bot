const {prefix} = require("./auth.json");
const COMMANDS = require("./cmd/index.js");
const Rule = require("./rule.js");

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
	let args = realContent.replace(command, "").split(/\s+/);
	return determineCommandSource(command).then((cmd, isCustomCommand) => {
		if (isCustomCommand) {
			applyRule(cmd, args, message).then(() => {
				Promise.resolve();
			});
		} else {
			cmd(message).apply(null, args);
			Promise.resolve();
		}
	});
};

function determineCommandSource(command) {
	return new Promise((resolve, reject) => {
		if (command in COMMANDS) {
			resolve(COMMANDS[command], false);
		} else {
			Rule.getRule(command).then(rule => {
				if (rule) {
					resolve(rule, true);
				} else {
					throw new Error(`${command} command is unknown.`);
				}
			});
		}
	});
};

function applyRule(rule, args, message) {
	return new Promise((resolve, reject) => {
		// re-curse-ive
		Rule.getRule(rule.name).then(RULE => { // j'avais besoin d'un autre nom que de rule D:
			if (rule.callback) {
				let fct = parseCore(rule.ruleCore);
				fct(args, message);
				applyRule(RULE.callback, args, message);
			}
		});
	});
};

function parseCore(core) {
	return function() {

	}; // TBD
};

module.exports = parse;
