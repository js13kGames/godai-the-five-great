function PlayScene(game) {
    this._game = game;
    
    this._time = new Time(this, {hours: 6, minutes: 15});
}

PlayScene.prototype._checkDaysLeft = function() {
    if (this._time.getDaysLeft() <= 0) {
        this._game.setScene(new StartupScene(this._game));
    }
};

PlayScene.prototype.keyPressed = function(keys) {
    
};

PlayScene.prototype.mouseClick = function() {
    
};

PlayScene.prototype.draw = function(ctx) {
    this._time.draw(ctx);
};

PlayScene.prototype.tick = function() {
    this._time.tick();
    
    this._checkDaysLeft();
};