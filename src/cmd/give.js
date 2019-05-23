const {owner, gm} = require("./../auth.json");
const Rule = require("./")
const {flatten} = require("lodash");

//giver = membre utilisant la commande
//target = nom du membre-cible ou de son personnage ?
function giveObject() {
// récupérer le personnage du giver
// récupérer l'objet (par le nom ?)
// le détacher du giver
// si target, lui attacher l'objet (vérifier au content type)
// sinon, laisser l'objet dans le pool

}

module.exports = giveObject;
/*
module.exports = function(message) {
	return function(...args) {
		if (flatten([owner, gm]).includes(message.author.id)) {
			// send help 
		}
	}
};*/