const session = require('./session.js')

function cleanSessionPool () {
	session.cleanSession();
}

module.exports = cleanSessionPool;