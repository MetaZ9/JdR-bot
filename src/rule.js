const Grades = require('./grades.js');
const Database = require('./database.js');
const auth = require('./auth.json');
const {compact, isObject} = require('lodash');

class Rule {
	constructor() {
		this.ruleName = '';
		this.isHidden = true;
		this.minGrade = Grades.ADMIN;
		this.ruleCore = {};
		this.callback = function() {};
	}

	static alterRule(name, newRule, resolveNewRule = true) {
		if (this.validateRule(newRule)) {
			return new Promise((resolve, reject) => {
				Database.collection(auth.dbCollections.rules).findAndModify({
					query: {_id: name},
					replace: formatRule(newRule),
					new: resolveNewRule
				}).then((error, rule) => {
					if (error) {
						throw error;
					}

					resolve(rule);
					// https://docs.mongodb.com/manual/reference/method/db.collection.findAndModify/#db.collection.findAndModify
					// applying "true" to the "new" parameter forces mongodb to return the updated document
				});
			});
		}
	}

	static cacheRule(rule) {
		this.scanFields(rule);
		this.ruleName = rule._id;
		this.isHidden = rule.isHidden;
		this.minGrade = rule.minGrade;
		this.ruleCore = rule.ruleCore;
		this.callback = rule.callback;
	}

	static createRule(rule) {
		if (this.validateRule(rule)) {
			return this.setRule(rule);
		} else {
			// report error
			// The rule could not be created
			// We could log into console or
			// send a real message...
			// TBD tho
		}
	}

	static deleteRule(name) {
		return new Promise((resolve, reject) => {
			Database.collection(auth.dbCollections.rules).deleteOne({_id: name}).then((error, deleted) => {
				if (error) {
					throw error;
				}
				resolve(Boolean(deleted.deletedCount));
				// use this as a signal on whether
				// the rule existed and was deleted (returns true)
				// or it didn't exist at the first place (returns false)
			});
		});
	}

	static formatRule(rule) {
		let copy = Object.assign({}, rule);
		copy._id = copy.ruleName;
		delete copy.ruleName;
		return copy;
	}

	static getRule(name) {
		return new Promise((resolve, reject) => {
			if (name === this.ruleName) {
				resolve({
					_id: this.ruleName,
					isHidden: this.isHidden,
					minGrade: this.minGrade,
					ruleCore: this.ruleCore,
					callback: this.callback
				});
			} else {
				Database.collection(auth.dbCollections.rules).findOne({_id: name}).then((error, rule) => {
					if (error) {
						throw error;
					}

					this.cacheRule(rule);
					resolve(rule);
				});
			}
		});
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

	static setRule(rule) {
		const toInsert = this.formatRule(Object.assign({}, rule));
		return new Promise((resolve, reject) => {
			Database.collection(auth.dbCollections.rules).insertOne(toInsert).then((error, inserted) => {
				if (error) {
					throw error;
				}
				resolve(inserted);
			});
		})
	}

	static validateRule(rule) {
		if (typeof rule.ruleName !== "string") {
			throw Error("Rule name must be a string.");
		}

		if (typeof rule.isHidden !== "boolean") {
			throw Error("Whether a rule is hidden or not must be a boolean."); // could be a bit shorter
		}

		if (isNaN(rule.minGrade)) {
			throw Error("Minimal Grade must be an integer.");
		}

		if (!isObject(rule.ruleCore)) {
			throw Error("Rule core must be an object.");
		}

		if (typeof this.callback !== "function") {
			throw Error("Callback must be a function.");
		}

		return true; // all checks passed
	}
}

module.exports = Rule;
