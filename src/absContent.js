const Database = require('./database.js');
const auth = require('./auth.json');
const {compact, isObject} = require('lodash');

class AbstractContent {
};

AbstractContent.prototype.create = function(content, collection) {
	this.validate(content);
	return this.set(content, collection);
};

AbstractContent.prototype.alter = function(name, newContent, collectionName, resolveNewContent = true) {
	this.validate(newContent);
	return new Promise((resolve, reject) => {
		let newObject = this.format(newContent);
		newObject._id = name;

		Database.db(auth.dbName).collection(collectionName).findOneAndReplace({_id: name}, newObject, {returnNewDocument: resolveNewContent})
		.then((error, content) => {
			if (error) {
				throw error;
			}

			resolve(content);
			// https://docs.mongodb.com/manual/reference/method/db.getCollection.findAndModify/#db.getCollection.findAndModify
			// applying "true" to the "new" parameter forces mongodb to return the updated document
		});
	});
};

AbstractContent.prototype.get = function(contentName, collectionName) {
	return new Promise((resolve, reject) => {
		let props = this.fetchProperties();
		let {name, ruleName} = props;
		if ([ruleName, name].includes(contentName)) {
			resolve(props);
		} else {
			Database.db(auth.dbName).collection(collectionName).findOne({_id: contentName}).then((error, content) => {
				if (error) {
					throw error;
				}

				this.cache(content);
				resolve(content);
			});
		}
	});
};

//J'ai juste fait ça pour que ça marche, faudra complètement la repenser x)
//Est-ce qu'on ferait pas un query manager ? Je pense que ça sera le mieux
AbstractContent.prototype.getAll = function(params, collectionName) {
	return new Promise((resolve, reject) => {
		Database.db(auth.dbName).collection(collectionName).find(params).then((error, contents) => {
			if (error) {
				throw error;
			}

			//this.cacheRule(rule);
			resolve(contents);
		});

	});

};

AbstractContent.prototype.set = function(content, collectionName) {
	const toInsert = this.format(content);
	return new Promise((resolve, reject) => {
		Database.db(auth.dbName).collection(collectionName).insertOne(toInsert).then((error, inserted) => {
			resolve(inserted);
		});
	});
};

AbstractContent.prototype.delete = function(name, collectionName) {
	return new Promise((resolve, reject) => {
		Database.db(auth.dbName).collection(collectionName).deleteOne({_id: name}).then(deleted => {
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

module.exports = AbstractContent;