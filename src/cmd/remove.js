const session = require('./session.js');
const content = require('./content.js');

function removePoolItem(poolID, replace, save = true) {
	if (save) {
		saveElement(poolID, replace);
	}

	session.removeItem(poolID);
}

function saveElement(poolID, replace) {
	let poolObj = session.get(poolID);

	if (replace) {
		content.alterContent(pool.name, poolObj);
	} else {
		content.createContent(poolObj);
	}
}

module.exports = removePoolItem; 