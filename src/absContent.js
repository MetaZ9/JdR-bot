const Database = require('./data.js');
const auth = require('./auth.json');

class AbstractContent {
};

//*************************************
//			BASE FUNCTIONS
//*************************************

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
			// fut un temps où je faisais le sérieux à mettre des commentaires en anglais
			// لا تحاول أن تترجم هذه الكتابة  و إلا ستندم
		});
	});
};

AbstractContent.prototype.set = function(content, collectionName, customProps) {
	const toInsert = this.format(content, customProps || {});
	return new Promise((resolve, reject) => {
		Database.db(auth.dbName).collection(collectionName).insertOne(toInsert).then((error, inserted) => {
			resolve(inserted);
		});
	});
};

AbstractContent.prototype.get = function(contentName, collectionName) {
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

//J'ai juste fait ça pour que ça marche, faudra complètement la repenser x)
//Est-ce qu'on ferait pas un query manager ? Je pense que ça sera le mieux
AbstractContent.prototype.getAll = function(params, collectionName) {
	return new Promise((resolve, reject) => {
		Database.db(auth.dbName).collection(collectionName).find(params).toArray().then(content) => {
			resolve(contents);
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

//							------ TODO ------
//********************************** Presque sûr que ça ne devrait pas exister ici (ou en tous cas pas dans cette version)
AbstractContent.prototype.format = function(content, customProps) {
	let copy = {...content};
	let {name} = copy;
	delete copy.name;
	copy._id = name;
	for (let prop in customProps) {
		if (prop in copy) {
			// do nothing
			// on ne veut pas overwrite des propriétés valides par erreur
		} else {
			copy[prop] = customProps[prop];
		}
	}
	return copy;
};

module.exports = AbstractContent;
