const {MongoClient} = require("mongodb");
const auth = require("./auth.json");

if (!auth.dbUrl) {
	throw Error("Missing database credentials. Exiting process.");
	process.exit(1);
}

const client = new MongoClient(auth.dbUrl, { useNewUrlParser: true});

module.exports = client;
