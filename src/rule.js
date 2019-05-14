const AbstractContent = require('./absContent.js');
const auth = require('./auth.json');
const Grades = require('./grades.js');
const {isObject} = require('lodash');
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
	return this.setRule(newRule, collectionName);
};

Rule.prototype.deleteRule = function(name) {
	return this.delete(name, collectionName)
};

Rule.prototype.cache = function(rule) {
	this.ruleName = rule._id;
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
		ruleName: this.ruleName,
		isHidden: this.isHidden,
		minGrade: this.minGrade,
		ruleCore: this.ruleCore,
		callback: this.callback
	};

}

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

Rule.prototype.validateRule = function(rule) {
	return this.validate(rule);
};

Rule.prototype.format = function(rule) {
	let copy = Object.assign({}, rule);
	copy._id = copy.ruleName;
	delete copy.ruleName;
	return copy;
};

Rule.prototype.formatRule = function(rule) {
	return this.format(rule);
};

module.exports = new Rule();
