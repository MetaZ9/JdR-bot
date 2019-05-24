class PoolItem {
	constructor(name, instItem, type) {
		this.id = this.generateID(type, name);
		this.instanceName = name;
		this.ItemType = type;
		this.instItem = instItem;
	}

	generateID(type, name) {
		//generate hash
		return hashCode(hashCode(type).toString() + hashCode(name).toString());
	}

}

class Session {
	constructor() {
		this.active = false;
		this.currentRPG = null;
/******************************** TODO => utiliser une map plutôt, pour avoir pool[id] = obj. Du coup faut revoir le constructeur de PoolItem */
/******************************** ou pas :grin: */
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

Session.prototype.addItem = function(id, newItem, ItemType) {
	this.pool[id] = new PoolItem(id, newItem, ItemType);
};

Session.prototype.removeItem = function(id, ItemType) {
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
	this.pool[id].instItem[prop] = value;
}

Session.prototype.setObj = function (ItemID, newObj) {
	this.pool[id].instItem = newObj;
}

// https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
function hashCode(str) {
	let h = 0;
	for (let i = 0; i < str.length; i++) {
		h = Math.imul(31, h) + str.charCodeAt(i) | 0;
	}
	return h;
};

module.exports = new Session();
