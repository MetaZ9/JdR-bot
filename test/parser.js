const parse = require("./../src/parser.js");

describe("Le parser de la mort qui tue", () => {
	// j'ai mis le truc en français parce que j'avais
	// tant envie d'utiliser de la mort qui tue :D
	let message = {
		content: "I will not start with g!"
	};

	let betterMessage = {
		content: "g!"
	};

	let evenBetterMessage = {
		content: "g!"
	};

	// ع بالي اكتب سطر بالعربي

	it("doit retourner une valeur correcte si on n'est pas censés réagir au message", () => { // lul, "on"
		expect(parse(message)).toBe(undefined);
	});
});
