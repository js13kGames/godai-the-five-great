function Game() {
    this._scene = new StartupScene(this);
}

Game.prototype.setScene = function (scene) {
    this._scene = scene;
};

Game.prototype.getScene = function() {
    return this._scene;
};

Game.prototype.keyPressed = function(key) {
    this._scene.keyPressed(key);
};

Game.prototype.mouseClick = function() {
    this._scene.mouseClick();
};

Game.prototype.tick = function() {
    
};

Game.prototype.draw = function(ctx) {
    this._scene.draw(ctx);
};