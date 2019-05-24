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
	let altContent = {
		name: "bruh"
	};

	it("should properly format content", () => {
		let {name} = goodContent;
		let newContent = Content.format(goodContent);
		expect(newContent.name).toBe(undefined);
		expect(newContent._id).toBe(name);
	});

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

	it("should resolve all promises when connected to DB", () => {
		Client.connect(() => {
			expectAsync(Content.set(goodContent)).toResolve();
			expectAsync(Content.get(goodContent)).toResolve();
			expectAsync(Content.alter(goodContent.name, altContent)).toResolve();
			expectAsync(Content.delete(altContent)).toBe(true); // content found and deleted
			expectAsync(Content.delete(altContent)).toBe(false); // deleted once, doesn't exist anymore
			Client.close();
		});
	});

	it("should reject all promises when not connected to DB", () => {
		expectAsync(Content.set(goodContent)).toBeRejected();
		expectAsync(Content.set(goodContent)).toBeRejected();
		expectAsync(Content.get(goodContent)).toBeRejected();
		expectAsync(Content.alter(goodContent.name, altContent)).toBeRejected();
		expectAsync(Content.delete(goodContent)).toBeRejected();
	});

	it("should cache content properly", () => {
		Content.cache(Content.format(goodContent));
		expect(Content.ruleDefinedVars).toEqual(goodContent);
	});
});
