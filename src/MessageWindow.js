var READING_TIME                = 3 * FPS;
var FADING_TIME                 = 2.5 * FPS;
var HEIGHT_FONT                 = 25;

function MessageWindow(scene) {
    this._scene = scene;
    
    this._messages = [];
    this._visible = false;
    this._count = 0;
    
    this.show();
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

MessageWindow.prototype.add = function(msg) {
    if (msg != MSG_HUNGER_DAMAGE && msg != this._messages[this._messages.length-1]) {
        this._messages.push(msg);
    }
}

MessageWindow.prototype._drawWindowBackground = function(ctx) {
    if (this._messages.length > 0) {
        var offY = (this._count - FADING_TIME > 0) ? this._count - FADING_TIME : 0; 
        offY = offY * HEIGHT_FONT / (READING_TIME - FADING_TIME);
        
        var fade = 0;
        if (this._messages.length == 1) {
            fade = (this._count - FADING_TIME) / (READING_TIME - FADING_TIME) * 0.3;
            fade = (fade > 0) ? fade : 0;
        }            
        ctx.strokeStyle = "rgba(26, 26, 26, " + (0.3 - fade) + ")";
        ctx.fillStyle = "rgba(26, 26, 26, " + (0.3 - fade) + ")";
        
        var l = Math.min(5, this._messages.length-1);
        if (l == 5) offY = 0;
        var h = (l+1) * HEIGHT_FONT + 15 - offY;
        var x = ctx.canvas.width / 10;
        var y = ctx.canvas.height / 2 - h / 2;
        ctx.fillRect(x, y, x*8, h);    
    }
}

MessageWindow.prototype._drawMessages = function(ctx) {
    ctx.fillStyle = "red";
    ctx.font = "bold 12px 'Lucida Console', Monaco, monospace";
    var l = Math.min(5, this._messages.length-1);
    var h = l * HEIGHT_FONT;
    
    var text = this._messages[0];
    var offY = (this._count - FADING_TIME > 0) ? this._count - FADING_TIME : 0;
    offY = offY * HEIGHT_FONT / (READING_TIME - FADING_TIME);
    var fade = 1 - (1 * offY / (READING_TIME - FADING_TIME));
    if (text) {
        var textWidth = ctx.measureText(text).width;
        var x = ctx.canvas.width / 2 - textWidth / 2;
        ctx.fillStyle = "rgba(255, 255, 255, " + fade + ")";
        var y = ctx.canvas.height / 2 - h / 2 - offY;
        ctx.fillText(text, x, y);
    }
    
    ctx.fillStyle = "white";
    for (var index = 1; index <= l; index++) {
        text = this._messages[index];
        textWidth = ctx.measureText(text).width;
        x = ctx.canvas.width / 2 - textWidth / 2;
        y = ctx.canvas.height / 2 - h / 2 + (HEIGHT_FONT * index) - offY/2 ;
        ctx.fillText(text, x, y);
    }
    
    if (this._messages.length > 6) {
        x = 9 * ctx.canvas.width / 10 - 20;
        y = 1.82 * h;
        ctx.fillText("+" + (this._messages.length - 6), x, y);
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
    if (this._visible  && this._messages.length > 0) {
        this._count++;
        if (this._count >= READING_TIME) {
            this._count = 0;
            this._messages.splice(0, 1);
        }
    }        
};