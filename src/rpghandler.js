const AbstractContent = require("./absContent.js");
const rpgsCollection = require("./auth.json").collections.rpgs;

class RPGHandler extends AbstractContent {
	constructor() {
		super();
		this.rpgInfo = {};
	};
};

//*************************************
//			INHERITED FUNCTIONS
//*************************************

RPGHandler.prototype.create = function(params) {
	return this.create(params, rpgsCollection);
};

RPGHandler.prototype.alter = function(name, newRPG, resolveNewContent) {
	return this.alter(name, newRPG, rpgsCollection, resolveNewContent);
};

RPGHandler.prototype.get = function(name) {
	return this.get(name, rpgsCollection);
};

RPGHandler.prototype.delete = function(name) {
	return this.delete(name, rpgsCollection);
};

RPGHandler.prototype.set = function(name) {
	return this.set(name, rpgsCollection);
};

//*************************************
//			SPECIALIZED FUNCTIONS
//*************************************

RPGHandler.prototype.fetchProperties = function() {
	return this.rpgInfo;
};

RPGHandler.prototype.validate = function(rpgData) {
	if (typeof rpgData.name !== "string") {
		throw new Error("Any RPG's name must be a string.");
	}
};

module.exports = new RPGHandler();
