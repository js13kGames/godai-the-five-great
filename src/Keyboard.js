function Keyboard(game) {
    this._game = game;
    this._keys = {};
    this._listen();
}

Keyboard.prototype._listen = function() {
    var that = this;
    document.onkeydown = function(event) {
        that._keys[String(event.keyCode)] = true;
        event.preventDefault();
    };
};

Keyboard.prototype.handleKeypresses = function() {
    for (var key in this._keys) {
        if (this._keys[key]) {
            this._game.keyPressed(key);
        }
    }
    this._keys = {};
};