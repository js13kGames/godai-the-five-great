function UI(scene) {
    this._scene = scene;
    
    this._createUI();    
    this._initializeUI();
}

UI.prototype._createUI = function() {
    var divUI = document.getElementById("divUI");
    divUI.style.display = "block";
};

UI.prototype._initializeUI = function() {
    var that = this;
    
    this._restButton = document.getElementById("rest");
    this._walkButton = document.getElementById("walk");
    this._huntingButton = document.getElementById("hunt");
    this._feedButton = document.getElementById("feed");
    this._meditateButton= document.getElementById("meditate");
    
    this._restButton.onclick = function(e) {
        that._scene.getMiyamoto().changeStateTo(RESTING);
    };
    this._walkButton.onclick = function(e) {
        that._scene.getMiyamoto().changeStateTo(WALKING);
    };
    this._huntingButton.onclick = function(e) {
        that._scene.getMiyamoto().changeStateTo(HUNTING);  
    };
    this._huntingButton.value = "Hunt";
    
    this._feedButton.onclick = function(e) {
        that._scene.getMiyamoto().changeStateTo(FEEDING);  
    };
    
    this._meditateButton.onclick = function(e) {
        that._scene.getMiyamoto().changeStateTo(MEDITATE);
    };
};

UI.prototype._checkHuntingState = function() {
    if (this._scene.getMiyamoto().getState() != HUNTING && this._scene.getMiyamoto().getState() != STEALTH_HUNT) {
        this._huntingButton.innerHTML = this._huntingButton.value;
    } else {
        this._huntingButton.innerHTML = "Stop hunting";
    }
};

UI.prototype.checkIfTrainButtonsShouldBeEnabled = function(skill) {
    if (this._trainButton)      this._trainButton.removeAttribute("disabled");
    if (this._practiseButton)   this._practiseButton.removeAttribute("disabled");
    if (this._studyButton)      this._studyButton.removeAttribute("disabled");
    if (this._improveButton)    this._improveButton.removeAttribute("disabled");
    if (this._focusButton)      this._focusButton.removeAttribute("disabled");
    
    if (skill["strength"] >= 5) {
        this._trainButton.setAttribute("disabled", true);
    }
    if (skill["technique"] >= skill["strength"] - 1) {
        this._practiseButton.setAttribute("disabled", true);
    }
    if (skill["strategy"] >= skill["technique"] - 1) {
        this._studyButton.setAttribute("disabled", true);
    }
    if (skill["perfection"] >= skill["strategy"] - 1) {
        this._improveButton.setAttribute("disabled", true);
    }
    if (skill["focus"] >= skill["perfection"] - 1) {
        this._focusButton.setAttribute("disabled", true);
    }
};

UI.prototype.addNewOption = function(power) {
    var that = this;
    switch (power) {
        case SPIRITUPGRADES["earth"][0]: //"Deep rest":
            this._deepRestButton = document.getElementById(power);
            this._deepRestButton.onclick = function(e) {
                that._scene.getMiyamoto().changeStateTo(DEEP_RESTING);
            };
            break;
            
        case SPIRITUPGRADES["earth"][1]: //"Train":
            this._trainButton = document.getElementById(power);
            this._trainButton.onclick = function(e) {
                that._scene.getMiyamoto().changeStateTo(TRAIN);
            };
            break;
            
        case SPIRITUPGRADES["water"][0]: //"Health diet":
            this._healthDietButton = document.getElementById(power);
            this._healthDietButton.onclick = function(e) {
                that._scene.getMiyamoto().changeStateTo(HEALTH_DIET);
            };
            break;
            
        case SPIRITUPGRADES["water"][1]: //"Practise":
            this._practiseButton = document.getElementById(power);
            this._practiseButton.onclick = function(e) {
                that._scene.getMiyamoto().changeStateTo(PRACTISE);
            };
            break;
            
        case SPIRITUPGRADES["fire"][0]: //"Run":
            this._runButton = document.getElementById(power);
            this._runButton.onclick = function(e) {
                that._scene.getMiyamoto().changeStateTo(RUN);
            };
            break;
            
            //"Stealth hunt" is an special option
            
        case SPIRITUPGRADES["fire"][2]: //"Marathon":
            this._marathonButton = document.getElementById(power);
            this._marathonButton.onclick = function(e) {
                that._scene.getMiyamoto().changeStateTo(MARATHON);
            };
            break;
            
        case SPIRITUPGRADES["fire"][3]: //"Study":
            this._studyButton = document.getElementById(power);
            this._studyButton.onclick = function(e) {
                that._scene.getMiyamoto().changeStateTo(STUDY);
            };
            break;
            
        case SPIRITUPGRADES["air"][0]: //"Rest and muse":
            this._restAndMuseButton = document.getElementById(power);
            this._restAndMuseButton.onclick = function(e) {
                that._scene.getMiyamoto().changeStateTo(REST_AND_MUSE);
            };
            break;
            
        case SPIRITUPGRADES["air"][1]: //"Improve":
            this._improveButton = document.getElementById(power);
            this._improveButton.onclick = function(e) {
                that._scene.getMiyamoto().changeStateTo(IMPROVE);
            };
            break;
            
        case SPIRITUPGRADES["void"][0]: //"Heal":
            this._healButton = document.getElementById(power);
            this._healButton.onclick = function(e) {
                that._scene.getMiyamoto().changeStateTo(HEAL);
            };
            break;
            
        case SPIRITUPGRADES["void"][1]: //"Focus":
            this._focusButton = document.getElementById(power);
            this._focusButton.onclick = function(e) {
                that._scene.getMiyamoto().changeStateTo(FOCUS);
            };
            break;
            
        default:
            
            break;
    }
};

UI.prototype.upgradeHuntingOption = function() {
    var that = this;
    this._huntingButton = document.getElementById(SPIRITUPGRADES["fire"][1]); //"Stealth hunt"
    this._huntingButton.innerHTML = SPIRITUPGRADES["fire"][1];
    this._huntingButton.value = SPIRITUPGRADES["fire"][1];
    this._huntingButton.onclick = function(e) {
        that._scene.getMiyamoto().changeStateTo(STEALTH_HUNT);
    };
};

UI.prototype.show = function() {
    var divUI = document.getElementById("divUI");
    divUI.style.display = "block";
};

UI.prototype.hide = function() {
    var divUI = document.getElementById("divUI");
    divUI.style.display = "none";
};

UI.prototype.tick = function() {
    this._checkHuntingState();
};