var rLC = 0;

var isOverBlock = false;

var config = {
    tX: 100,
    tY: 100,
    pX: 50,
    pY: 50
}

function drawLoop() {
    rLC++;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.fillStyle = "#e8e8e8";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.save();
    ctx.lineWidth = 1;
    if (msg.players.length > 0) {
        ctx.translate(-msg.players[msg.you].x + c.width / 2, -msg.players[msg.you].y + c.height / 2);
        for (var i = -1; c.width / config.tX + 2 > i; i++) {
            for (var i2 = -1; c.height / config.tY + 2 > i2; i2++) {
                ctx.strokeStyle = "darkgray";
                ctx.strokeRect(i * config.tX + truncate(msg.players[msg.you].x, config.tX) - Math.floor(c.width / (config.tX * 2)) * config.tX, i2 * config.tY + truncate(msg.players[msg.you].y, config.tY) - Math.floor(c.height / (config.tY * 2)) * config.tY, config.tX, config.tY);
            }
        }
    }

    ctx.lineWidth = 5;

    ctx.lineWidth = 12;
    for (var i = 0; msg.map.length > i; i++) {
        if (msg.map[i].blockType == "wall") {
            ctx.fillStyle = "lightgray"
            ctx.strokeStyle = "#848484";
            ctx.fillRect(msg.map[i].x * config.tX, msg.map[i].y * config.tY, config.tX, config.tY)
            ctx.strokeRect(msg.map[i].x * config.tX, msg.map[i].y * config.tY, config.tX, config.tY);
        }
    }
    for (var i = 0; msg.map.length > i; i++) {
        msg.map[i].neighbors = 0;
        for (var i2 = 0; msg.map.length > i2; i2++) {
            if (msg.map[i].x == msg.map[i2].x - 1 && msg.map[i].y == msg.map[i2].y) {
                ctx.fillRect(msg.map[i].x * config.tX + 6, msg.map[i].y * config.tY + 6, config.tX * 2 - 12, config.tY - 12);
                msg.map[i].neighbors++;
            }
            if (msg.map[i].y == msg.map[i2].y - 1 && msg.map[i].x == msg.map[i2].x) {
                ctx.fillRect(msg.map[i].x * config.tX + 6, msg.map[i].y * config.tY + 6, config.tX - 12, config.tY * 2 - 12);
                msg.map[i].neighbors++;
            }
            if (msg.map[i].y == msg.map[i2].y - 1 && msg.map[i].x == msg.map[i2].x - 1) {
                msg.map[i].neighbors++;
            }
        }
        if (msg.map[i].neighbors == 3) {
            ctx.fillRect(msg.map[i].x * config.tX + config.tX - 7, msg.map[i].y * config.tY + config.tY - 7, 14, 14);
        }
    }

    for (var i = 0; msg.entities.length > i; i++) {
        if (msg.entities[i].subType == "wall") {
            ctx.fillStyle = "lightgray"
            ctx.strokeStyle = "#848484";
            ctx.fillRect(msg.entities[i].x - config.tX / 4, msg.entities[i].y - config.tY / 4, config.tX / 2, config.tY / 2)
            ctx.strokeRect(msg.entities[i].x - config.tX / 4, msg.entities[i].y - config.tY / 4, config.tX / 2, config.tY / 2);
        }
    }

    for (var i = 0; msg.players.length > i; i++) {
        ctx.strokeStyle = "#848484";
        ctx.fillStyle = "#565656";
        ctx.lineWidth = 12;
        ctx.fillRect(msg.players[i].x - config.pX / 2, msg.players[i].y - config.pY / 2, config.pX, config.pY);
        ctx.strokeRect(msg.players[i].x - config.pX / 2, msg.players[i].y - config.pY / 2, config.pX, config.pY);
        if (msg.players[i].input.m.m[0] && pythagoras(msg.players[i].input.m.x, msg.players[i].input.m.y, c.width / 2, c.height / 2) < 300) {
            ctx.strokeStyle = "#93edff";
            ctx.lineWidth = 16 + Math.sin(rLC / 3) * 6;
            ctx.beginPath();
            ctx.moveTo(c.width / 2 + msg.players[i].x - c.width / 2, c.height / 2 + msg.players[i].y - c.height / 2);
            ctx.lineTo(truncate(msg.players[i].input.m.x + msg.players[i].x - c.width / 2, config.tX) + config.tX / 2, truncate(msg.players[i].input.m.y + msg.players[i].y - c.height / 2, config.tY) + config.tY / 2);
            ctx.stroke();
        }
        ctx.lineWidth = 9;
        ctx.strokeStyle = "#333333";
        ctx.font = "24px Courier New";
        ctx.textAlign = "center"
        ctx.strokeText(msg.players[i].name, msg.players[i].x, msg.players[i].y - config.pX / 2 - 10);
        ctx.strokeStyle = "#CCCCCC";
        ctx.lineWidth = 2;
        ctx.strokeText(msg.players[i].name, msg.players[i].x, msg.players[i].y - config.pX / 2 - 10);
    }

    if (msg.players.length > 0) {
        if (pythagoras(input.m.x, input.m.y, c.width / 2, c.height / 2) < 300) {
            ctx.strokeStyle = "#b6ff72";
            ctx.lineWidth = config.tX / 5;
            for (var i = 0; msg.map.length > i; i++) {
                if (inRect(msg.map[i].x * config.tX, msg.map[i].y * config.tY, config.tX, config.tY, input.m.x + msg.players[msg.you].x - c.width / 2, input.m.y + msg.players[msg.you].y - c.height / 2)) {
                    ctx.lineWidth = config.tX / 5 * (msg.map[i].hp / msg.map[i].mhp);
                    ctx.strokeStyle = "#ff6f3a";
                } else if (ctx.strokeStyle != "#ff6f3a") {
                    ctx.lineWidth = config.tX / 5;
                    ctx.strokeStyle = "#b6ff72";
                }
            }
            ctx.save();
            ctx.translate(truncate(input.m.x + msg.players[msg.you].x - c.width / 2, config.tX), truncate(input.m.y + msg.players[msg.you].y - c.height / 2, config.tY));
            ctx.beginPath();
            ctx.moveTo(0, config.tY / 3);
            ctx.lineTo(0, 0);
            ctx.lineTo(config.tX / 3, 0);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, 2 * config.tY / 3);
            ctx.lineTo(0, config.tY);
            ctx.lineTo(config.tX / 3, config.tY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(2 * config.tX / 3, config.tY);
            ctx.lineTo(config.tX, config.tY);
            ctx.lineTo(config.tX, 2 * config.tY / 3);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(2 * config.tX / 3, 0);
            ctx.lineTo(config.tX, 0);
            ctx.lineTo(config.tX, config.tY / 3);
            ctx.stroke();
            ctx.restore();
        }
    }
    ctx.restore();
    if (msg.players.length > 0) {
        ctx.lineWidth = 12;
        ctx.fillStyle = "#56565688";
        ctx.fillRect(-20, c.height - 100, c.width + 40, 140);
        for (var i = 0; msg.players[msg.you].inv.length > i; i++) {
            ctx.save();
            ctx.translate(c.width / 2 + 150 * i - 150 * input.s, c.height - 50);
            if (msg.players[msg.you].inv[i].item = "wall") {
                ctx.lineWidth = 12;
                ctx.fillStyle = "lightgray"
                ctx.strokeStyle = "#848484";
                ctx.fillRect(-25, -25, 50, 50);
                ctx.strokeRect(-25, -25, 50, 50);
                ctx.lineWidth = 9;
                ctx.strokeStyle = "#333333";
                ctx.font = "24px Courier New";
                ctx.textAlign = "center"
                ctx.strokeText(msg.players[msg.you].inv[i].quantity, 0, 7);
                ctx.strokeStyle = "#CCCCCC";
                ctx.lineWidth = 2;
                ctx.strokeText(msg.players[msg.you].inv[i].quantity, 0, 7);
            }
            ctx.restore();
        }
    }
    // ctx.beginPath();
    // ctx.lineWidth = 12;
    // ctx.strokeStyle = "rgba(100, 100, 100, " + ((100 - Math.abs(pythagoras(input.m.x, input.m.y, c.width / 2, c.height / 2) - 300)) / 200) + ")";
    // ctx.arc(c.width / 2, c.height / 2, 300, 0, Math.PI * 2);
    // ctx.stroke();
    requestAnimationFrame(drawLoop);
}
drawLoop();