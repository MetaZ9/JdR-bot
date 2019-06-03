const {resolve} = require("path");
const {isObject} = require("lodash");

function bind(entry, loadedFile, containerObject) {
	validateString(loadedFile, "loaded file path");
	validateString(entry, "file storage key");
	this[containerObject][entry] = require(resolve(loadedFile));
};

class DataProvider {
	constructor() {
		this.files = {};
		this.rpgs = {};
	};
};

DataProvider.prototype.bindFile = function(entry, loadedFile) {
	bind.bind(this, entry, loadedFile, "files")();
};

DataProvider.prototype.bindRPG = function(entry, loadedFile) {
	bind.bind(this, entry, loadedFile, "rpgs")();
};

DataProvider.prototype.loadRPGFile = function(filepath) {
	validateString(filepath, "loaded file path");
	const rpgsFile = require(resolve(filepath));
	validate(rpgsFile, "RPGs storage file", "object");
	for (let rpg in rpgsFile) {
		let rpgData = rpgsFile[rpg];
		if (!rpgData.src) {
			throw new Error(`Missing src property for RPG ${rpg}.`);
		} else {
			validateString(rpgData.src, "RPG source filepath");
			this.bindRPG(rpg, `${rpgData.src}/index.js`);
		}
	}
};

function validate(variable, label, expectedType) {
	const errMsg = `Expected ${label} to be a ${expectedType}, found type ${typeof variable} instead.`;
	if (expectedType === "object") {
		if (!isObject(variable)) {
			throw new Error(errMsg);
		}
	} else {
		if (typeof variable !== expectedType) {
			throw new Error(errMsg);
		}
	}
};

function validateString(variable, label) {
	validate(variable, label, "string"); 
};
// composition de la fonction validate, parce qu'on se sert de la validation de strings la plupart du temps.
// peut-être qu'on peut le mettre dans un util.js au final, avec d'autres fonctions issues de la composition de validate
// issues <=> issoues <=> issou <=> icywolf <=> m!icy image
// ne pas chercher à chercher

module.exports = new DataProvider();
