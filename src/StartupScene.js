function StartupScene(game) {
    this._game = game;
    
    this._count = 0;
    
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
    ctx.fillStyle = "rgba(26, 26, 26, " + Math.abs(Math.cos(this._count / Math.PI / 4)) +")";
    ctx.font = "bold 14px Verdana, Geneva, sans-serif";
    var text = "PRESS ENTER KEY OR TAP HERE";
    var textWidth = ctx.measureText(text).width;
    var x = ctx.canvas.width/2 - textWidth/2;
    var y = ctx.canvas.height * 0.75;
    ctx.fillText(text, x, y);
    
    ctx.fillStyle = "rgb(26, 26, 26)";
    ctx.font = "bold 24px Verdana, Geneva, sans-serif";
    text = "GODAI";
    textWidth = ctx.measureText(text).width;
    var x = ctx.canvas.width/2 - textWidth/2;
    var y = ctx.canvas.height * 0.40;
    ctx.fillText(text, x, y);
    
    ctx.font = "bold 21px Verdana, Geneva, sans-serif";
    text = "The five great";
    textWidth = ctx.measureText(text).width;
    var x = ctx.canvas.width/2 - textWidth/2;
    var y = ctx.canvas.height * 0.50;
    ctx.fillText(text, x, y);
};

StartupScene.prototype.draw = function(ctx) {
    this._clearCanvas(ctx);
    this._drawText(ctx);
};

StartupScene.prototype.tick = function() {
    this._count ++;
};