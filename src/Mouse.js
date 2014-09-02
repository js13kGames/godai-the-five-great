function Mouse(game) {
    this._game = game;
    this._event = undefined;
    this._listen();
}

Mouse.prototype._listen = function() {
    var that = this;
    document.onmousedown = function(event) {
        that._event = event;
        event.preventDefault();
    };
};

Mouse.prototype.handleMouseclicks = function() {
    if (this._event && this._event.originalTarget.id == "canvas") {
        this._game.mouseClick();
    }
    this._event = undefined;
};