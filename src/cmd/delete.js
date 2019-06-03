const content = require('./../content.js');

module.exports = function(contentType, contentName) {
	return content.delete.bind(content, contentType, contentName);
};
