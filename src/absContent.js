const Database = require('./database.js');
const auth = require('./auth.json');

class AbstractContent {
};

AbstractContent.prototype.createBase = function(content, collection) {
	this.validate(content);
	return this.set(content, collection);
};
AbstractContent.prototype.create = AbstractContent.prototype.createBase;

AbstractContent.prototype.alterBase = function(name, newContent, collectionName, resolveNewContent = true) {
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
AbstractContent.prototype.alter = AbstractContent.prototype.alterBase;

//********************************** Presque sûr que ça ne devrait pas exister ici (ou en tous cas pas dans cette version)
AbstractContent.prototype.formatBase = function(content) {
	let copy = {...content};
	let {name} = copy;
	delete copy.name;
	copy._id = name;
	return copy;
};
AbstractContent.prototype.format = AbstractContent.prototype.formatBase;

AbstractContent.prototype.getBase = function(contentName, collectionName) {
	return new Promise((resolve, reject) => {
		let props = this.fetchProperties();
		let {name} = props;
		if (contentName === name) {
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
AbstractContent.prototype.get = AbstractContent.prototype.getBase;

//J'ai juste fait ça pour que ça marche, faudra complètement la repenser x)
//Est-ce qu'on ferait pas un query manager ? Je pense que ça sera le mieux
AbstractContent.prototype.getAllBase = function(params, collectionName) {
	return new Promise((resolve, reject) => {
		Database.db(auth.dbName).collection(collectionName).find(params).then((error, contents) => {
			if (error) {
				throw error;
			}
			resolve(contents);
		});
	});
};
AbstractContent.prototype.getAll = AbstractContent.prototype.getAllBase;

AbstractContent.prototype.setBase = function(content, collectionName) {
	const toInsert = this.format(content);
	return new Promise((resolve, reject) => {
		Database.db(auth.dbName).collection(collectionName).insertOne(toInsert).then((error, inserted) => {
			resolve(inserted);
		});
	});
};
AbstractContent.prototype.set = AbstractContent.prototype.setBase;

AbstractContent.prototype.deleteBase = function(name, collectionName) {
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
AbstractContent.prototype.delete = AbstractContent.prototype.deleteBase;

module.exports = AbstractContent;