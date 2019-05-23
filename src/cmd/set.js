const session = require('./session.js');

module.exports = function (poolID, param, value) {
	session.setProp(poolID, param, value);
}