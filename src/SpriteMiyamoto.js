var SPRITE_SIZE = 35;

function SpriteMiyamoto() {
    this._loaded = false;
    
    this._initialize();
}

SpriteMiyamoto.prototype._initialize = function() {
    this._walking = new Image();
    this._walking.src = "img/walking.gif";
    this._walking.onload = function() {
        this._loaded = true;
    };
    
    this._framesLost = 0;
    this._count = 0;
};

SpriteMiyamoto.prototype._drawSprite = function(ctx) {
    var i = this._count;
    ctx.drawImage(this._walking, i * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, ctx.canvas.width/2 - (SPRITE_SIZE*5/2), ctx.canvas.height/2 - (SPRITE_SIZE*5/2), SPRITE_SIZE*5, SPRITE_SIZE*5);
};

SpriteMiyamoto.prototype.draw = function(ctx) {
    this._drawSprite(ctx);
};

SpriteMiyamoto.prototype.tick = function() {
    this._framesLost ++;
    if (this._framesLost > 4) {
        this._count ++;
        this._framesLost = 0;
    }
    if (this._count > 6) {
        this._count = 0;   
    }
};