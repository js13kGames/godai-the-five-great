function PlayScene(game) {
    this._game = game;
    
    this._paused = false;
    
    this._time = new Time(this, {hours: 6, minutes: 15});
    this._distance = new Distance();
    this._messageWindow = new MessageWindow(this);
    this._miyamoto = new Miyamoto(this);
    this._ui = new UI(this);
    this._spiritUI = new SpiritUI(this);
    this._encounters = new EncounterList(this);
    this._battleWindow = new BattleWindow(this);
    this._deathWindow = new DeathWindow(this);
}

PlayScene.prototype._checkEncounters = function() {
    this._encounters.checkEncounters();
};

PlayScene.prototype._checkGameOver = function() {
    if (this._distance.getDistanceLeft() <= 0) {
        this._game.setScene(new WinScene(this._game));
    }
    
    if (this._time.getDaysLeft() <= 0 || this._miyamoto.getLife() <= 0) {
        this.pause();
        this.hideUI();
        this.showDeathWindow();
    }
};

PlayScene.prototype.getMiyamoto = function() {
    return this._miyamoto;
};

PlayScene.prototype.getDistance = function() {
    return this._distance;
};

PlayScene.prototype.getMessageWindow = function() {
    return this._messageWindow;
};

PlayScene.prototype.showDeathWindow = function() {
    this._deathWindow.show(this);
};

PlayScene.prototype.getUI = function() {
    return this._ui;
};

PlayScene.prototype.keyPressed = function(key) {
    if (this._deathWindow.isVisible() && key == KEY_ENTER) {
        this._game.setScene(new StartupScene(this._game));
    }
};

PlayScene.prototype.mouseClick = function() {
    if (this._deathWindow.isVisible()) {
        this._game.setScene(new StartupScene(this._game));
    }
};

PlayScene.prototype.showSpiritualImprovementSelection = function() {
    this._spiritUI.show();
};

PlayScene.prototype.launchBattleWindow = function(encounter) {
    console.log(encounter);
    this.pause();
    this._ui.hide();
    this._battleWindow.launchEncounter(encounter);
};

PlayScene.prototype.showUI = function() {
    this._ui.show();
};

PlayScene.prototype.hideUI = function() {
    this._ui.hide();
};

PlayScene.prototype.pause = function() {
    this._paused = true;
};

PlayScene.prototype.play = function() {
    this._paused = false;
};

PlayScene.prototype.draw = function(ctx) {
    this._time.draw(ctx);
    this._distance.draw(ctx);
    this._miyamoto.draw(ctx);
    
    this._messageWindow.draw(ctx);
    this._battleWindow.draw(ctx);
    this._deathWindow.draw(ctx);
};

PlayScene.prototype.tick = function() {
    if (!this._paused) {
        this._time.tick();
        this._ui.tick();
        this._miyamoto.tick();
        this._messageWindow.tick();

        this._checkEncounters();
        this._checkGameOver();
    } else {
        this._battleWindow.tick();
        this._deathWindow.tick();
    }
};