const client = require("./client.js");

module.exports = function() {
	return new Promise((resolve, reject) => {
		client.connect().then((error, db) => {
			if (error) {
				throw error;
			}
			resolve(db);
		});
	});
};
