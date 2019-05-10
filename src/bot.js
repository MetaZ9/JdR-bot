const {Client} = require("discord.js");
const config = require("./auth.json");
const Gabriel = new Client();

Gabriel.on("message", message => {
	let rawCommand = message.content;
	let channel = message.channel;

	if (rawCommand.startsWith("g!")) {
		parse(message);
		message.channel.send("pouet");

		let command = rawCommand.substring(2, rawCommand.indexOf(' '));
	}
});

Gabriel.login(config.token);

function parse(token) {
	// THE MARVELOUS OPTIMISATION THAT NO ONE WILL REMARK OR CARE ABOUT BUT WILL SPEEDUP EVERYTHING AND IS TRULY BEYOND OUR UNDERSTANDING
	// Faire en sorte que les cases soient rangés par probabilité d'utilisation (dans l'ordre des commandes dont on se sert le plus)
	// pour éviter au maximum de traverser l'ensemble du switch

	switch(token) {
		case 'throw':
		case 'dice':
		case 'roll':
			//CASE throw/roll dices
			//args - 1-4
			//1 : nbDésALancer d nbFacesDuDé
			//2 : stat de comparaison (nécessite que le lanceur ait un perso dans le JDR courant)
			//3 : modificateur +/-
			//4 : seuil échec/réussite

			let args = rawCommand.substring(rawCommand.indexOf(' ')).split(' ');

			if (args.length < 1)
				return; //error

			let rawDiceData = args[0].split('d');

			if (rawDiceData.length !== 2)
				return; //error

			if (isNaN(rawDiceData[0]) || isNaN(rawDiceData[1]))
				return; //error

			if (args.length > 1) {
				let threshold;
				let mod;
				let stat;

				for (var i = 1; i < args.length; i++) {
					//small improvement : check if variable is already set and send a warning ?

					//amélioration sur threshold : >x / =x / <x pour savoir si la valeur doit être strictement supérieure/inférieure ou sup/inf ou égal, default =>x, configurable dans le ruleset.json
					//comment savoir si on test sur la stat du personnage ou d'une de ses dépendances, ou encore d'un objet du pool ? utilisation d'un id ? compatible avec l'amélioration sur threshold 
					if (isNaN(args[i]))
						threshold = args[i];
					else if (args[i].startsWith("+") || args[i].startsWith("-"))
						mod = args[i];
					else
						stat = args[i];
				}

			}

			throwDices(rawDiceData[0], rawDiceData[1], stat, mod, threshold);

			break;
		case 'start':
			//CASE start session
			//REQUIRE GameMaster
			//args - 0

			break;
		case 'end':
			//CASE end session
			//REQUIRE GameMaster
			//args - 1
			//1 : save current session

			break;
		case 'setRPG':
			//CASE set current RPG
			//REQUIRE GameMaster
			//args - 1
			//1 : RPG name

			break;
		case 'add':
			//CASE add rule/content to RPG
			//REQUIRE GameMaster
			//args - 2
			//1 : content type to add
			//2 : name

			break;
		case 'modify':
		case 'mod':
			//CASE alter rule/content to RPG
			//REQUIRE GameMaster
			//args - 2
			//1 : content type to alter
			//2 : name

			break;
		case 'delete':
		case 'del':
			//CASE delete rule/content of RPG
			//REQUIRE GameMaster
			//args - 2
			//1 : content type to delete
			//2 : name

			break;
		case 'spawn':
			//CASE spawn content in session
			//REQUIRE GameMaster or gmGrace
			//REQUIRE session to be active
			//args - 2
			//1 : content type to spawn
			//2 : name

			break;
		case 'set':
			//CASE set content of session
			//REQUIRE GameMaster or gmGrace
			//REQUIRE session to be active
			//args - 3
			//1 : id of content
			//2 : param to set
			//3 : value of param

			break;
		case 'give':
			//CASE attach content to other content
			//REQUIRE GameMaster or gmGrace
			//REQUIRE session to be active
			//args - 2
			//1 : id of content to attach
			//2 : id of reciever

			break;
		case 'remove':
			//CASE remove content from session
			//REQUIRE GameMaster or gmGrace
			//REQUIRE session to be active
			//args - 2
			//1 : id of content to remove

			break;
		case 'clean':
			//CASE clean all session content
			//REQUIRE GameMaster
			//REQUIRE session to be active
			//args - 1+
			//1+ : content types not cleaned

			break;
		default:
			//check if it is the name of a rule
				//get all Rules name
			let rules = Rule.getAllRules();
			let isValidRule = false;

			for (var i = 1; i < rules.length; i++) {		//i = 1 parce que la 1ère " règles " est toujours la définition des contenus
				if (token === rules[i]) {
					isValidRule = true;

					break;
				}

			}

			if (isValidRule) {
				let rule = Rule.getRule(token);
				let player = Content.getContent();

				if (player.grade < rule.minGrade)
					return; //error grade too low

				//performAction
				applyRule(rule);

				return; //effect message
			}

			return; //error unknown keyword
			break;
	}

}


function throwDices(diceNb, diceFaces, againstStat, mod, threshold) {						//throwDices(diceNb, diceFaces, againstStat, for, mod, threshold)
	if (againstStat !== null || againstStat !== undefined /*not sure of which one*/) {
		if (currentRPG === null)
			return; //error

		//check if stat exists in the ruleset and his integer
		//or simply check for character.stats.againstStat

		//againstStat = chatacter.statMods.againstStat
	}

	let numbers = [];
	let sum = 0;
	let mean = 0;
	const minValue = 1;			//either that ou on simplifie la formule de génération des nombres

	//generate numbers
	for (var i = 0; i < diceNb + 1; i++) {
		numbers[i] = Math.floor(Math.random()*(diceFaces+1 - minValue)) + minValue + mod + (againstStat || 0);
		sum += numbers[i];
		mean += (numbers[i] - mean)/(i + 1);
	}

	if (threshold === null)
		return; //send message

	let isSuccess = sum >= threshold;		//si on rajoute l'amélioration sur threshold, il faudra utiliser un truc du genre compare(a, b, operator)

	return; //send message
}

function applyRule(rule)
{

}