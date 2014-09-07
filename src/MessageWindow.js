var READING_TIME                = 3 * FPS;
var HEIGHT_FONT                 = 25;

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

MessageWindow.prototype.getMessagesNumber = function() {
    return this._messages.length;
};

MessageWindow.prototype.getMessage = function(index) {
    return this._messages[index];
};

MessageWindow.prototype.add = function(message) {
    this._messages.push(message);
}

MessageWindow.prototype._drawWindowBackground = function(ctx) {
    if (this._messages.length > 0) {
        ctx.strokeStyle = "rgba(26, 26, 26, 0.3)";
        ctx.fillStyle = "rgba(26, 26, 26, 0.3)";
        var l = Math.min(5, this._messages.length-1);
        var h = (l+1) * HEIGHT_FONT + 15;
        var x = ctx.canvas.width / 10;
        var y = ctx.canvas.height / 2 - h / 2;
        ctx.fillRect(x, y, x*8, h);
    }
}

MessageWindow.prototype._drawMessages = function(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "bold 12px 'Lucida Console', Monaco, monospace";
    var l = Math.min(5, this._messages.length-1);
    var h = l * HEIGHT_FONT;
    for (var index = 0; index <= l; index++) {
        var text = this._messages[index];
        var textWidth = ctx.measureText(text).width;
        var x = ctx.canvas.width / 2 - textWidth / 2;
        var y = ctx.canvas.height / 2 - h / 2 + HEIGHT_FONT * index;
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