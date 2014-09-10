var SWORDSMAN_KNOWLEDGE = [
    {
        "strength": 2,
        "technique": 1
    },
    {
        "strength": 3,
        "technique": 1
    },
    {
        "strength": 3,
        "technique": 2
    },
    {
        "strength": 3,
        "technique": 2,
        "strategy": 1
    },
    {
        "strength": 4,
        "technique": 2,
        "strategy": 1
    },
    {
        "strength": 4,
        "technique": 3,
        "strategy": 1
    },
    {
        "strength": 4,
        "technique": 3,
        "strategy": 2
    },
    {
        "strength": 4,
        "technique": 3,
        "strategy": 2,
        "perfection": 1
    },
    {
        "strength": 5,
        "technique": 3,
        "strategy": 2,
        "perfection": 1
    },
    {
        "strength": 5,
        "technique": 4,
        "strategy": 2,
        "perfection": 1
    },
    {
        "strength": 5,
        "technique": 4,
        "strategy": 3,
        "perfection": 1
    },
    {
        "strength": 5,
        "technique": 4,
        "strategy": 3,
        "perfection": 2
    },
    {
        "strength": 5,
        "technique": 4,
        "strategy": 3,
        "perfection": 2,
        "focus": 1
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