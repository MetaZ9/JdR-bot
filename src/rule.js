const Grades = require('./grades.js');
const Database = require('./database.js');
const auth = require('./auth.json');
const {compact, isObject} = require('lodash');
const AbstractContent = require('./absContent.js')
const collectionName = auth.dbCollections.rules;

class Rule extends AbstractContent {
	constructor() {
		super();
		this.ruleName = '';
		this.isHidden = true;
		this.minGrade = Grades.ADMIN;
		this.ruleCore = {};
		this.callback = '';
	};

};

Rule.prototype.createRule = function (rule) {
	return this.create(rule, collectionName);
}

Rule.prototype.alterRule = function (name, newRule, resolveNewRule = true) {
	return this.alter(name, newRule, collectionName, resolveNewRule);
};

Rule.prototype.getRule = function (name) {
	return this.get(name, collectionName);
}

Rule.prototype.getAllRules = function (params) {
	return this.getAllRules(params, collectionName);
}

Rule.prototype.setRule = function (newRule) {
	return this.setRule(newRule, collectionName);
}

Rule.prototype.deleteRule = function (name) {
	return this.delete(name, collectionName)
}

Rule.prototype.cache = function(rule) {
	this.ruleName = rule._id;
	this.isHidden = rule.isHidden;
	this.minGrade = rule.minGrade;
	this.ruleCore = rule.ruleCore;
	this.callback = rule.callback;
};
Rule.prototype.cacheRule = function (rule) {
	return this.cache(rule);
};

Rule.prototype.validate = function(rule) {
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

	if (rule.callback) {
		if (typeof rule.callback !== "string") {
			throw Error("Callback must be a string.");
		}
		else if (rule.callback === rule.ruleName) {
			throw Error("Callback references itself");
		}

	}

};
Rule.prototype.validateRule = function (rule) {
	return this.validate(rule);
}

Rule.prototype.format = function(rule) {
	let copy = Object.assign({}, rule);
	copy._id = copy.ruleName;
	delete copy.ruleName;
	return copy;
};
Rule.prototype.formatRule = function (rule) {
	return this.format(rule);
}

/*
Rule.prototype.alterRule = function(name, newRule, resolveNewRule = true) {
	this.validateRule(newRule);
	return new Promise((resolve, reject) => {
		Database.db(auth.dbName).collection(auth.dbCollections.rules).findAndModify({
			query: {_id: name},
			replace: this.formatRule(newRule),
			new: resolveNewRule
		}).then((error, rule) => {
			if (error) {
				throw error;
			}

			resolve(rule);
			// https://docs.mongodb.com/manual/reference/method/db.getCollection.findAndModify/#db.getCollection.findAndModify
			// applying "true" to the "new" parameter forces mongodb to return the updated document
		});
	});
};

Rule.prototype.cacheRule = function(rule) {
	this.ruleName = rule._id;
	this.isHidden = rule.isHidden;
	this.minGrade = rule.minGrade;
	this.ruleCore = rule.ruleCore;
	this.callback = rule.callback;
};

Rule.prototype.createRule = function(rule) {
	this.validateRule(rule);
	return this.setRule(rule);
};

Rule.prototype.deleteRule = function(name) {
	return new Promise((resolve, reject) => {
		Database.db(auth.dbName).collection(auth.dbCollections.rules).deleteOne({_id: name}).then(deleted => {
			if (error) {
				throw error;
			}
			resolve(Boolean(deleted.deletedCount));
			// use this as a signal on whether
			// the rule existed and was deleted (returns true)
			// or it didn't exist at the first place (returns false)
		});
	});
};

Rule.prototype.formatRule = function(rule) {
	let copy = Object.assign({}, rule);
	copy._id = copy.ruleName;
	delete copy.ruleName;
	return copy;
};

Rule.prototype.getRule = function(name) {
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
			Database.db(auth.dbName).collection(auth.dbCollections.rules).findOne({_id: name}).then((error, rule) => {
				if (error) {
					throw error;
				}

				this.cacheRule(rule);
				resolve(rule);
			});
		}
	});
};

//J'ai juste fait ça pour que ça marche, faudra complètement la repenser x)
//Est-ce qu'on ferait pas un query manager ? Je pense que ça sera le mieux
Rule.prototype.getAllRules = function(param) {
	return new Promise((resolve, reject) => {
		Database.db(auth.dbName).collection(auth.dbCollections.rules).find({isHidden: false}).then((error, rules) => {
			if (error) {
				throw error;
			}

			//this.cacheRule(rule);
			resolve(rules);
		});

	});
};

Rule.prototype.setRule = function(rule) {
	const toInsert = this.formatRule(rule);
	return new Promise((resolve, reject) => {
		Database.db(auth.dbName).collection(auth.dbCollections.rules).insertOne(toInsert).then((error, inserted) => {
			resolve(inserted);
		});
	});
};

Rule.prototype.validateRule = function(rule) {
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

	if (typeof rule.callback !== "string") {
		throw Error("Callback must be a string.");
	}
};
*/
module.exports = new Rule();
