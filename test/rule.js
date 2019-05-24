const Rule = require("./../src/rule.js");
const client = require("./../src/database.js");

describe("Rule validity", () => {
	let messedRule1 = {
		name: 36
	};
	let messedRule2 = {
		name: "a valid name",
		isHidden: "no"
	};
	let messedRule3 = {
		name: "valid",
		isHidden: false,
		minGrade: "ur mom"
	};
	let messedRule4 = {
		name: "valid",
		isHidden: true,
		minGrade: 4,
		ruleCore: "bruh"
	};
	let messedRule5 = {
		name: "no",
		isHidden: false,
		minGrade: 36,
		ruleCore: {
			urMom: true
		},
		callback: "no"
	};
	let compliantRule = {
		name: "bruh",
		minGrade: 5,
		isHidden: true,
		ruleCore: {
			bruh: "x"
		},
		callback : "brah"
	};

	it("should invalidate invalid rule objects", () => {
		expect(function() {
			Rule.validate(messedRule1);
		}).toThrow();
		expect(function() {
			Rule.validate(messedRule2);
		}).toThrow();
		expect(function() {
			Rule.validate(messedRule3);
		}).toThrow();
		expect(function() {
			Rule.validate(messedRule4);
		}).toThrow();
		expect(function() {
			Rule.validate(messedRule5);
		}).toThrow();
		expect(function() {
			Rule.validate(compliantRule);
		}).not.toThrow();
	});

	it("properly formats a rule", () => {
		let {name} = compliantRule;
		let newRules = Rule.format(compliantRule);
		expect(newRules._id).toBe(name);
		expect(newRules.name).toBeFalsy();
	});
});

describe("Rule manager", () => {
	let messedRule1 = {
		name: 36
	};
	let messedRule2 = {
		name: "a valid name",
		isHidden: "no"
	};
	let messedRule3 = {
		name: "valid",
		isHidden: false,
		minGrade: "ur mom"
	};
	let messedRule4 = {
		name: "valid",
		isHidden: true,
		minGrade: 4,
		ruleCore: "bruh"
	};
	let messedRule5 = {
		name: "no",
		isHidden: false,
		minGrade: 36,
		ruleCore: {
			urMom: true
		},
		callback: "no"
	};
	let compliantRule = {
		name: "bruh",
		minGrade: 5,
		isHidden: true,
		ruleCore: {
			bruh: "x"
		}
	};
	let compliantRule1 = {
		name: "brah",
		minGrade: 2,
		isHidden: false,
		ruleCore: {
			bruh: "xyz"
		},
		callback: "bruh"
	};

	it("should reject any action if no connection was established", () => {
		client.close(function(error) {
			expectAsync(Rule.delete(messedRule3.name)).toBeRejected();
			expectAsync(Rule.get(compliantRule.name)).toBeRejected();
			expectAsync(Rule.create(compliantRule)).toBeRejected();
		});
	});

	client.connect(function(err) {
		if (err) {
			throw err;
		}
		console.log("Database server connected and ready to operate.");

		it("should not create, set or alter if rule is invalid", () => {
			expect(function() {
				Rule.create(messedRule1);
			}).toThrow();
			expect(function() {
				Rule.create(messedRule2);
			}).toThrow();
			expect(function() {
				Rule.create(messedRule3);
			}).toThrow();
			expect(function() {
				Rule.create(messedRule4);
			}).toThrow();
			expect(function() {
				Rule.create(messedRule5);
			}).toThrow();


			expectAsync(Rule.set(messedRule1)).toBeRejected();
			expectAsync(Rule.set(messedRule2)).toBeRejected();
			expectAsync(Rule.set(messedRule3)).toBeRejected();
			expectAsync(Rule.set(messedRule4)).toBeRejected();
			expectAsync(Rule.set(messedRule5)).toBeRejected();

			expect(function() {
				Rule.alter(messedRule1.name, messedRule1);
			}).toThrow();
			expect(function() {
				Rule.alter(messedRule1.name, messedRule2);
			}).toThrow();
			expect(function() {
				Rule.alter(messedRule1.name, messedRule3);
			}).toThrow();
			expect(function() {
				Rule.alter(messedRule1.name, messedRule4);
			}).toThrow();
			expect(function() {
				Rule.alter(messedRule1.name, messedRule5);
			}).toThrow();

		});

		it("should not alter, delete or get if rule doesn't already exist", () => {
			expectAsync(Rule.get(compliantRule)).toBeRejected();
			expectAsync(Rule.get(compliantRule1)).toBeRejected();

			expectAsync(Rule.delete(compliantRule)).toBeRejected();
			expectAsync(Rule.delete(compliantRule1)).toBeRejected();

			expectAsync(Rule.alter(compliantRule.name, compliantRule1)).toBeRejected();

		});

		it("should create or set rule if valid", () => {
			expectAsync(Rule.create(compliantRule)).toBeResolved();
			expectAsync(Rule.create(compliantRule1)).toBeResolved();

			expectAsync(Rule.set(compliantRule)).toBeResolved();
			expectAsync(Rule.set(compliantRule1)).toBeResolved();
		});

		it("should get, alter, or delete rule if existing and valid", () => {
			expectAsync(Rule.get(compliantRule)).toBeResolved();
			expectAsync(Rule.get(compliantRule1)).toBeResolved();

			expectAsync(Rule.alter(compliantRule.name, compliantRule1)).toBeResolved();

			expectAsync(Rule.delete(compliantRule)).toBeResolved();
			expectAsync(Rule.delete(compliantRule1)).toBeResolved();
		});

	});
});