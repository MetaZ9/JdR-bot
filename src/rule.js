const AbstractContent = require('./absContent.js');
const auth = require('./auth.json');
const Grades = require('./grades.js');
const {isObject} = require('lodash');
const Database = require('./data.js');
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

//*************************************
//			INHERITED FUNCTIONS
//*************************************

Rule.prototype.create = function(rule) {
	return this.create(rule, collectionName);
};

Rule.prototype.alter = function(name, newRule, resolveNewRule = true) {
	return this.alter(name, newRule, collectionName, resolveNewRule);
};

Rule.prototype.get = function(name) {
	return this.get(name, collectionName);
};

Rule.prototype.getAll = function(params) {
	return this.getAll(params, collectionName);
};

Rule.prototype.set = function(newRule) {
	return this.set(newRule, collectionName);
};

Rule.prototype.delete = function(name) {
	return this.delete(name, collectionName);
};

//*************************************
//			SPECIALIZED FUNCTIONS
//*************************************

Rule.prototype.cache = function(rule) {
	this.name = rule._id;
	this.isHidden = rule.isHidden;
	this.minGrade = rule.minGrade;
	this.ruleCore = rule.ruleCore;
	this.callback = rule.callback;
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
		throw Error("Property \"isHidden\" must be a boolean.");
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

//******************* Il manque le format de base
// Reste quand même à savoir quoi faire du format du parent
Rule.prototype.format = function(rule) {
	return this.format(rule);
};

//*************************************
//			SPECIFIC FUNCTIONS
//*************************************

Rule.prototype.getContentType = function(contentTypeName) {
	return new Promise((resolve, reject) => {
		// faudrait plutôt une autre collection pour les définitions de types au lieu de la collection "rules" actuelle
		Database.db(auth.dbName).collection(collectionName).findOne({_id: "contentType"+contentTypeName}).then((error, content) => {
			if (error) {
				throw error;
			}

			resolve(content);
		});
	});
};

module.exports = new Rule();
