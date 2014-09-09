function BattleWindow(scene) {
    this._scene = scene;
    
    this._visible = false;
}

BattleWindow.prototype.show = function(ctx) {
    this._visible = true;
};

BattleWindow.prototype.hide = function(ctx) {
    this._visible = false;
};

BattleWindow.prototype._drawWindowBackground = function(ctx) {
    
}

BattleWindow.prototype.draw = function(ctx) {
    if (!this._visible) {
        return;
    }
    
    this._drawWindowBackground(ctx);
};

BattleWindow.prototype.tick = function() {
    if (this._visible) {
        console.log("BattleWindow ticking");
    }        
};