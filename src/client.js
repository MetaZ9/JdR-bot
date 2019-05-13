const {dbUrl} = require("./auth.json");
const {MongoClient} = require("mongodb");

module.exports = new MongoClient(dbUrl, {useNewUrlParser: true});
