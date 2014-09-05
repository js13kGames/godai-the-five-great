function PlayScene(game) {
    this._game = game;
    
    this._time = new Time(this, {hours: 6, minutes: 15});
    this._distance = new Distance();
    this._miyamoto = new Miyamoto(this);
    this._ui = new UI(this);
}

PlayScene.prototype._checkGameOver = function() {
    if (this._distance.getDistance() <= 0) {
        this._game.setScene(new WinScene(this._game));
    }
    
    if (this._time.getDaysLeft() <= 0) {
        this._game.setScene(new StartupScene(this._game));
    }
    if (this._miyamoto.getLife() <= 0) {
        this._game.setScene(new StartupScene(this._game));
    }
};

PlayScene.prototype.getMiyamoto = function() {
    return this._miyamoto;
};

PlayScene.prototype.getDistance = function() {
    return this._distance;
};

PlayScene.prototype.keyPressed = function(keys) {
    
};

PlayScene.prototype.mouseClick = function() {
    
};

PlayScene.prototype.draw = function(ctx) {
    this._time.draw(ctx);
    this._distance.draw(ctx);
    this._miyamoto.draw(ctx);
};

PlayScene.prototype.tick = function() {
    this._time.tick();
    this._ui.tick();
    this._miyamoto.tick();
    
    this._checkGameOver();
};