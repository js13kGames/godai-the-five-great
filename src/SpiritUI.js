var SPIRITUPGRADES = {
    "earth": [ 
        "Deep rest",
        "Train"
    ],
    "water": [
        "Health diet",
        "Practise"
    ],
    "fire": [
        "Run",
        "Stealth hunt",
        "Marathon",
        "Study"
    ],
    "air": [
        "Rest and muse",
        "Improve"
    ],
    "void": [
        "Heal",
        "Focus"
    ]
};

var spiritUpgrades = {
    "earth": [ 
        "Deep rest",
        "Train"
    ],
    "water": [
        "Health diet",
        "Practise"
    ],
    "fire": [
        "Run",
        "Stealth hunt",
        "Marathon",
        "Study"
    ],
    "air": [
        "Rest and muse",
        "Improve"
    ],
    "void": [
        "Heal",
        "Focus"
    ]
};

function SpiritUI(scene) {
    this._scene = scene;
    
    this._spiritUpgrades = spiritUpgrades;
    
    this._createSpiritUI();    
    this._initializeSpiritUI();
}

SpiritUI.prototype._createSpiritUI = function() {
    var divSpiritUI = document.getElementById("divSpirit");
    divSpiritUI.style.display = "none";
};

SpiritUI.prototype._hideOptionsAndRelaunchGame = function(scope) {
    scope.hide();
    scope._scene.showUI();
    scope._scene.play();
}

SpiritUI.prototype._initializeSpiritUI = function() {
    var that = this;
    
    this._earthButton = document.getElementById("earthUP");
    this._waterButton = document.getElementById("waterUP");
    this._fireButton = document.getElementById("fireUP");
    this._airButton = document.getElementById("airUP");
    this._voidButton= document.getElementById("voidUP");
    
    this._earthButton.onclick = function(e) {
        that._hideOptionsAndRelaunchGame(that);
        that._getSpiritUpgrade("earth");
    };
    this._waterButton.onclick = function(e) {
        that._hideOptionsAndRelaunchGame(that);
        that._getSpiritUpgrade("water");
    };
    this._fireButton.onclick = function(e) {
        that._hideOptionsAndRelaunchGame(that);
        that._getSpiritUpgrade("fire");
    };
    
    this._airButton.onclick = function(e) {
        that._hideOptionsAndRelaunchGame(that);
        that._getSpiritUpgrade("air");
    };
    
    this._voidButton.onclick = function(e) {
        that._hideOptionsAndRelaunchGame(that);
        that._getSpiritUpgrade("void");
    };
    
    this._checkAvailableUpgrades();
};

SpiritUI.prototype._getSpiritUpgrade = function(element) {
    var ulUI = document.getElementById(element);
    var power = this._spiritUpgrades[element][0];
    this._spiritUpgrades[element].splice(0, 1);
    
    if (power == SPIRITUPGRADES["fire"][1]) {
        // ----------  "Stealth hunt" special case ---------
        var huntBtn = document.getElementById("hunt");
        huntBtn.setAttribute("id", power);
        huntBtn.innerHTML = power;
        
        this._scene.getUI().upgradeHuntingOption();
    } else {        
        var li = document.createElement("li");
        var newBtn = document.createElement("button");
        newBtn.setAttribute("type", "button");
        newBtn.setAttribute("id", power);
        newBtn.innerHTML = power;
        li.appendChild(newBtn);
        ulUI.appendChild(li);
        
        this._scene.getUI().addNewOption(power);
    }
    
    this._scene.getMessageWindow().add("Learned '" + power + "' power from " + element);
};
    
SpiritUI.prototype._checkAvailableUpgrades = function() {
    var countUpgrades = 0;
    for (var element in this._spiritUpgrades) {
        if (!this._spiritUpgrades[element].length) {
            var btn = this["_" + element + "Button"];
            if (btn.parentNode.parentNode) {
                btn.parentNode.parentNode.removeChild(btn.parentNode);
            }
        } else {
            countUpgrades++;
        }
    };
    if (countUpgrades == 0)  {
        if (!document.getElementById("improvementLimit")) {
            var that = this;
            var ul = document.getElementById("improvement");
            var li = document.createElement("li");
            var btn = document.createElement("button");
            btn.setAttribute("id", "improvementLimit");
            btn.innerHTML = "The Sky is the limit";
            btn.onclick = function(e) {
                e.preventDefault();
                that._hideOptionsAndRelaunchGame(that);
            }
            li.appendChild(btn);
            ul.appendChild(li);
        }                
    }
};

SpiritUI.prototype.show = function() {
    var divUI = document.getElementById("divSpirit");
    divUI.style.display = "block";
    
    this._checkAvailableUpgrades();
};

SpiritUI.prototype.hide = function() {
    var divUI = document.getElementById("divSpirit");
    divUI.style.display = "none";
};

SpiritUI.prototype.tick = function() {
    
};