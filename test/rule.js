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
			Rule.validateRule(messedRule1);
		}).toThrow();
		expect(function() {
			Rule.validateRule(messedRule2);
		}).toThrow();
		expect(function() {
			Rule.validateRule(messedRule3);
		}).toThrow();
		expect(function() {
			Rule.validateRule(messedRule4);
		}).toThrow();
		expect(function() {
			Rule.validateRule(messedRule5);
		}).toThrow();
		expect(function() {
			Rule.validateRule(compliantRule);
		}).not.toThrow();
	});

	it("properly formats a rule", () => {
		let {name} = compliantRule;
		let newRules = Rule.formatRule(compliantRule);
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
			expectAsync(Rule.deleteRule(messedRule3.name)).toBeRejected();
			expectAsync(Rule.getRule(compliantRule.name)).toBeRejected();
			expectAsync(Rule.createRule(compliantRule)).toBeRejected();
		});
	});

	client.connect(function(err) {
		if (err) {
			throw err;
		}
		console.log("Database server connected and ready to operate.");

		it("should not create, set or alter if rule is invalid", () => {
			expect(function() {
				Rule.createRule(messedRule1);
			}).toThrow();
			expect(function() {
				Rule.createRule(messedRule2);
			}).toThrow();
			expect(function() {
				Rule.createRule(messedRule3);
			}).toThrow();
			expect(function() {
				Rule.createRule(messedRule4);
			}).toThrow();
			expect(function() {
				Rule.createRule(messedRule5);
			}).toThrow();


			expectAsync(Rule.setRule(messedRule1)).toBeRejected();
			expectAsync(Rule.setRule(messedRule2)).toBeRejected();
			expectAsync(Rule.setRule(messedRule3)).toBeRejected();
			expectAsync(Rule.setRule(messedRule4)).toBeRejected();
			expectAsync(Rule.setRule(messedRule5)).toBeRejected();

			expect(function() {
				Rule.alterRule(messedRule1.name, messedRule1);
			}).toThrow();
			expect(function() {
				Rule.alterRule(messedRule1.name, messedRule2);
			}).toThrow();
			expect(function() {
				Rule.alterRule(messedRule1.name, messedRule3);
			}).toThrow();
			expect(function() {
				Rule.alterRule(messedRule1.name, messedRule4);
			}).toThrow();
			expect(function() {
				Rule.alterRule(messedRule1.name, messedRule5);
			}).toThrow();

		});

		it("should not alter, delete or get if rule doesn't already exist", () => {
			expectAsync(Rule.getRule(compliantRule)).toBeRejected();
			expectAsync(Rule.getRule(compliantRule1)).toBeRejected();

			expectAsync(Rule.deleteRule(compliantRule)).toBeRejected();
			expectAsync(Rule.deleteRule(compliantRule1)).toBeRejected();

			expectAsync(Rule.alterRule(compliantRule.name, compliantRule1)).toBeRejected();

		});

		it("should create or set rule if valid", () => {
			expectAsync(Rule.createRule(compliantRule)).toBeResolved();
			expectAsync(Rule.createRule(compliantRule1)).toBeResolved();

			expectAsync(Rule.setRule(compliantRule)).toBeResolved();
			expectAsync(Rule.setRule(compliantRule1)).toBeResolved();
		});

		it("should get, alter, or delete rule if existing and valid", () => {
			expectAsync(Rule.getRule(compliantRule)).toBeResolved();
			expectAsync(Rule.getRule(compliantRule1)).toBeResolved();

			expectAsync(Rule.alterRule(compliantRule.name, compliantRule1)).toBeResolved();

			expectAsync(Rule.deleteRule(compliantRule)).toBeResolved();
			expectAsync(Rule.deleteRule(compliantRule1)).toBeResolved();
		});

	});
});