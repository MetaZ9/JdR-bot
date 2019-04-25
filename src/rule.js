const grades = require('grades.js');
const mongodb = require('mongodb.js');

class Rule {
	let ruleName = '';
	let isHidden = true;
	let minGrade = Grades.ADMIN;
	let ruleCore = {};
	let callback = '';

	function createRule() {
		//create logic

		setRuleByName(name);
	}

	function setRuleByName(name) {
		//export to database

		return this;
	}

	function getRuleByName(name) {
		//import from database

		return this;
	}

	function showRuleByName(name) {
		//show logic

	}

	function alterRuleByName(name) {
		//alter logic

		return this;
	}

	function deleteRuleByName(name) {
		//deleteRule
	}

}