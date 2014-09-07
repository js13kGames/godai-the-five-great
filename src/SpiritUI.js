function SpiritUI(scene) {
    this._scene = scene;
    
    this._createSpiritUI();    
    this._initializeSpiritUI();
}

SpiritUI.prototype._createSpiritUI = function() {
    var divSpiritUI = document.getElementById("divSpirit");
    divSpiritUI.style.display = "none";
};

SpiritUI.prototype._initializeSpiritUI = function() {
    var that = this;
    
    this._earthButton = document.getElementById("earthUP");
    this._waterButton = document.getElementById("waterUP");
    this._fireButton = document.getElementById("fireUP");
    this._airButton = document.getElementById("airUP");
    this._voidButton= document.getElementById("voidUP");
    
    this._earthButton.onclick = function(e) {
        that.hide();
        that._scene.showUI();
        that._scene.play();
        that._scene.getMessageWindow().add("Sample Earth power adquired");
    };
    this._waterButton.onclick = function(e) {
        that.hide();
        that._scene.showUI();
        that._scene.play();
        that._scene.getMessageWindow().add("Sample Water power adquired");
    };
    this._fireButton.onclick = function(e) {
        that.hide();
        that._scene.showUI();
        that._scene.play();
        that._scene.getMessageWindow().add("Sample Fire power adquired");
    };
    
    this._airButton.onclick = function(e) {
        that.hide();
        that._scene.showUI();
        that._scene.play();
        that._scene.getMessageWindow().add("Sample Air power adquired");
    };
    
    this._voidButton.onclick = function(e) {
        that.hide();
        that._scene.showUI();
        that._scene.play();
        that._scene.getMessageWindow().add("Sample Void power adquired");
    };
};

SpiritUI.prototype.show = function() {
    var divUI = document.getElementById("divSpirit");
    divUI.style.display = "block";
};

SpiritUI.prototype.hide = function() {
    var divUI = document.getElementById("divSpirit");
    divUI.style.display = "none";
};

SpiritUI.prototype.tick = function() {
    
};