var MINUTE_SECOND   = 2;
var MINUTE_INCREASE = 15;
var DAYS_LEFT       = 13;

function Time(scene, initTime) {
    this._scene = scene;
    
    this._count     = 0;
    this._seconds   = 0;
    this._minutes   = initTime.minutes || 0;
    this._hours     = initTime.hours || 0;
    this._daysLeft  = DAYS_LEFT;
}

Time.prototype._getPrettyTime = function() {
    var hours = (this._hours < 10) ? "0" + this._hours : this._hours;
    var minutes = (this._minutes < 10) ? "0" + this._minutes : this._minutes;
    return hours + ":" + minutes;
};

Time.prototype.getDaysLeft = function() {
    return this._daysLeft;
};

Time.prototype.draw = function(ctx) {
    ctx.fillStyle = "rgb(26, 26, 26)";
    ctx.font = "bold 18px 'Lucida Console', Monaco, monospace";
    var text = this._getPrettyTime();
    var textWidth = ctx.measureText(text).width;
    var x = ctx.canvas.width - 20 - textWidth;
    var y = 20;
    ctx.fillText(text, x, y);
    
    ctx.font = "bold 14px 'Lucida Console', Monaco, monospace";
    if (this._daysLeft > 1) {
        text = this._daysLeft + " days left";
    } else {
        text = "last day";
    }
    textWidth = ctx.measureText(text).width;
    x = ctx.canvas.width - 20 - textWidth;
    y = 40;
    ctx.fillText(text, x, y);
};

Time.prototype.tick = function() {
    this._count ++;
    if (this._count >= 60) {
        this._count = 0;
        this._seconds++;
    }
    if (this._seconds >= MINUTE_SECOND) {
        this._seconds = 0;
        this._minutes += MINUTE_INCREASE;
    }
    if (this._minutes >= 60) {
        this._minutes = 0;
        this._hours++;
    }
    if (this._hours >= 24) {
        this._hours = 0;
        this._daysLeft--;
    }
};