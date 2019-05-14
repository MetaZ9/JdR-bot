const collectionName = require('./auth.json').dbCollections.content;
const AbstractContent = require('./absContent.js');

class Content extends AbstractContent {
	constructor() {
		super();
		this.ruleDefinedVars = {};
	};
};

Content.prototype.fetchProperties = function() {
	return this.ruleDefinedVars;
};

Content.prototype.alterContent = function(name, newContent, resolveNewContent = true) {
	return this.alter(name, newContent, collectionName, resolveNewContent);
};

Content.prototype.cache = function(content) {
	let decodedContent = reverseFormat(content);
	this.ruleDefinedVars = decodedContent;
};

Content.prototype.createContent = function(content) {
	return this.create(content, collectionName);
};

Content.prototype.deleteContent = function(name) {
	return this.delete(name, collectionName);
};

Content.prototype.getContent = function(name) {
	return this.get(name, collectionName);
};

Content.prototype.getAllContent = function(params) {
	return this.getAll(params, collectionName);
};

Content.prototype.formatContent = function(content) {
	return this.format(content);
};

Content.prototype.format = function(content) {
	let {name} = content;
	delete content.name;
	content._id = name;
	return content;
};

Content.prototype.getContent = function(name) {
	return this.get(name, collectionName);
};

Content.prototype.setContent = function(newContent) {
	return this.set(newContent, collectionName);
};

Content.prototype.validate = function(content) {
	if (content.name === undefined) {
		throw new Error("Content must have a `name` property.");
	} else if (typeof content.name !== "string") {
		throw new Error("Content name must be a string.");
	}
};

function reverseFormat(content) {
	content.name = content._id;
	delete content._id;
	return content;
};

module.exports = Content;
