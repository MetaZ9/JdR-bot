const Database = require('./database.js');
const auth = require('./auth.json');

class Content {
	constructor() {
		this.ruleDefinedVars = {};
	}

	static alterContent(name, newContent, resolveNewContent = true) {
		return new Promise((resolve, reject) => {
			Database.collection(auth.collections.content).findAndModify({
				query: {_id: name},
				replace: this.formatContent(newContent),
				new: resolveNewContent,
			}).then((error, content) => {
				if (error) {
					throw error;
				}
				resolve(content);
			});
		});
	}

	static createContent(content) {
		return new Promise((resolve, reject) => {
			const toInsert = this.formatContent(content);
			Database.collection(auth.collections.content).insertOne(toInsert).then((error, content) => {
				if (error) {
					throw error;
				}
				resolve(content);
			});
		});
	}

	static deleteContent(name) {
		return new Promise((resolve, reject) => {
			Database.collection(auth.collections.content).deleteOne({_id: name}).then((error, content) => {
				if (error) {
					throw error;
				}
				resolve(Boolean(content.deletedCount));
			})
		})
	}

	static formatContent(content) {
		let toFormat = Object.assign({}, content);
		toFormat._id = toFormat.name;
		delete toFormat.name;
		return toFormat;
	}

	static getContent(name) {
		return new Promise((resolve, reject) => {
			Database.collection(auth.collections.content).findOne({_id: name}).then((error, content) => {
				if (error) {
					throw error;
				}
				resolve(content);
			});
		})
	}

	static setContent(content) {
		if (this.validateContent(content)) {
			this.createContent(content);
		}
	}

	static validateContent(content) {
		return "name" in content; // force content to have a name
	}
}

module.exports = Content;
