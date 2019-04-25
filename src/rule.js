const Grades = require('./grades.js');
const Database = require("./database.js");
const auth = require("./auth.json");
const {isEqual} = require("lodash");

class Rule {
	constructor() {
		this.ruleName = '';
		this.isHidden = true;
		this.minGrade = Grades.ADMIN;
		this.ruleCore = {};
		this.callback = function() {};
	}

	static createRule() {
		//create logic

		this.setRuleByName();
	}

	static setRuleByName(name) {
		//export to database

		return this;
	}

	static getRuleByName(name) {
		return new Promise(function(resolve, reject) {
			if (name === this.ruleName) {
				resolve({
					ruleName: this.ruleName,
					isHidden: this.isHidden,
					minGrade: this.minGrade,
					ruleCore: this.ruleCore,
					callback: this.callback
				});
			} else {
				Database.collection(auth.dbCollections.rules).findOne({ruleName: name}).then((error, rule) => {
					if (error) {
						throw error;
					}

					this.cacheRule(rule);
					resolve(rule);
				});
			}
		});
	}

	static showRuleByName(name) {
		//show logic

	}

	static alterRuleByName(name) {
		//alter logic

		return this;
	}

	static scanFields(rule) {
		const defaultOptions = {
			ruleName: undefined,
			isHidden: undefined,
			minGrade: undefined,
			ruleCore: undefined,
			callback: undefined
		};

		const ruleFields = Object.assign({}, defaultOptions, rule);

		for (let field in ruleFields) {
			if (ruleFields[field] === undefined) {
				console.warn(`Warning: ${field} field has an undefined value.`);
			}
		}
	}

	static cacheRule(rule) {
		this.scanFields(rule);
		this.ruleName = rule.ruleName;
		this.isHidden = rule.isHidden;
		this.minGrade = rule.minGrade;
		this.ruleCore = rule.ruleCore;
		this.callback = rule.callback;
	}

	static deleteRuleByName(name) {
		//deleteRule
	}
}

module.exports = Rule;
