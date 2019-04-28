const Rule = require("./../src/rule.js");

describe("Rule class", () => {
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
		let validRule = {
			ruleName: "yes we can",
			isHidden: true,
			minGrade: 200000,
			ruleCore: {
				s: "s"
			},
			callback: function() {
				console.log("bruh");
			}
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
		expect(Rule.validateRule(validRule)).toBe(true);
	});
});