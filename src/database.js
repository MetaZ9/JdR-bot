const {MongoClient} = require("mongodb");
const auth = require("./auth.json");

if (!auth.dbUrl) {
	throw Error("Missing database credentials. Exiting process.");
	process.exit(1);
}

const client = new MongoClient(auth.dbUrl, { useNewUrlParser: true});

client.connect(function(err) {
	if (err) {
		throw err;
	}
	console.log("Database server connected and ready to operate.");
});

module.exports = client;
