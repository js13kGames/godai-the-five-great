var REST_RECOVER_PER_Q  = 0.02;
var HUNGER_PER_Q = 0.025;
var WALK_DISTANCE_PER_Q = 0.02;
var WALK_COST_PER_Q     = 0.2;

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

var RESTING     = 0;
var WALKING     = 1;
var HUNTING     = 2;
var FEEDING     = 3;
var MEDITATE    = 4;

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
    }
];

function Miyamoto(scene) {
    this._scene = scene;
    
    this._states = states;
    this._stateIndexes = {};
    this._currentState = RESTING;
    for (var i=0, l=states.length; i<l; i++) {
        this._stateIndexes[this._states[i].name] = i;
        if (this._states[i].initial) {
            this._currentState = this._states[i];
        }
    }
    
    this._life = 99;
    this._spirit = 0;
    this._hunger = 0;
    this._fatigue = 0;
    this._supplies = 4;
}

Miyamoto.prototype.getState = function() {
    return this._currentState.name;
};

Miyamoto.prototype.changeStateTo = function(state) {
    for (var i=0, l=states.length; i<l; i++) {
        if (this._states[i].name == state) {
            this._currentState = this._states[i];
            return true;
        }
    }
    return false;
};

Miyamoto.prototype._rest = function() {
    this._fatigue -= REST_RECOVER_PER_Q;
};

Miyamoto.prototype._walk = function() {
    this._scene.getDistance().coverDistance(WALK_DISTANCE_PER_Q);
    this._fatigue += WALK_COST_PER_Q;
};

Miyamoto.prototype._increaseHunger = function() {
    this._hunger += HUNGER_PER_Q;
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

Miyamoto.prototype.tick = function() {
    switch (this._currentState.name) {
        case RESTING:
            this._rest();
            break;
            
        case WALKING:
            this._walk();
            break;
            
        default:
            console.log("Miyamoto default state", this._currentState);
            break;
    }
    
    if (this._currentState != FEEDING) {
        this._increaseHunger();
    }
};

Miyamoto.prototype.draw = function(ctx) {
    this._drawStatus(ctx);
};


Miyamoto.prototype._drawStatus = function(ctx) {
    ctx.fillStyle = "rgb(26, 26, 26)";
    ctx.font = "bold 14px 'Lucida Console', Monaco, monospace";
    
    var text = "life: " + this._life;
    var x = 20;
    var y = ctx.canvas.height - 40;
    ctx.fillText(text, x, y);
    
    text = "spirit: " + this._spirit;
    x = 20;
    y = ctx.canvas.height - 20;
    ctx.fillText(text, x, y);
    
    text = "fatigue: " + this._getPrettyFatigue() + " (" + this._fatigue.toFixed(1) + ")";
    var textWidth = ctx.measureText(text).width;
    x = ctx.canvas.width - 20 - textWidth;
    y = ctx.canvas.height - 40;
    ctx.fillText(text, x, y);
    
    text = "hunger: " + this._getPrettyHunger() + " (" + this._hunger.toFixed(2) + ")";
    var textWidth = ctx.measureText(text).width;
    x = ctx.canvas.width - 20 - textWidth;
    y = ctx.canvas.height - 20;
    ctx.fillText(text, x, y);
};