var BATTLEWINDOW_FADEIN_TIME    = 1.5 * FPS;
var BATTLEWINDOW_FADEOUT_TIME   = 1.5 * FPS;

var ENEMY_LIFE_FACTOR = 5;

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
    this._skillMiyamoto = this._scene.getMiyamoto().getSkill();    
    this._encounterResult = this._calculateEncounterResult();
    
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
        for (var skill in this._skillMiyamoto) {
            this._drawText(skill + ": " + this._skillMiyamoto[skill], 70 + (i+j)*15, ctx, this._fadeTxtEnemy);
            j++;
        }
        
        if (this._fadeTxtEnemy >= 1) {
            this._fadeTxtEnemy = 1;
        }
        if (this._count >= READING_TIME) {
            this._showResult = true;
        }
    } //show Enemy
    
    if (this._showResult) {
        this._fadeTxtResult = (this._count - READING_TIME) / BATTLEWINDOW_FADEIN_TIME;
        this._drawText(this._encounterResult.text, ctx.canvas.height * 0.9, ctx, this._fadeTxtResult);
        if (this._encounterResult.text2) {
            this._drawText(this._encounterResult.text2, ctx.canvas.height * 0.9 + 15, ctx, this._fadeTxtResult);
        }
        
        if (this._fadeTxtResult >= 1) {
            this._fadeTxtResult = 1;
        }
        if (this._count >= 2*READING_TIME) {
            this._fadeOut = true;
        }
    } //show result
};

BattleWindow.prototype._calculateSwordsmanPower = function(skill) {
    var totalPower = 0;
    for (var sk in skill) {
        switch (sk) {
            case "strength":
                totalPower += skill[sk] * 1;
                break;
                
             case "technique":
                totalPower += skill[sk] * 1.25;
                break;
                
             case "strategy":
                totalPower += skill[sk] * 1.5;
                break;
                
             case "perfection":
                totalPower += skill[sk] * 1.75;
                break;
                
             case "focus":
                totalPower += skill[sk] * 3;
                break;
                
            default:
                console.log("Can't calculate Swordsman power correctly!");
                break;
        }
    }
    return totalPower;
};

BattleWindow.prototype._calculateEncounterResult = function() {
    var result = {};
    var enemyPower = this._calculateSwordsmanPower(this._encounter.skill);
    var enemyLife = this._encounter.skill["strength"] * ENEMY_LIFE_FACTOR;
    var miyaPower = this._calculateSwordsmanPower(this._skillMiyamoto);
    var miyaLife = this._scene.getMiyamoto().getLife();
    
    var movements = 0;
    var damageSuffered = 0;
    while (enemyLife > 0 && miyaLife > 0) {
        var enemyAttack = Math.random() * enemyPower;
        var miyaAttack = Math.random() * miyaPower;
        
        if (miyaAttack >= enemyAttack) {
            enemyLife -= (miyaAttack - enemyAttack);
        } else {
            miyaLife -= (enemyAttack - miyaAttack);
            damageSuffered += (enemyAttack - miyaAttack);
        }
        
        movements ++;
    }
    
    if (enemyLife <= 0) {
        result.text = "Miyamoto defeated " + this._encounter.name + " in " + movements + " movements";
        if (damageSuffered > 0) {
            result.text2 = "but suffered " + damageSuffered.toFixed(0) + " damage point(s)";
        }
    } else {
        result.text = this._encounter.name + " has defeated Miyamoto Musashi";
    }
    
    return result;
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