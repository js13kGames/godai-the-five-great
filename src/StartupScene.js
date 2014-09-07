function StartupScene(game) {
    this._game = game;
    
    document.getElementById("divUI").style.display = "none";
}

StartupScene.prototype.keyPressed = function (key) {
    if (key == KEY_ENTER) {
        this._game.setScene(new PlayScene(this._game));
    }
};

StartupScene.prototype.mouseClick = function() {
    this._game.setScene(new PlayScene(this._game));
};

StartupScene.prototype._clearCanvas = function(ctx) {
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

StartupScene.prototype._drawText = function (ctx) {
    ctx.fillStyle = "rgb(26, 26, 26)";
    ctx.font = "bold 14px Verdana, Geneva, sans-serif";
    var text = "PRESS ENTER KEY OR TAP HERE";
    var textWidth = ctx.measureText(text).width;
    var x = ctx.canvas.width/2 - textWidth/2;
    var y = ctx.canvas.height/2;
    ctx.fillText(text, x, y);
};

StartupScene.prototype.draw = function(ctx) {
    this._clearCanvas(ctx);
    this._drawText(ctx);
};

StartupScene.prototype.tick = function() {
    
};