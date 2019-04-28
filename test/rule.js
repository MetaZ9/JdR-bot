const Rule = require("./../src/rule.js");

describe("Rule class", () => {
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
		expect(Rule.validateRule(compliantRule)).toBe(true);
	});

	it("properly format a rule", () => {
		let {ruleName} = compliantRule;
		let newRules = Rule.formatRule(compliantRule);
		expect(newRules._id).toBe(ruleName);
		expect(newRules.ruleName).toBeFalsy();
	});
});