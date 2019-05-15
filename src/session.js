class PoolObject {
	constructor(name, instObject, type) {
		this.id = this.generateID(type, name);
		this.instanceName = name;
		this.objectType = type;
		this.instObject = instObject;
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
		this.pool = []
	}

}

Session.prototype.toggleActive = function(state) {
	this.active = state;
};

Session.prototype.setCurrentRPG = function(rpgName) {
	// check if rpg exists
	// currentRPG = rpgName
	// set auth.db values ? ou un truc du genre
};

Session.prototype.addObject = function(name, newObject, objectType) {
	this.pool.push(new PoolObject(name, newObject, objectType));
};

Session.prototype.removeObject = function(id, objectType) {
	var indexFound = pool.findIndex(function (element) {
		return element.objectType === objectType && element.id === id;
	});

	this.pool.splice(indexFound, 1);
};

Session.prototype.cleanSession = function() {
	this.pool.length = 0;
}

Session.prototype.takeObject = function(givenId, recieverId) {
	// check si les id existent

	// check si le receveur a une place de disponible pour ce type d'objet

	// add object to reciever
};

Session.prototype.releaseObject = function(releaserId, objectName) {
	// check si l'id existe

	// check si l'objet existe dans la définition de contenu du type

	// demander informations complémentaires si besoin
	// genre, quelle quantité d'un objet
};

Session.prototype.giveObject = function(releaserId, objectName, receiverId) {
	var givenObj = this.releaseObject(releaserId, objectName);
	this.takeObject(givenObj.id, receiverId);
};

// https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
function hashCode(str) {
	let h = 0;

	for (let i = 0; i < str.length; i++) {
		h= Math.imul(31, h) + str.charCodeAt(i) | 0;
	}
	return h;
};

// on exporte ? session ? pool ? les deux ?
module.exports = new Session();