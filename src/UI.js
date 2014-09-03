function UI(scene) {
    this._scene = scene;
    
    this._createUI();    
    this._initializeUI();
}

UI.prototype._createUI = function() {
    var divUI = document.getElementById("divUI");
    divUI.style.display = "block";
};

UI.prototype._initializeUI = function() {
    this._restButton = document.getElementById("rest");
    this._walkButton = document.getElementById("walk");
    
    this._restButton.onclick = this._scene.getMiyamoto().changeStateTo(RESTING);
    this._walkButton.onclick = this._scene.getMiyamoto().changeStateTo(WALKING);
};