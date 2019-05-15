const Content = require("./../src/content.js");
const client = require("./../src/database.js");

client.connect(function(err) {
	if (err) {
		throw err;
	}
	console.log("Database server connected and ready to operate.");

	Content.validate({test: "brah"}, "Character");
});