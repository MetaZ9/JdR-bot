const Rule = require("./../src/rule.js");
const {MongoClient} = require("mongodb");
const auth = require("./../src/auth.json");
const client = require("./../src/database.js");

describe("Rule validity", () => {
	let compliantRule = {
			ruleName: "bruh",
			minGrade: 5,
			isHidden: true,
			ruleCore: {
				bruh: "x"
			},
			callback: function() {

			}
		};

	it("should invalidate invalid rule objects", () => {
		let messedRule1 = {
			ruleName: 36
		};
		let messedRule2 = {
			ruleName: "a valid name",
			isHidden: "no"
		};
		let messedRule3 = {
			ruleName: "valid",
			isHidden: false,
			minGrade: "ur mom"
		};
		let messedRule4 = {
			ruleName: "valid",
			isHidden: true,
			minGrade: 4,
			ruleCore: "bruh"
		};
		let messedRule5 = {
			ruleName: "no",
			isHidden: false,
			minGrade: 36,
			ruleCore: {
				urMom: true
			},
			callback: "call me maybe"
		};

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

	it("properly format a rule", () => {
		let {ruleName} = compliantRule;
		let newRules = Rule.formatRule(compliantRule);
		expect(newRules._id).toBe(ruleName);
		expect(newRules.ruleName).toBeFalsy();
	});
});

describe("Rule gestion", () => {
	let messedRule1 = {
		ruleName: 36
	};
	let messedRule2 = {
		ruleName: "a valid name",
		isHidden: "no"
	};
	let messedRule3 = {
		ruleName: "valid",
		isHidden: false,
		minGrade: "ur mom"
	};
	let messedRule4 = {
		ruleName: "valid",
		isHidden: true,
		minGrade: 4,
		ruleCore: "bruh"
	};
	let messedRule5 = {
		ruleName: "no",
		isHidden: false,
		minGrade: 36,
		ruleCore: {
			urMom: true
		},
		callback: "call me maybe"
	};
	let compliantRule = {
		ruleName: "bruh",
		minGrade: 5,
		isHidden: true,
		ruleCore: {
			bruh: "x"
		},
		callback: function() {

		}
	};
	let compliantRule1 = {
		ruleName: "brah",
		minGrade: 2,
		isHidden: false,
		ruleCore: {
			bruh: "xyz"
		},
		callback: function() {

		}
	};

	it("should reject any action if no connection", () => {
		client.close(function(error) {
			expectAsync(Rule.alterRule(compliantRule.ruleName, messedRule2)).toBeRejected();
			expectAsync(Rule.deleteRule(messedRule3.ruleName)).toBeRejected();
			expectAsync(Rule.getRule(compliantRule.ruleName)).toBeRejected();
			expectAsync(Rule.createRule(compliantRule)).toBeRejected();
		});
	});

client.connect(function(err) {
	if (err) {
		throw err;
	}
	console.log("Database server connected and ready to operate.");
});

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
			Rule.alterRule(messedRule1.ruleName, messedRule1);
		}).toThrow();
		expect(function() {
			Rule.alterRule(messedRule1.ruleName, messedRule2);
		}).toThrow();
		expect(function() {
			Rule.alterRule(messedRule1.ruleName, messedRule3);
		}).toThrow();
		expect(function() {
			Rule.alterRule(messedRule1.ruleName, messedRule4);
		}).toThrow();
		expect(function() {
			Rule.alterRule(messedRule1.ruleName, messedRule5);
		}).toThrow();

	});

	it("should not alter, delete or get if rule doesn't already exist", () => {
		expectAsync(Rule.getRule(compliantRule)).toBeRejected();
		expectAsync(Rule.getRule(compliantRule1)).toBeRejected();

		expectAsync(Rule.deleteRule(compliantRule)).toBeRejected();
		expectAsync(Rule.deleteRule(compliantRule1)).toBeRejected();

		expectAsync(Rule.alterRule(compliantRule.ruleName, compliantRule1)).toBeRejected();

	});

	it("should create or set rule if valid", () => {
		expectAsync(Rule.createRule(compliantRule)).toBeResolved();
		expectAsync(Rule.createRule(compliantRule1)).toBeResolved();

		expectAsync(Rule.setRule(compliantRule)).toBeResolved();
		expectAsync(Rule.setRule(compliantRule1)).toBeResolved();
	});

	it("should get, alter, rule if existing and valid", () => {
		expectAsync(Rule.getRule(compliantRule)).toBeResolved();
		expectAsync(Rule.getRule(compliantRule1)).toBeResolved();

		expectAsync(Rule.alterRule(compliantRule.ruleName, compliantRule1)).toBeResolved();

		expectAsync(Rule.deleteRule(compliantRule)).toBeResolved();
		expectAsync(Rule.deleteRule(compliantRule1)).toBeResolved();
	});

});