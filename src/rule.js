const AbstractContent = require('./absContent.js');
const auth = require('./auth.json');
const Grades = require('./grades.js');
const {isObject} = require('lodash');
const Database = require('./database.js');
const collectionName = auth.dbCollections.rules;

class Rule extends AbstractContent {
	constructor() {
		super();
		this.name = '';
		this.isHidden = true;
		this.minGrade = Grades.ADMIN;
		this.ruleCore = {};
		this.callback = '';
	};
};

Rule.prototype.createRule = function(rule) {
	return this.create(rule, collectionName);
};

Rule.prototype.alterRule = function(name, newRule, resolveNewRule = true) {
	return this.alter(name, newRule, collectionName, resolveNewRule);
};

Rule.prototype.getRule = function(name) {
	return this.get(name, collectionName);
};

Rule.prototype.getAllRules = function(params) {
	return this.getAll(params, collectionName);
};

Rule.prototype.setRule = function(newRule) {
	return this.create(newRule, collectionName);
};

Rule.prototype.deleteRule = function(name) {
	return this.delete(name, collectionName)
};

Rule.prototype.cache = function(rule) {
	this.name = rule._id;
	this.isHidden = rule.isHidden;
	this.minGrade = rule.minGrade;
	this.ruleCore = rule.ruleCore;
	this.callback = rule.callback;
};

Rule.prototype.cacheRule = function(rule) {
	return this.cache(rule);
};

Rule.prototype.fetchProperties = function() {
	return {
		name: this.name,
		isHidden: this.isHidden,
		minGrade: this.minGrade,
		ruleCore: this.ruleCore,
		callback: this.callback
	};
};

Rule.prototype.validate = function(rule) {
	if (typeof rule.name !== "string") {
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
		else if (rule.callback === rule.name) {
			throw Error("Callback references itself");
		}
	}
};

Rule.prototype.validateRule = function(rule) {
	return this.validate(rule);
};

Rule.prototype.formatRule = function(rule) {
	return this.format(rule);
};

Rule.prototype.getContentType = function(contentTypeName) {
	return new Promise((resolve, reject) => {
		Database.db(auth.dbName).collection(collectionName).findOne({_id: "contentType"+contentTypeName}).then((error, content) => {
			if (error) {
				throw error;
			}

			resolve(content);
		});
	});
};

module.exports = new Rule();
