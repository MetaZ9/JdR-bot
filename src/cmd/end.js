const client = require("./client.js");

function endSession(save) {
	if (save) {
		saveSessionPool();
	}

	client.close();
}

module.exports = endSession;
