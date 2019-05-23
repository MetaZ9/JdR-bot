const client = require("./client.js");

module.exports = function(load) {
	return new Promise((resolve, reject) => {
		client.connect().then((error, db) => {
			if (error) {
				throw error;
			}

			if (load) {
				loadSessionPool();
			}

			resolve(db);
		});
	});
};
