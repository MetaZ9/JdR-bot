class PoolItem {
	constructor(name, instItem, type) {
		this.instanceName = name;
		this.itemType = type;
		this.instItem = instItem;
	}
}

class Session {
	constructor() {
		this.active = false;
		this.currentRPG = null;
		this.pool = {};
	}
}

Session.prototype.toggleActive = function() {
	this.active = !this.active;
};

Session.prototype.setCurrentRPG = function(rpgName) {
	// check if rpg exists
	// currentRPG = rpgName
	// set auth.db values ? ou un truc du genre
};

Session.prototype.addItem = function(itemName, itemType) {
	const hash = generateID(itemType, itemName);
	this.pool[hash] = new PoolItem(itemName, itemType);
};

Session.prototype.removeItem = function(id) {
	if (id in this.pool) {
		delete this.pool[id];
	} else {
		// erreur : contenu non présent
	}
};

Session.prototype.cleanSession = function() {
	this.pool.length = 0;
}

Session.prototype.takeItem = function(givenId, receiverId) {
	// check si les id existent

	// check si le receveur a une place de disponible pour ce type d'objet

	// add Item to receiver
};

Session.prototype.releaseItem = function(id, ItemName, quantity = 1) {
	// check si l'id existe

	// check si l'objet existe dans la définition de contenu du type

	// demander informations complémentaires si besoin
	// genre, quelle quantité d'un objet
};

Session.prototype.giveItem = function(releaserId, ItemName, receiverId) {
	let givenObj = this.releaseItem(releaserId, ItemName);
	this.takeItem(givenObj.id, receiverId);
};

Session.prototype.get = function(id) {
	if (id in this.pool) {
		return this.pool[id].instItem;
	} else {
		// erreur : contenu introuvable
	}
}

Session.prototype.setProp = function(id, prop, value) {
	this.get(id).instItem[prop] = value;
}

Session.prototype.setObj = function (ItemID, newObj) {
	this.get(ItemID).instItem = newObj;
}

// Mettre dans le utils.js plutôt ?
// Quel utils.js õ_ô ?
// https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
function hashCode(str) {
	let h = 0;
	for (let i = 0; i < str.length; i++) {
		h = Math.imul(31, h) + str.charCodeAt(i) | 0;
	}
	return h;
};

function generateID(type, name) {
	//generate hash
	return hashCode(hashCode(type).toString() + hashCode(name).toString());
};

module.exports = new Session();
