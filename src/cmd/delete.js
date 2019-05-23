const content = require('./content.js');

function deleteContent(contentType, contentName) {
	content.deleteContent(contentType, contentName);
}

module.exports = deleteContent;