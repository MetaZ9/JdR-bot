const AbstractContent = require("./absContent.js");
const rpgsCollection = require("./auth.json").collections.rpgs;

class RPGHandler extends AbstractContent {
	constructor() {
		super();
		this.rpgInfo = {};
	};
};

RPGHandler.prototype.createRPG = function(params) {
	return this.create(params, rpgsCollection);
};

RPGHandler.prototype.alterRPG = function(name, newRPG, resolveNewContent) {
	return this.alter(name, newRPG, rpgsCollection, resolveNewContent);
};

RPGHandler.prototype.getRPG = function(name) {
	return this.get(name, rpgsCollection);
};

RPGHandler.prototype.deleteRPG = function(name) {
	return this.delete(name, rpgsCollection);
};

RPGHandler.prototype.fetchProperties = function() {
	return this.rpgInfo;
};

RPGHandler.prototype.setRPG = function(name) {
	return this.set(name, rpgsCollection);
};

RPGHandler.prototype.validate = function(rpgData) {
	if (typeof rpgData.name !== "string") {
		throw new Error("Any RPG's name must be a string.");
	}
};

module.exports = new RPGHandler();
