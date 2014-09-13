var CANVAS_WIDTH = 400;
var CANVAS_HEIGHT = 300;

function GameRunner() {
    this._ctx = this._createCanvasContext();
    this._game = new Game(this._ctx);
    this._keyboard = new Keyboard(this._game);
    this._mouse = new Mouse(this._game);
}

GameRunner.prototype._createCanvasContext = function() {
    var CANVAS_ID = 'canvas';
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    canvas.setAttribute("width", CANVAS_WIDTH);
    canvas.setAttribute("height", CANVAS_HEIGHT);
    document.getElementById("canvasHolder").appendChild(canvas);
    canvas = document.getElementById("canvas");
    return canvas.getContext("2d");
};

GameRunner.prototype._clearCanvas = function() {
    this._ctx.fillStyle = "rgb(255, 255, 255)";
    this._ctx.fillRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
};

GameRunner.prototype._gameLoop = function() {
    this._keyboard.handleKeypresses();
    this._mouse.handleMouseclicks();
    this._game.tick();
    
    this._clearCanvas();
    this._game.draw(this._ctx);
};

GameRunner.prototype.run = function() {
    var that = this;
    //setInterval(function() { that._gameLoop(); }, 1000 / FPS);
    (function loop(){
      that._gameLoop();
      requestAnimFrame(loop, that);
    })();
};