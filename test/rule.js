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

		expect(Rule.validateRule(messedRule1)).toThrow(new Error("Rule name must be a string."));
		expect(Rule.validateRule(messedRule2)).toThrow(new Error("Whether a rule is hidden or not must be a boolean."))
		expect(Rule.validateRule(messedRule3)).toThrow(new Error("Minimal Grade must be an integer."));
		expect(Rule.validateRule(messedRule4)).toThrow(new Error("Rule core must be an object."));
		expect(Rule.validateRule(messedRule5)).toThrow(new Error("Callback must be a function.");
		expect(Rule.validateRule(validRule)).toBe(true);
	});
});