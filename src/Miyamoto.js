var REST_RECOVER_PER_Q      = 0.02;
var HUNGER_PER_Q            = 0.025;
var HUNGER_PAIN_TOLERANCE   = 250;
var HUNGER_PAIN_DAMAGE      = 1;
var WALK_DISTANCE_PER_Q     = 0.005;
var WALK_COST_PER_Q         = 0.075;
var HUNT_CHANCE_INC_PER_Q   = 0.33;
var HUNT_COST_PER_Q         = 0.05;
var FEED_RATION_COST_PER_Q  = 0.025;
var FEED_RECOVER_PER_Q      = 0.5;
var MEDITATE_COST_PER_Q     = 0.005;
var SPIRIT_INCREASE_PER_Q   = 0.075;

var RUN_DISTANCE_PER_Q      = 0.01;
var RUN_COST_PER_Q          = 0.225;
var MARATHON_DISTANCE_PER_Q = 0.0075;
var MARATHON_COST_PER_Q     = 0.1;

var HEAL_COST_PER_Q         = 0.025;
var HEAL_RECOVER_PER_Q      = 0.05;

var DEEP_REST_FACTOR        = 1.5;
var HEALTH_DIET_FACTOR      = 1.25;
var STEALTH_HUNTING_FACTOR  = 1.25;

var TRAINING_COST_PER_Q     = 0.05;
var PRACTISING_COST_PER_Q   = 0.075;
var STUDING_COST_PER_Q      = 0.01;
var IMPROVING_COST_PER_Q    = 0.0125;
var FOCUSING_COST_PER_Q     = 0.02;
var GODAI_INCREASE_PER_Q    = 0.075;

var MSG_HUNGER_DAMAGE       = "Ouch! Damage from hunger suffered.";

var fatigueStates = [
    "restful",
    "in good shape",
    "tired",
    "shattered",
    "exhausted"
];

var hungerStates = [
    "satiated",
    "light appetite",
    "appetite",
    "hunger",
    "pain"
];

// STANDARD
var RESTING     = "RESTING";
var WALKING     = "WALKING";
var HUNTING     = "HUNTING";
var FEEDING     = "FEEDING";
var MEDITATE    = "MEDITATING";

// EXTRA POWERS
var DEEP_RESTING    = "DEEP RESTING";
var TRAIN           = "TRAINING";
var HEALTH_DIET     = "ON HEALTH DIET";
var PRACTISE        = "PRACTISING";
var RUN             = "RUNNING";
var STEALTH_HUNT    = "STEALTH HUNTING";
var MARATHON        = "RUNNING MARATHON";
var STUDY           = "STUDING"
var REST_AND_MUSE   = "RESTING AND MUSING";
var IMPROVE         = "SEARCHING FOR PERFECTION";
var HEAL            = "HEALING";
var FOCUS           = "FOCUSING MIND";

var states = [
    {
        "name": RESTING,
        "events": {}
    },
    {
        "name": WALKING,
        initial: true,
        "events": {}
    },
    {
        "name": HUNTING,
        "events": {}
    },
    {
        "name": FEEDING,
        "events": {}
    },
    {
        "name": MEDITATE,
        "events": {}
    },
    {
        "name": DEEP_RESTING,
        "events": {}
    },
    {
        "name": TRAIN,
        "events": {}
    },
    {
        "name": HEALTH_DIET,
        "events": {}
    },
    {
        "name": PRACTISE,
        "events": {}
    },
    {
        "name": RUN,
        "events": {}
    },
    {
        "name": STEALTH_HUNT,
        "events": {}
    },
    {
        "name": MARATHON,
        "events": {}
    },
    {
        "name": STUDY,
        "events": {}
    },
    {
        "name": REST_AND_MUSE,
        "events": {}
    },
    {
        "name": IMPROVE,
        "events": {}
    },
    {
        "name": HEAL,
        "events": {}
    },
    {
        "name": FOCUS,
        "events": {}
    }
];

function Miyamoto(scene) {
    this._scene = scene;
    
    this._states = states;
    this._stateIndexes = {};
    this._currentState = RESTING;
    this._lastState = RESTING;
    for (var i=0, l=states.length; i<l; i++) {
        this._stateIndexes[this._states[i].name] = i;
        if (this._states[i].initial) {
            this.changeStateTo(this._states[i].name);
        }
    }
    
    this._chanceToHuntSomething = 0;
    this._training      = 0;
    this._practising    = 0;
    this._studing       = 0;
    this._improving     = 0;
    this._focusing      = 0;
    
    this._hungerPain = 0;
    
    this._life = 99;
    this._spirit = 25;
    this._hunger = 0;
    this._fatigue = 0;
    this._supplies = 4;
    
    this._skill = {
        "strength": 3,
        "technique": 1,
        "strategy": 0,
        "perfection": 0,
        "focus": 0
    };
}

Miyamoto.prototype.getState = function() {
    return this._currentState.name;
};

Miyamoto.prototype.getLife = function() {
    return this._life;
};

Miyamoto.prototype.getSkill = function() {
    return this._skill;
};

Miyamoto.prototype.changeStateTo = function(state) {
    for (var i=0, l=states.length; i<l; i++) {
        if (this._states[i].name == state) {
            this._lastState = this._currentState;
            if (this._lastState.name == HUNTING) {
                this._currentState = this._states[this._stateIndexes[RESTING]];
                this._resolveHunting();
            } else if (this._lastState.name == STEALTH_HUNT) {
                this._currentState = this._states[this._stateIndexes[RESTING]];
                this._resolveHunting();
            } else {
                this._currentState = this._states[i];
            }
            this._scene.getMessageWindow().add("Miyamoto is " + this._currentState.name);
            return true;
        }
    }
    console.log("Miyamoto state not changed!");
    return false;
};

Miyamoto.prototype._rest = function(isDeep) {
    if (isDeep) {
        this._fatigue -= REST_RECOVER_PER_Q * DEEP_REST_FACTOR;
    } else {
        this._fatigue -= REST_RECOVER_PER_Q;
    }
    if (this._fatigue <= 0) {
        this._fatigue = 0;
        this.changeStateTo(WALKING);
    }
};

Miyamoto.prototype._move = function(method) {
    switch (method) {
        case "walk":
            this._scene.getDistance().coverDistance(WALK_DISTANCE_PER_Q);
            this._fatigue += WALK_COST_PER_Q;
            break;
            
        case "run":
            this._scene.getDistance().coverDistance(RUN_DISTANCE_PER_Q);
            this._fatigue += RUN_COST_PER_Q;
            break;
            
        case "marathon":
            this._scene.getDistance().coverDistance(MARATHON_DISTANCE_PER_Q);
            this._fatigue += MARATHON_COST_PER_Q;
            break;
            
        default:
            console.log("Miyamoto doesn't know how to move!");
            break;
    }
};

Miyamoto.prototype._resolveHunting = function() {
    if (this._currentState != HUNTING) {
        var ch = this._chanceToHuntSomething;
        var huntResult = Math.random() * 100;
        switch (true) {
            case huntResult < (ch/4):
                this._supplies += 1;
                this._scene.getMessageWindow().add("1 ration hunt!");
                break;
                
            case huntResult >= (ch/4) && huntResult < (ch/2):
                this._supplies += 2;
                this._scene.getMessageWindow().add("2 rations hunt!");
                break;
                
            case huntResult >= (ch/2) && huntResult < (3*ch/4):
                this._supplies += 3;
                this._scene.getMessageWindow().add("3 rations hunt!");
                break;
                
            case huntResult >= (3*ch/4) && huntResult < ch:
                this._supplies += 4;
                this._scene.getMessageWindow().add("4 rations hunt!");
                break;
                
            default:
                this._scene.getMessageWindow().add("No rations hunt!");
                break;
        }
        
        this._chanceToHuntSomething = 0;
    }
};

Miyamoto.prototype._hunt = function(isStealth) {
    var factor = (isStealth) ? STEALTH_HUNTING_FACTOR : 1;
    if (this._lastState.name != HUNTING && this._lastState.name != STEALTH_HUNT ) {
        this._chanceToHuntSomething += HUNT_CHANCE_INC_PER_Q * factor;
        this._fatigue += HUNT_COST_PER_Q / factor;
        if (this._chanceToHuntSomething >= 80) {
            this.changeStateTo(RESTING);
        }
    } else {
        this.changeStateTo(RESTING);
    }
};

Miyamoto.prototype.battleDecreasesLife = function(dmg) {
    this._life -= dmg;
    
    if (this._life <= 0) {
        this._life = 0;
    }
};

Miyamoto.prototype._hungerPainDecreasesLife = function() {
    this._hungerPain += this._hunger - 80;
    if (this._hungerPain >= HUNGER_PAIN_TOLERANCE) {
        this._hungerPain = 0;
        this._life -= HUNGER_PAIN_DAMAGE * Math.random();
        var msgNumber = this._scene.getMessageWindow().getMessagesNumber();
        if (msgNumber < 6 || this._scene.getMessageWindow().getMessage(msgNumber - 1) != MSG_HUNGER_DAMAGE) {
            this._scene.getMessageWindow().add(MSG_HUNGER_DAMAGE);
        }
    }
};

Miyamoto.prototype._checkHungerLimits = function() {
    if (this._hunger <= 0) {
        this._hunger = 0;
        this.changeStateTo(RESTING);
    }
    if (this._supplies <= 0) {
        this._supplies = 0;
        this.changeStateTo(MEDITATE);
    }
};

Miyamoto.prototype._checkHungerPainLimit = function() {    
    if (this._hunger >= 80) {
        this._hungerPainDecreasesLife();
    }
};

Miyamoto.prototype._feed = function(isHealthDiet) {
    if (isHealthDiet) {
        this._hunger -= FEED_RECOVER_PER_Q * HEALTH_DIET_FACTOR;
        this._supplies -= FEED_RATION_COST_PER_Q / HEALTH_DIET_FACTOR;
    } else {
        this._hunger -= FEED_RECOVER_PER_Q;
        this._supplies -= FEED_RATION_COST_PER_Q;
    }
    
    this._checkHungerLimits();
};

Miyamoto.prototype._checkSpiritLimits = function() {
    if (this._spirit >= 99) {
        this._scene.getMessageWindow().add("Spiritual level gained!");
        this._spirit = 0;
        this._scene.pause();
        this._scene.hideUI();
        this._scene.showSpiritualImprovementSelection();
    };
};

Miyamoto.prototype._meditate = function() {
    this._spirit += SPIRIT_INCREASE_PER_Q;
    this._fatigue += MEDITATE_COST_PER_Q;
    
    this._checkSpiritLimits();
};

Miyamoto.prototype._increaseHunger = function() {
    this._hunger += HUNGER_PER_Q;
};

Miyamoto.prototype._checkFatigueLimit = function() {
    if (this._fatigue >= 99) {
        this.changeStateTo(RESTING);
    }
};

Miyamoto.prototype._getPrettyFatigue = function() {
    var f = this._fatigue;
    var result = 0;
    switch (true) {
        case f < 0:
            this._fatigue = 0;
            result = 0;
            break;
        case f>= 0 && f < 20:
            result = 0;
            break;
        case f>=20 && f < 40:
            result = 1;
            break;
        case f>=40 && f < 60:
            result = 2;
            break;
        case f>=60 && f < 80:
            result = 3;
            break;
        case f>=80 && f < 99:
            result = 4;
            break;
        case f>=99:
            this._fatigue = 99;
            result = 4;
            break;
        default:
            console.log("Miyamoto default fatigue", this._fatigue);
            break;
    }
    return fatigueStates[result];
};

Miyamoto.prototype._getPrettyHunger = function() {
    var h = this._hunger;
    var result = 0;
    switch (true) {
        case h < 0:
            this._hunger = 0;
            result = 0;
            break;
        case h>= 0 && h < 20:
            result = 0;
            break;
        case h>=20 && h < 40:
            result = 1;
            break;
        case h>=40 && h < 60:
            result = 2;
            break;
        case h>=60 && h < 80:
            result = 3;
            break;
        case h>=80 && h < 99:
            result = 4;
            break;
        case h>=99:
            this._hunger = 99;
            result = 4;
            break;
        default:
            console.log("Miyamoto default hunger", this._hunger);
            break;
    }
    return hungerStates[result];
};

Miyamoto.prototype._train = function() {
    this._training += GODAI_INCREASE_PER_Q;
    this._fatigue += TRAINING_COST_PER_Q;
    
    if (this._training >= 99) {
        this._training = 0;
        this._skill["strength"] += 1;
        this._scene.getMessageWindow().add("Miyamoto has now " + this._skill["strength"] + " point(s) of strength");
        this._scene.getUI().checkIfTrainButtonsShouldBeEnabled(this._skill);
        this.changeStateTo(RESTING);
    }
};

Miyamoto.prototype._practise = function() {
    this._practising += GODAI_INCREASE_PER_Q;
    this._fatigue += PRACTISING_COST_PER_Q;
    
    if (this._practising >= 99) {
        this._practising = 0;
        this._skill["technique"] += 1;
        this._scene.getMessageWindow().add("Miyamoto has now " + this._skill["technique"] + " point(s) of technique");
        this._scene.getUI().checkIfTrainButtonsShouldBeEnabled(this._skill);
        this.changeStateTo(MEDITATE);
    }
};

Miyamoto.prototype._study = function() {
    this._studing += GODAI_INCREASE_PER_Q;
    this._fatigue += STUDING_COST_PER_Q;
    
    if (this._studing >= 99) {
        this._studing = 0;
        this._skill["strategy"] += 1;
        this._scene.getMessageWindow().add("Miyamoto has now " + this._skill["strategy"] + " point(s) of strategy");
        this._scene.getUI().checkIfTrainButtonsShouldBeEnabled(this._skill);
        this.changeStateTo(RESTING);
    }
};

Miyamoto.prototype._improve = function() {
    this._improving += GODAI_INCREASE_PER_Q;
    this._fatigue += IMPROVING_COST_PER_Q;
    
    if (this._improving >= 99) {
        this._improving = 0;
        this._skill["perfection"] += 1;
        this._scene.getMessageWindow().add("Miyamoto has now " + this._skill["perfection"] + " point(s) of perfection");
        this._scene.getUI().checkIfTrainButtonsShouldBeEnabled(this._skill);
        this.changeStateTo(MEDITATE);
    }
};

Miyamoto.prototype._focus = function() {
    this._focusing += GODAI_INCREASE_PER_Q;
    this._fatigue += FOCUSING_COST_PER_Q;
    
    if (this._focusing >= 99) {
        this._focusing = 0;
        this._skill["focus"] += 1;
        this._scene.getMessageWindow().add("Miyamoto has now " + this._skill["focus"] + " point of correct mindset");
        this._scene.getUI().checkIfTrainButtonsShouldBeEnabled(this._skill);
        this.changeStateTo(WALKING);
    }
};

Miyamoto.prototype._heal = function() {
    this._life += HEAL_RECOVER_PER_Q;
    this._fatigue += HEAL_COST_PER_Q;
    
    if (this._life >= 99) {
        this._life = 99;
        this.changeStateTo(RESTING);
    }
};

Miyamoto.prototype.tick = function() {
    switch (this._currentState.name) {
        case RESTING:
            this._rest(false);
            break;
            
        case WALKING:
            this._move("walk");
            break;
            
        case HUNTING:
            this._hunt(false);
            break;
            
        case FEEDING:
            this._feed(false);
            break;
            
        case MEDITATE:
            this._meditate();
            break;
            
        case DEEP_RESTING:
            this._rest(true);
            break;
            
        case TRAIN:
            this._train();
            break;
            
        case HEALTH_DIET:
            this._feed(true);
            break;
            
        case PRACTISE:
            this._practise();
            break;
            
        case RUN:
            this._move("run");
            break;
            
        case STEALTH_HUNT:
            this._hunt(true);
            break;
            
        case MARATHON:
            this._move("marathon");
            break;
            
        case STUDY:
            this._study();
            break;
            
        case REST_AND_MUSE:
            this._meditate();
            this._rest(false);
            break;
            
        case IMPROVE:
            this._improve();
            break;
            
        case HEAL:
            this._heal();
            break;
            
        case FOCUS:
            this._focus();
            break;
            
        default:
            console.log("Miyamoto default state", this._currentState);
            break;
    }
    
    if (this._currentState.name != FEEDING) {
        this._increaseHunger();
    }
    this._checkHungerPainLimit();
    this._checkFatigueLimit();
};

Miyamoto.prototype.draw = function(ctx) {
    this._drawStatus(ctx);
};


Miyamoto.prototype._drawStatus = function(ctx) {
    ctx.fillStyle = "rgb(26, 26, 26)";
    ctx.font = "bold 14px 'Lucida Console', Monaco, monospace";
    
    var text = "life: " + this._life.toFixed(2);
    var x = 20;
    var y = ctx.canvas.height - 45;
    ctx.fillText(text, x, y);
    
    text = "spirit: " + this._spirit.toFixed(1);
    x = 20;
    y = ctx.canvas.height - 25;
    ctx.fillText(text, x, y);
    
    text = "fatigue: " + this._getPrettyFatigue() + " (" + this._fatigue.toFixed(1) + ")";
    var textWidth = ctx.measureText(text).width;
    x = ctx.canvas.width - 20 - textWidth;
    y = ctx.canvas.height - 45;
    ctx.fillText(text, x, y);
    
    text = "hunger: " + this._getPrettyHunger() + " (" + this._hunger.toFixed(2) + ")";
    var textWidth = ctx.measureText(text).width;
    x = ctx.canvas.width - 20 - textWidth;
    y = ctx.canvas.height - 25;
    ctx.fillText(text, x, y);
    
    text = "supplies: " + this._supplies.toFixed(2) + " rations";
    var textWidth = ctx.measureText(text).width;
    x = ctx.canvas.width / 2 - textWidth / 2;
    y = ctx.canvas.height - 5;
    ctx.fillText(text, x, y);
    
    text = "cth: " + this._chanceToHuntSomething.toFixed(2);
    var textWidth = ctx.measureText(text).width;
    x = ctx.canvas.width - 50 - textWidth / 2;
    y = ctx.canvas.height - 5;
    ctx.fillText(text, x, y);
};