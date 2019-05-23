const session = require('./session.js');
const content = require('./content.js');

function removePoolObject(poolID, save, replace) {
	if (save)
		saveElement(poolID, replace);

	session.removeObject(poolID);
}

function saveElement(poolID, replace) {
	let poolObj = session.get(poolID);

	if (replace)
		content.alterContent(pool.name, poolObj);
	else
		content.createContent(poolObj);
}

module.exports = removePoolObject; 
