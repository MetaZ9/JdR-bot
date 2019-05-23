const session = require('./session.js');

module.exports = function (rpgName) {
	session.setRPG(rpgName);
}