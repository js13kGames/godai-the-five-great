var DISTANCE_LEFT = 113; //1 japanese ri (里) = 3927 metres

function Distance(scene) {
    this._scene = scene;
    
    this._distanceLeft = DISTANCE_LEFT;
}

Distance.prototype.getDistance = function() {
    return this._distanceLeft;
};

Distance.prototype.coverDistance = function(distanceCovered) {
    this._distanceLeft -= distanceCovered;
    if (this._distanceLeft <= 0) {
        this._distanceLeft = 0;
    }
};

Distance.prototype.draw = function(ctx) {
    ctx.fillStyle = "rgb(26, 26, 26)";
    ctx.font = "bold 14px 'Lucida Console', Monaco, monospace";
    var text = "distance left: " + this._distanceLeft.toFixed(2) + " ri";
    var textWidth = ctx.measureText(text).width;
    var x = 20;
    var y = 20;
    ctx.fillText(text, x, y);
};

Distance.prototype.tick = function() {
    
};