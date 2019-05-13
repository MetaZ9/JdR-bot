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
	determineCommandSource(command).then((command, isCustomCommand) => {
		if (isCustomCommand) {
			command.callback.apply(null, args);
		} else {
			command(message).apply(null, args);
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
				}
			});
		}
	});
};

module.exports = parse;
