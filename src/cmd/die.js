const Content = require("./../content.js");

function calculateDice(throwSettings, comparedStat) {
	const minValue = 1;
	let average = 0;

	let numbers = Array.from({length: throwSettings.rollTimes});
	let sum = numbers.map((bruh, i) => {
		let drawnNumber = generateNumber(throwSettings.maxFaces, minValue, throwSettings.mod, comparedStat);
		return drawnNumber;
	});

	return sum.reduce((cumulated, generatedNumber) => {
		return cumulated + generatedNumber;
	});
};

function generateDice() {
	let args = Array.from(arguments);
	if (!args.length) {
		// gérer une erreur
	}

	let rawDiceData = args[0].split("d");

	if (rawDiceData.length !== 2) {
		// gérer une erreur
	}

	let [rollTimes, maxFaces] = rawDiceData;
	let throwSettings = {
		rollTimes, maxFaces
	};

	if (isNaN(rollTimes) || isNaN(maxFaces)) {
		// gérer une erreur
	}

	if (!rollTimes || !maxFaces) { 
		return 0;
	}

	if (args.length > 1) {
		throwSettings = Object.assign(throwSettings, setThrowSettings(args));
	}

	return throwDice(throwSettings);
};

function generateNumber(faces, minValue, mod, comparedStat) {
	return Math.floor(Math.random() * (faces + 1 - minValue)) + minValue + mod - comparedStat;
};

function setThrowSettings(args) {
	for (let arg of args) {
		if ((arg.startsWith("+") || arg.startsWith("-"))
			&& +arg) {
			obj.mod = +arg;
		} else if (+arg) {
			obj.threshold = arg;
		} else {
			obj.stat = arg;
		}
	}
	return obj;
};

function throwDice(throwSettings) {
	return new Promise((resolve, reject) => {
		if (throwSettings.stat) {
			if (currentRPG) {
				Content.getWhatever().then((content) => {
					let stat = //whatever
					let sum = calculateDice(throwSettings, stat);
					// send msg
					resolve(sum);
				});
			} else {
				// erreur
			}
		} else {
			let sum = calculateDice(throwSettings, 0);
			// send msg
			resolve(sum);
		}
	});
};

module.exports = generateDice;
