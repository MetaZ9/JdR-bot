const session = require('./../session.js');

module.exports = function(rpgName) {
	return session.setRPG(rpgName);
};
