var SWORDSMAN_KNOWLEDGE = [
    {
        "earth": 2,
        "water": 1
    },
    {
        "earth": 3,
        "water": 1
    },
    {
        "earth": 3,
        "water": 2
    },
    {
        "earth": 3,
        "water": 2,
        "fire": 1
    },
    {
        "earth": 4,
        "water": 2,
        "fire": 1
    },
    {
        "earth": 4,
        "water": 3,
        "fire": 1
    },
    {
        "earth": 4,
        "water": 3,
        "fire": 2
    },
    {
        "earth": 4,
        "water": 3,
        "fire": 2,
        "wind": 1
    },
    {
        "earth": 5,
        "water": 3,
        "fire": 2,
        "wind": 1
    },
    {
        "earth": 5,
        "water": 4,
        "fire": 2,
        "wind": 1
    },
    {
        "earth": 5,
        "water": 4,
        "fire": 3,
        "wind": 1
    },
    {
        "earth": 5,
        "water": 4,
        "fire": 3,
        "wind": 2
    },
    {
        "earth": 5,
        "water": 4,
        "fire": 3,
        "wind": 2,
        "void": 1
    }
];

function EncounterList(scene) {
    this._scene = scene;
    this._encounters = [];    
    
    this._createEncounterList();
}

EncounterList.prototype._createEncounterList = function() {
    var SWORDSMAN_NAMES = [
        "Hikita Bungoro",
        "Kamiizumi Nobutsuna",
        "Sasaki Kojiro",
        "Tadashima Akiyama",
        "Tsukahara Bokuden",
        "Tsutsumi Hozan",
        "Yagyu Munenori",
        "Negishi Shingoro",
        "Nakayama Hakudo",
        "Chiba Shusaku Narimasa",
        "Shinto Munen",
        "Maniwa Nen"
    ];
    
    var distanceLeft = DISTANCE_LEFT;
    
    for (var i=0; i<12; i++) {
        var selectName = Math.floor(Math.random() * SWORDSMAN_NAMES.length);
        
        var distanceEncounter = distanceLeft / (12 - i);
        distanceEncounter = Math.random() * distanceEncounter;
        distanceLeft -= distanceEncounter;
        
        var swordsman = {
            "name": SWORDSMAN_NAMES[selectName],
            "skill": SWORDSMAN_KNOWLEDGE[i],
            "ri": DISTANCE_LEFT - distanceEncounter
        };
        SWORDSMAN_NAMES.splice(selectName, 1);
        this._encounters.push(swordsman);
    }
    var lastSwordsman = {
        "name": "Miyake Gunbei",
        "skill": SWORDSMAN_KNOWLEDGE[12],
        "ri": 0
    };
    this._encounters.push(lastSwordsman);
};

EncounterList.prototype.getEncounters = function() {
    return this._encounters;
}

EncounterList.prototype.checkEncounters = function() {
    if (this._encounters[0]) {
        var distanceLeft = this._scene.getDistance().getDistanceLeft();
        if (this._encounters[0].ri >= distanceLeft) {
            var swordman = this._encounters.splice(0, 1)[0];
            this._scene.launchBattleWindow(swordman);
        }
    }
};