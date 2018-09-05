var func = require('./func.js');

exports.Entity = function(x, y, entityType, subType, type) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.entityType = entityType;
    this.subType = subType;
    this.type = type;
    this.move = function() {
        this.x += this.dx;
        this.y += this.dy;
        this.dx *= 0.98;
        this.dy *= 0.98;
    }
    this.attractTo = function(target) {
        this.dx += func.clamp(-25000 * Math.cos(Math.atan2(this.y - target.y, this.x - target.x)) / Math.pow(func.pythagoras(this.x, this.y, target.x, target.y), 2), -10, 10);
        this.dy += func.clamp(-25000 * Math.sin(Math.atan2(this.y - target.y, this.x - target.x)) / Math.pow(func.pythagoras(this.x, this.y, target.x, target.y), 2), -10, 10);
    }
    this.dead = false;
}

exports.entityTypes = {
    item: {
    }
}