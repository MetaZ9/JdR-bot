class PoolObject {
	constructor(name, instObject, type) {
		this.id = generateID(type, name);
		this.instanceName = name;
		this.objectType = type;
		this.instObject = instObject;
	}

	generateID = function (type, name) {
		//generate hash
		return (type.toString().hashCode()+name.hashCode()).hashCode();
	}

}

class Session {
	constructor() {
		this.isActive = false;
		this.currentRPG = null;
		this.pool = []
	}

}

Session.prototype.setActive = function(state) {
	return isActive = state ? true : false;
};

Session.prototype.setCurrentRPG = function(rpgName) {
	// check if rpg exists
	// currentRPG = rpgName
	// set auth.db values ? ou un truc du genre
};

Session.prototype.addObject = function(name, newObject, objectType) {
	pool.push(new PoolObject(name, newObject, objectType));
};

Session.prototype.removeObject = function(id, objectType) {
	var indexFound = pool.findIndex(function (element) {
		return element.objectType === objectType && element.id === id;
	});

	pool.splice(indexFound, 1);
};

Session.prototype.cleanSession = function() {
	pool.length = 0;
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

Session.prototype.giveObject = function(releaserId, objectName, recieverId) {
	var givenObj = releaseObject(releaserId, objectName);
	takeObject(givenObj.id, recieverId);
};