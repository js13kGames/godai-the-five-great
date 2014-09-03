function UI(scene) {
    this._scene = scene;
    
    this._createUI();
}

UI.prototype._createUI = function() {
    var divUI = document.getElementById("divUI");
    divUI.style.display = "block";
};