const {prefix} = require("./auth.json");
const COMMANDS = require("./cmd/index.js");
const Rule = require("./rule.js");

function applyRule(rule, message) {

};

function parse(message) {
	(async function fct() {
		let {content} = message;
		let realContent = content.replace(prefix, "");
		let matchedCommand = realContent.match(/.+?(?=\s+)/);
		if (matchedCommand === null) {
			return /*gérer une erreur */;
			// gérer une erreur
		}
		let [command] = matchedCommand;
		let args = realContent.replace(command, "").split(/\s+/);
		determineCommandSource(command).then(rule => {
			applyRule(rule, message);
		});
	})();
};

function determineCommandSource(command) {
	return new Promise((resolve, reject) => {
		if (command in COMMANDS) {
			resolve(COMMANDS[command]);
		} else {
			Rule.getRule(command).then(rule => {
				if (rule) {
					resolve(rule);
				}
			});
		}
	});
};

module.exports = parse;
