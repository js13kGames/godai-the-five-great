var READING_TIME                = 3 * FPS;

function MessageWindow(scene) {
    this._scene = scene;
    
    this._messages = [
        "Sample message number ONE",
        "Sample message number TWO",
        "Sample message number THREE",
        "Sample message number FOUR",
        "Sample message number FIVE",
        "Sample message number SIX"
    ];
    this._visible = false;
    this._count = 0;
}

MessageWindow.prototype.show = function(ctx) {
    this._visible = true;
};

MessageWindow.prototype.hide = function(ctx) {
    this._visible = false;
};

MessageWindow.prototype._drawWindowBackground = function(ctx) {
    ctx.strokeStyle = "rgba(26, 26, 26, 0.3)";
    ctx.fillStyle = "rgba(26, 26, 26, 0.3)";
    var x = ctx.canvas.width / 10;
    var y = ctx.canvas.height / 5;
    ctx.fillRect(x, y, x*8, y*3);
}

MessageWindow.prototype._drawMessages = function(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "bold 12px 'Lucida Console', Monaco, monospace";
    for (var index = 0, l = this._messages.length; index < l; index++) {
        var text = this._messages[index];
        var textWidth = ctx.measureText(text).width;
        var x = ctx.canvas.width / 2 - textWidth / 2;
        var y = ctx.canvas.height / 5 + 25 * index + 30;
        ctx.fillText(text, x, y);
    }
};

MessageWindow.prototype.draw = function(ctx) {
    if (!this._visible) {
        return;
    }
    
    this._drawWindowBackground(ctx);
    this._drawMessages(ctx);
};

MessageWindow.prototype.tick = function() {
    if (this._visible) {
        this._count++;
        if (this._count >= READING_TIME) {
            this._count = 0;
            this._messages.splice(0, 1);
        }
    }        
};