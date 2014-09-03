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
    var that = this;
    
    this._restButton = document.getElementById("rest");
    this._walkButton = document.getElementById("walk");
    
    this._restButton.onclick = function(e) {
        that._scene.getMiyamoto().changeStateTo(RESTING);
    };
    this._walkButton.onclick = function(e) {
        that._scene.getMiyamoto().changeStateTo(WALKING);
    };
        
    console.log(this._restButton.onclick);
};