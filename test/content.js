const Content = require("./../src/content.js");
const Client = require("./../src/database.js");

describe("Content validator", () => {
	let messedContent = {
		name: 36
	};
	let messedContent2 = {
		name: true
	};
	let messedContent3 = {
		name: {}
	};
	let messedContent4 = {
		name: function(){}
	};
	let goodContent = {
		name: "nik"
	};
	it("should properly validate content", () => {
		expect(function() {
			Content.validate(messedContent);
		}).toThrow();
		expect(function() {
			Content.validate(messedContent2);
		}).toThrow();
		expect(function() {
			Content.validate(messedContent3);
		}).toThrow();
		expect(function() {
			Content.validate(messedContent4);
		}).toThrow();
		expect(function() {
			Content.validate(goodContent);
		}).not.toThrow();
	});
});
