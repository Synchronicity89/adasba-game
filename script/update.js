function updateLoop() {
    for (var i = 0; msg.players.length > i; i++) {
        msg.players[i].x += msg.players[i].dx;
        msg.players[i].y += msg.players[i].dy;
    }
    for (var i = 0; msg.entities.length > i; i++) {
        msg.entities[i].x += msg.entities[i].dx;
        msg.entities[i].y += msg.entities[i].dy;
    }
    requestAnimationFrame(updateLoop);
}
updateLoop();