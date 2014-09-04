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
    this._huntingButton = document.getElementById("hunt");
    this._feedButton = document.getElementById("feed");
    this._meditateButton= document.getElementById("meditate");
    
    this._restButton.onclick = function(e) {
        that._scene.getMiyamoto().changeStateTo(RESTING);
    };
    this._walkButton.onclick = function(e) {
        that._scene.getMiyamoto().changeStateTo(WALKING);
    };
    this._huntingButton.onclick = function(e) {
        that._scene.getMiyamoto().changeStateTo(HUNTING);  
    };
    
    this._feedButton.onclick = function(e) {
        that._scene.getMiyamoto().changeStateTo(FEEDING);  
    };
    
    this._meditateButton.onclick = function(e) {
        that._scene.getMiyamoto().changeStateTo(MEDITATE);
    };
};

UI.prototype._checkHuntingState = function() {
    if (this._scene.getMiyamoto().getState() != HUNTING) {
        this._huntingButton.value = "Hunt";
        this._huntingButton.innerHTML = "Hunt";
    } else {
        this._huntingButton.value = "Stop hunting";
        this._huntingButton.innerHTML = "Stop hunting";
    }
};

UI.prototype.tick = function() {
    this._checkHuntingState();
};