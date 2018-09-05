var rLC = 0;

var config = {
    tX: 100,
    tY: 100
}


var styles = {
    rainbow: function() {
        rLC++;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.fillStyle = "Black";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.save();
        ctx.lineWidth = 1;
        if (msg.players.length > 0) {
            ctx.translate(-msg.players[msg.you].x + c.width / 2, -msg.players[msg.you].y + c.height / 2);
            for (var i = 0; c.width / config.tX + 2 > i; i++) {
                for (var i2 = 0; c.height / config.tY + 2 > i2; i2++) {
                    ctx.strokeStyle = "hsl(" + (10 * (Math.floor(msg.players[msg.you].x / config.tX) + Math.floor(msg.players[msg.you].y / config.tY) + i + i2 + rLC / 10)) + ", 100%, 20%)";
                    ctx.strokeRect(i * config.tX + Math.floor(msg.players[msg.you].x / config.tX) * config.tX - Math.floor(c.width / (config.tX * 2)) * config.tX, i2 * config.tY + Math.floor(msg.players[msg.you].y / config.tY) * config.tY - Math.floor(c.height / (config.tY * 2)) * config.tY, config.tX, config.tY);
                }
            }
        }
        ctx.lineWidth = 5;
        for (var i = 0; msg.players.length > i; i++) {
            ctx.strokeStyle = "hsl(" + (10 * (msg.players[i].x / config.tX + msg.players[i].y / config.tY + rLC / 10)) + ", 100%, 70%)";
            ctx.fillRect(msg.players[i].x - 15, msg.players[i].y - 15, 30, 30);
            ctx.strokeRect(msg.players[i].x - 15, msg.players[i].y - 15, 30, 30);
        }
        for (var i = 0; msg.map.length > i; i++) {
            if (msg.map[i].blockType == "wall") {
                ctx.strokeStyle = "hsl(" + (10 * (msg.map[i].x + msg.map[i].y + rLC / 10)) + ", 100%, 70%)";
                ctx.fillRect(msg.map[i].x * config.tX, msg.map[i].y * config.tY, config.tX, config.tY)
                ctx.strokeRect(msg.map[i].x * config.tX, msg.map[i].y * config.tY, config.tX, config.tY);
            }
        }
        ctx.restore();
    },
    grey: function() {
        rLC++;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.fillStyle = "#CCCCCC";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.save();
        ctx.lineWidth = 1;
        if (msg.players.length > 0) {
            ctx.translate(Math.floor(-msg.players[msg.you].x + c.width / 2), Math.floor(-msg.players[msg.you].y + c.height / 2));
        }
        ctx.lineWidth = 5;
        ctx.fillStyle = "#444444";
        for (var i = 0; msg.players.length > i; i++) {
            ctx.fillRect(msg.players[i].x - 15, msg.players[i].y - 15, 30, 30);
        }
        for (var i = 0; msg.map.length > i; i++) {
            if (msg.map[i].blockType == "wall") {
                ctx.fillRect(msg.map[i].x * config.tX, msg.map[i].y * config.tY, config.tX, config.tY)
            }
        }
        ctx.restore();
    },
    threeD: function() {
        rLC++;
        ctx.clearRect(0, 0, c.width, c.height)
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.fillStyle = "#CCCCCC00";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.save();
        ctx.lineWidth = 1;
        if (msg.players.length > 0) {
            ctx.translate(Math.floor(-msg.players[msg.you].x + c.width / 2), Math.floor(-msg.players[msg.you].y + c.height / 2));
        }
        ctx.lineWidth = 5;
        ctx.fillStyle = "#444444";
        for (var i = 0; msg.players.length > i; i++) {
            ctx.fillRect(msg.players[i].x - 15, msg.players[i].y - 15, 30, 30);
        }
        for (var i = 0; msg.map.length > i; i++) {
            if (msg.map[i].blockType == "wall") {
                ctx.fillRect(msg.map[i].x * config.tX, msg.map[i].y * config.tY, config.tX, config.tY)
            }
        }
        ctx.restore();
        for (var i = 0; 10 > i; i++) {
            ctx.drawImage(c, i * 1920 / 500, i * 1080 / 500, c.width - i * (1920 / 500) * 2, c.height - i * (1080 / 500) * 2);
        }
    },
    dayshadow: function() {
        rLC++;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.fillStyle = "#e8e8e8";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.save();
        ctx.lineWidth = 1;
        if (msg.players.length > 0) {
            ctx.translate(-msg.players[msg.you].x + c.width / 2, -msg.players[msg.you].y + c.height / 2);
            for (var i = 0; c.width / config.tX + 2 > i; i++) {
                for (var i2 = 0; c.height / config.tY + 2 > i2; i2++) {
                    ctx.strokeStyle = "darkgray";
                    ctx.strokeRect(i * config.tX + Math.floor(msg.players[msg.you].x / config.tX) * config.tX - Math.floor(c.width / (config.tX * 2)) * config.tX, i2 * config.tY + Math.floor(msg.players[msg.you].y / config.tY) * config.tY - Math.floor(c.height / (config.tY * 2)) * config.tY, config.tX, config.tY);
                }
            }
        }
        ctx.lineWidth = 5;
        for (var i = 0; msg.players.length > i; i++) {
            ctx.strokeStyle = "#848484";
        ctx.fillStyle = "#565656"
        ctx.lineWidth = 12
            ctx.fillRect(msg.players[i].x - 15, msg.players[i].y - 15, 30, 30);
            ctx.strokeRect(msg.players[i].x - 15, msg.players[i].y - 15, 30, 30);
        }
        for (var i = 0; msg.map.length > i; i++) {
            if (msg.map[i].blockType == "wall") {
        ctx.fillStyle = "lightgray"
                ctx.strokeStyle = "#848484";
                ctx.fillRect(msg.map[i].x * config.tX, msg.map[i].y * config.tY, config.tX, config.tY)
                ctx.strokeRect(msg.map[i].x * config.tX, msg.map[i].y * config.tY, config.tX, config.tY);
            }
        }
        ctx.restore();
    }
}



function drawLoop() {
    styles.dayshadow();
    requestAnimationFrame(drawLoop);
}
drawLoop();