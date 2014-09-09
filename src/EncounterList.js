function EncounterList(scene) {
    this._scene = scene;
    this._encounters = ["void"];    
    
    this._createEncounterList();
}

EncounterList.prototype._createEncounterList = function() {
    
};

EncounterList.prototype.getEncounters = function() {
    return this._encounters;
}