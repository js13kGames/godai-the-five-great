var DEATHWINDOW_FADEIN_TIME    = 1.5 * FPS;

function DeathWindow(scene) {
    this._scene         = scene;
    
    this._initialize();
}

DeathWindow.prototype.show = function(ctx) {
    this._visible       = true;
    this._count         = 0;
    this._fadeIn        = true;
};

DeathWindow.prototype.hide = function(ctx) {
    this._visible = false;
    this._initialize();
};

DeathWindow.prototype.isVisible = function() {
    return this._visible;
};

DeathWindow.prototype._initialize = function() {
    this._visible       = false;
    this._count         = 0;
    this._fadeIn        = false;
    this._showTxt       = false;
    this._fadeBG        = 0;
    this._fadeTxt       = 0;
};

DeathWindow.prototype._drawWindowBackground = function(ctx) {
    if (this._fadeIn) {
        this._fadeBG = this._count / DEATHWINDOW_FADEIN_TIME;
    
        if (this._fadeBG >= 1) {
            this._fadeBG = 1;
            this._fadeIn = false;
            this._showTxt = true;
            this._count = 0;
        }
    }
        
    ctx.strokeStyle = "rgba(26, 26, 26, " + this._fadeBG + ")";
    ctx.fillStyle = "rgba(26, 26, 26, " + this._fadeBG + ")";

    var w = ctx.canvas.width;
    var h = ctx.canvas.height;
    ctx.fillRect(0, 0, w, h);
};

DeathWindow.prototype._drawText = function(txt, y, ctx, fade) {
    var textWidth = ctx.measureText(txt).width;
    var x = ctx.canvas.width / 2 - textWidth / 2;
    ctx.fillStyle = "rgba(255, 255, 255, " + fade + ")";
    ctx.fillText(txt, x, y);
};

DeathWindow.prototype._drawMessages = function(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "bold 12px 'Lucida Console', Monaco, monospace";

    if (this._showTxt) {
        this._fadeTxt = this._count / DEATHWINDOW_FADEIN_TIME;
        if (this._scene.getMiyamoto().getLife() <= 0) {
            this._drawText("Miyamoto Musashi is dead", ctx.canvas.height/2, ctx, this._fadeTxt);
        } else {
            this._drawText("Miyamoto did not accomplished the objective", ctx.canvas.height/2, ctx, this._fadeTxt);
        }
    }
};

DeathWindow.prototype.draw = function(ctx) {
    if (!this._visible) {
        return;
    }
    
    this._drawWindowBackground(ctx);
    this._drawMessages(ctx);
};

DeathWindow.prototype.tick = function() {
    if (this._visible) {
        this._count ++;
    }        
};