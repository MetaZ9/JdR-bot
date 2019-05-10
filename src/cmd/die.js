const Content = require("./../content.js");

function calculateDice(throwSettings, comparedStat) {
	const minValue = 1;
	let average = 0;

	let numbers = Array.from({length: throwSettings.rollTimes});
	let sum = numbers.map((bruh, i) => {
		let drawnNumber = generateNumber(throwSettings.maxFaces, minValue, throwSettings.mod, comparedStat);
		average += (drawnNumber - average)/(i+1);
		return drawnNumber;
	});
	// reste à savoir comment se servir d'average, non ? Ça fait de la mémoire occupée en plus :}

	return sum.reduce((cumulated, generatedNumber) => {
		return cumulated + generatedNumber;
	});
};

function generateDice() {
	let throwSettings = {};
	if (!arguments.length) {
		// gérer une erreur
	}
	let rawDiceData = arguments[0].split("d");
	if (rawDiceData.length !== 2) {
		// gérer une erreur
	}
	let [rollTimes, maxFaces] = rawDiceData;
	if (isNaN(rollTimes) || isNaN(maxFaces)) {
		// gérer une erreur
	}
	if (!rollTimes || !maxFaces) { 
		// gérer une erreur
		// parce que bon, 0d5 à quoi ça sert franchement
	}

	if (arguments.length > 1) {
		throwSettings.rollTimes = rollTimes;
		throwSettings.maxFaces = maxFaces;
		for (let i = 0; i < args.length; i++) {
			if (+args[i]) {
				throwSettings.threshold = args[i];
			} else if ((args[i].startsWith("+") || args[i].startsWith("-"))
						&& +args[i]) {
				throwSettings.mod = +args[i];
			} else {
				throwSettings.stat = args[i];
			}
		}

		if (!throwSettings.mod || !throwSettings.threshold) {
			// erreur comme quoi il manque un argument nécessaire pour la comparaison
		}
	}

	return throwDices(throwSettings);
};

function generateNumber(faces, minValue, mod, comparedStat) {
	return Math.floor(Math.random() * (faces + 1 - minValue)) + minValue + mod - comparedStat;
};

function throwDices(throwSettings) {
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
