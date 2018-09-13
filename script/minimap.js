var minimapLoopCounter = 0;

ctx2.fillStyle = "#00000044";
ctx2.fillRect(1670, 0, 250, 250);

function minimapLoop() {
    minimapLoopCounter++;
    if (minimapLoopCounter % 15 == 0) {
        if (msg.players.length > 0) {
            ctx2.clearRect(Math.round(1670 + msg.players[msg.you].x / config.tX - c.width / (2 * config.tX)), Math.round(msg.players[msg.you].y / config.tY - c.height / (2 * config.tY)), Math.round(c.width / config.tX), Math.round(c.height / config.tY));
            ctx2.fillStyle = "#00000044";
            ctx2.fillRect(Math.round(1670 + msg.players[msg.you].x / config.tX - c.width / (2 * config.tX)), Math.round(msg.players[msg.you].y / config.tY - c.height / (2 * config.tY)), Math.round(c.width / config.tX), Math.round(c.height / config.tY));
        }
        ctx2.fillStyle = "#FFFFFF88";
        for (var i = 0; msg.map.length > i; i++) {
            ctx2.fillRect(1670 + msg.map[i].x, msg.map[i].y, 1, 1);
        }
    }
    requestAnimationFrame(minimapLoop);
}
minimapLoop();