var BATTLEWINDOW_FADEIN_TIME    = 1.5 * FPS;
var BATTLEWINDOW_FADEOUT_TIME   = 1.5 * FPS;

function BattleWindow(scene) {
    this._scene         = scene;
    
    this._initialize();
}

BattleWindow.prototype.show = function(ctx) {
    this._visible       = true;
    this._count         = 0;
    this._fadeIn        = true;
};

BattleWindow.prototype.hide = function(ctx) {
    this._visible = false;
};

BattleWindow.prototype.launchEncounter = function(encounter) {
    this._encounter = encounter;
    this.show();
};

BattleWindow.prototype._initialize = function() {
    this._visible       = false;
    this._count         = 0;
    this._fadeIn        = false;
    this._showEnemy     = false;
    this._showResult    = false;
    this._fadeOut       = false;
    this._fadeBG        = 0;
    this._fadeTxtEnemy  = 0;
    this._fadeTxtResult = 0;
    this._encounter     = {};
};

BattleWindow.prototype._drawWindowBackground = function(ctx) {
    if (this._fadeIn) {
        this._fadeBG = this._count / BATTLEWINDOW_FADEIN_TIME * 0.9;
    
        if (this._fadeBG >= 0.9) {
            this._fadeBG = 0.9;
            this._fadeIn = false;
            this._showEnemy = true;
            this._count = 0;
        }
    }
    
    if (this._fadeOut) {
        this._fadeBG = (1 - ((this._count - 2*READING_TIME) / BATTLEWINDOW_FADEOUT_TIME))  * 0.9;
            
        if (this._fadeBG <= 0) {
            this._initialize();
            
            this.hide();
            this._scene.play();
            this._scene.showUI();
        }
    }
        
    ctx.strokeStyle = "rgba(26, 26, 26, " + this._fadeBG + ")";
    ctx.fillStyle = "rgba(26, 26, 26, " + this._fadeBG + ")";

    var w = ctx.canvas.width;
    var h = ctx.canvas.height;
    ctx.fillRect(0, 0, w, h);
};

BattleWindow.prototype._drawText = function(txt, y, ctx, fade) {
    var textWidth = ctx.measureText(txt).width;
    var x = ctx.canvas.width / 2 - textWidth / 2;
    ctx.fillStyle = "rgba(255, 255, 255, " + fade + ")";
    ctx.fillText(txt, x, y);
};

BattleWindow.prototype._drawMessages = function(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "bold 12px 'Lucida Console', Monaco, monospace";

    this._drawText("ENCOUNTER!", ctx.canvas.height * 0.75, ctx, this._fadeBG);
    
    if (this._showEnemy) {
        this._fadeTxtEnemy = this._count / BATTLEWINDOW_FADEIN_TIME;
        this._drawText("Miyamoto Musashi has run into " + this._encounter.name, 25, ctx, this._fadeTxtEnemy);
        var i = 0;
        this._drawText("His skills are:", 55, ctx, this._fadeTxtEnemy);
        for (var skill in this._encounter.skill) {
            this._drawText(skill + ": " + this._encounter.skill[skill], 70 + i*15, ctx, this._fadeTxtEnemy);
            i++;
        }
        
        this._drawText("Miyamoto Musashi skills are: ", 70 + (i+1)*15, ctx, this._fadeTxtEnemy);
        var j = 2;
        var skillMiyamoto = this._scene.getMiyamoto().getSkill();
        for (var skill in skillMiyamoto) {
            this._drawText(skill + ": " + skillMiyamoto[skill], 70 + (i+j)*15, ctx, this._fadeTxtEnemy);
            j++;
        }
        
        if (this._fadeTxtEnemy >= 1) {
            this._fadeTxtEnemy = 1;
        }
        if (this._count >= READING_TIME) {
            this._showResult = true;
        }
    }
    
    if (this._showResult) {
        this._fadeTxtResult = (this._count - READING_TIME) / BATTLEWINDOW_FADEIN_TIME;
        this._drawText("Miyamoto Musashi has defeated his enemy", ctx.canvas.height * 0.9, ctx, this._fadeTxtResult);
        
        if (this._fadeTxtResult >= 1) {
            this._fadeTxtResult = 1;
        }
        if (this._count >= 2*READING_TIME) {
            this._fadeOut = true;
        }
    }
};

BattleWindow.prototype.draw = function(ctx) {
    if (!this._visible) {
        return;
    }
    
    this._drawWindowBackground(ctx);
    this._drawMessages(ctx);
};

BattleWindow.prototype.tick = function() {
    if (this._visible) {
        this._count ++;
    }        
};