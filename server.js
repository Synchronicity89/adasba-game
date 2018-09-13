//load modules
const http = require('http');
const fs = require('fs');
const url = require('url');
const WebSocket = require('ws');
var express = require('express');

//config
var c = require('./config.json');

//the players
var Player = require('./player.js').Player;

//terrain object
var Block = require('./block.js').Block;

//terrain types
var bT = require('./block.js').blockTypes;

//terrain ore types
var oT = require('./block.js').oreTypes;

//a bunch of functions i use for stuff and things
var func = require('./func.js');

//maps
var Map = require('./map.js').Map;

//currentmap
var cmap = require('./currentmap.json');

//start websocket server
var WebSocketServer = WebSocket.Server
wss = new WebSocketServer({port: 42068, //compression stuff stolen from https://github.com/websockets/ws
	maxReceivedFrameSize: 99999999,
    maxReceivedMessageSize: 99999999,
	perMessageDeflate: {
		zlibDeflateOptions: { // See zlib defaults.
		  chunkSize: 1024,
		  memLevel: 7,
		  level: 3,
		},
		zlibInflateOptions: {
		  chunkSize: 10 * 1024
		},
		// Other options settable:
		clientNoContextTakeover: true, // Defaults to negotiated value.
		serverNoContextTakeover: true, // Defaults to negotiated value.
		clientMaxWindowBits: 10,       // Defaults to negotiated value.
		serverMaxWindowBits: 10,       // Defaults to negotiated value.
		// Below options specified as default values.
		concurrencyLimit: 4,          // Limits zlib concurrency for perf.
		threshold: 1024,               // Size (in bytes) below which messages
									   // should not be compressed.
      } });



//all clients
var clients = [];



//data to send to clients
var toSend = {};



//user counter to assign unique IDs
var userCount = 0;



//loop counter
var li = 0;



//all entities in game besides players
var entities = [];



//terrain
var t = new Map(c.mapX, c.mapY, c.tileX, c.tileY, entities);


t.doToRect(0, 0, t.w, t.h, function (tile, x, y) {
    tile.switchTo(bT.unbreakable);
});



// for (var i = 0; Math.floor(cmap.length / 4) - 1 > i; i++) {
//     if (cmap[i * 4 + 0] == 0) {
//         t.getBlock(i % t.w, Math.floor(i / t.w)).switchToOverride(bT.unbreakable);
//     }
//     if (cmap[i * 4 + 0] == 255) {
//         t.getBlock(i % t.w, Math.floor(i / t.w)).switchToOverride(bT.air);
//     }
// }



fCoords = {
    x: 0,
    y: 0,
    w: 4,
    h: 4  
};

for (var i = 0; t.h > i; i++) {
    for (var i2 = 0; t.w > i2; i2++) {
        var point = { r: (fCoords.w / t.w) * i2 - (fCoords.w / 2) + fCoords.x, i: (fCoords.h / t.h) * i - (fCoords.h / 2) + fCoords.y };
        var point2 = { r: 0, i: 0 };
        for (var i3 = 0; 64 > i3; i3++) {
            point2 = { r: point2.r * point2.r - point2.i * point2.i + point.r, i: 2 * point2.r * point2.i + point.i };
        }
        if (func.pythagoras(point2.r, point2.i, 0, 0) < 2) {
            t.getBlock(i2, i).switchToOverride(bT.air);
        }
    }
}


// var tC = { x: 0, y: 0 };
// var tDir = 0;
// var tPaths = [{ x: 0, y: 0, r: 7, l: 400, d: Math.PI / 4 }, { x: c.mapX, y: 0, r: 10, l: 400, d: 3 * Math.PI / 4 }, { x: c.mapX, y: c.mapY, r: 10, l: 400, d: 5 * Math.PI / 4 }, { x: 0, y: c.mapY, r: 10, l: 400, d: 7 * Math.PI / 4 }];
// for (var i = 0; tPaths.length > i; i++) {
//     tC2 = { x: Math.floor(Math.random() * c.mapX), y: Math.floor(Math.random() * c.mapY), r: Math.ceil(Math.random() * 7 + 7), l: Math.random() * 100 };
//     tDir = Math.random() * Math.PI * 2;
//     for (var i2 = 0; tPaths[i].l > i2; i2++) {
//         // tC2.x += Math.cos(tDir);
//         // tC2.y += Math.sin(tDir);
//         // tDir += Math.random() * 0.4 - 0.2;
//         // tC = { x: Math.floor(tC2.x), y: Math.floor(tC2.y), r: Math.floor(tC2.r), l: Math.floor(tC2.l) };
//         // t.doToRect(tC.x - tC.r, tC.y - tC.r, tC.x + tC.r, tC.y + tC.r, function(tile, x, y) {
//         //     if (tC2.r > func.pythagoras(tC.x, tC.y, x / c.tileX, y / c.tileY)) {
//         //         tile.switchTo(bT.air);
//         //     }
//         // });
//         if (Math.random() > 0.98 && tPaths[i].r > 1) {
//             tPaths.push({ x: tPaths[i].x, y: tPaths[i].y, r: tPaths[i].r / (Math.random() + 1) - 1.6, l: Math.random() * tPaths[i].r * 40, d: tPaths[i].d * ((Math.PI / 3) + Math.PI / 3) + Math.PI * Math.round(Math.random()) });
//         }
//         tPaths[i].x += Math.cos(tPaths[i].d);
//         tPaths[i].y += Math.sin(tPaths[i].d);
//         tPaths[i].d += Math.random() * 0.2 - 0.1;
//         tC = { x: Math.floor(tPaths[i].x), y: Math.floor(tPaths[i].y), r: Math.ceil(tPaths[i].r), l: tPaths[i].l, d: tPaths[i].d };
//         t.doToRect(tC.x - tC.r, tC.y - tC.r, tC.x + tC.r, tC.y + tC.r, function(tile, x, y) {
//             if (tPaths[i].r > func.pythagoras(tC.x, tC.y, x / c.tileX, y / c.tileY)) {
//                 tile.switchToOverride(bT.air);
//             }
//         });
//     }
// } 


for (var i = 0; c.mapX * c.mapY / 20 > i; i++) {
    t.getBlock(Math.floor(Math.random() * (c.mapX - 3) + 1), Math.floor(Math.random() * (c.mapY - 3) + 1)).switchTo(bT.wall);
}

for (var i = 0; c.mapX * c.mapY / 600 > i; i++) {
    var tC = { x: Math.floor(Math.random() * c.mapX), y: Math.floor(Math.random() * c.mapY), r: Math.ceil(Math.random() * 15) }
    //t.getBlock(Math.floor(Math.random() * c.mapX), Math.floor(Math.random() * c.mapY)).switchToOre(oT.wall, Math.floor(Math.random() * 20));
    t.doToRect(tC.x - tC.r, tC.y - tC.r, tC.x + tC.r, tC.y + tC.r, function(tile, x, y) {
        if (Math.random() > func.pythagoras(tC.x, tC.y, x / c.tileX, y / c.tileY) / tC.r) {
            tile.switchToOre(oT.wall, Math.ceil(5 * tC.r / func.pythagoras(tC.x, tC.y, x / c.tileX, y / c.tileY)));
        }
    });
}

for (var i = 0; c.mapY > i; i++) {
    t.getBlock(0, i).switchTo(bT.unbreakable);
}

for (var i = 0; c.mapY > i; i++) {
    t.getBlock(c.mapX - 2, i).switchTo(bT.unbreakable);
}

for (var i = 0; c.mapX > i; i++) {
    t.getBlock(i, 0).switchTo(bT.unbreakable);
}

for (var i = 0; c.mapX > i; i++) {
    t.getBlock(i, c.mapY - 2).switchTo(bT.unbreakable);
}



//when websocket connects and when a message is sent
wss.on('connection', function (ws) {
    // var tC = { x: 0, y: 0 };
    // while (t.getBlock(tC.x, tC.y).blockType != "air") {
    //     tC = { x: Math.floor(Math.random() * c.mapX), y: Math.floor(Math.random() * c.mapY) };
    // }
    // clients.push(new Player(ws, tC.x * c.tileX, tC.y * c.tileY, userCount, c.playerW, c.playerH, t, clients));
    // clients[clients.length - 1].inv = func.cBV(c.startInv);
    // userCount++;
    ws.on('message', function (message) {
        if (message == "gimme map") {
            var gimme = [];
            for (var i = 0; t.h > i; i++) {
                gimme.push([]);
                for (var i2 = 0; t.w > i2; i2++) {
                    gimme[i].push(t.getBlock(i2, i).getData());
                }
            }
            ws.send(JSON.stringify(gimme));
        }
        if (func.isJSON(message)) {
            var msg = JSON.parse(message);
            if (msg.type != "inputName") {
                clients[ws.userID].input = func.cBV(msg);
            } else {
                if (msg.name.length < 64) {
                    var tC = { x: 0, y: 0 };
                    while (t.getBlock(tC.x, tC.y).blockType != "air") {
                        tC = { x: Math.floor(Math.random() * c.mapX), y: Math.floor(Math.random() * c.mapY) };
                    }
                    clients.push(new Player(ws, tC.x * c.tileX + c.tileX / 2, tC.y * c.tileY + c.tileY / 2, userCount, c.playerW, c.playerH, t, clients));
                    clients[clients.length - 1].inv = func.cBV(c.startInv);
                    userCount++;
                    clients[ws.userID].name = msg.name;
                }
            }
        }
    });
});



function loop() {
    li++;
    for (var i = 0; clients.length > i; i++) {
        clients[i].getCraftList();
        if (t.getBlockFromCoords(clients[i].x, clients[i].y).blockType == "belt") {
            clients[i].dy += Math.sin(t.getBlockFromCoords(clients[i].x, clients[i].y).dir * Math.PI / 2 - Math.PI / 2);
            clients[i].dx += Math.cos(t.getBlockFromCoords(clients[i].x, clients[i].y).dir * Math.PI / 2 - Math.PI / 2);
        }
        clients[i].respondToInput();
        clients[i].move();
        if (li % 2 == 0) {
            toSend = { 
                players: [], 
                you: clients[i].ws.userID,
                map: [],
                entities: entities
            };
            t.doToRectFromCoords(clients[i].x - 960, clients[i].y - 540, 1920 + 2 * c.tileX, 1080 + 2 * c.tileY, function (tile, x, y) {
                if (tile.blockType != "air" || tile.ore != "air") {
                    toSend.map.push(tile.getData());
                }
            });
            for (var i2 = 0; clients.length > i2; i2++) {
                toSend.players.push(clients[i2].getData());
            }
            clients[i].communicate(toSend);
        }
    }
    for (var i = 0; entities.length > i; i++) {
        if (entities[i].entityType == "item") {
            if (t.getBlockFromCoords(entities[i].x, entities[i].y).blockType == "belt") {
                entities[i].dy += Math.sin(t.getBlockFromCoords(entities[i].x, entities[i].y).dir * Math.PI / 2 - Math.PI / 2);
                entities[i].dx += Math.cos(t.getBlockFromCoords(entities[i].x, entities[i].y).dir * Math.PI / 2 - Math.PI / 2);
            }
            entities[i].move();
            for (var i2 = 0; clients.length > i2; i2++) {
                entities[i].attractTo(clients[i2]);
                if (func.inRect(clients[i2].x - c.playerW / 2, clients[i2].y - c.playerH / 2, c.playerW, c.playerH, entities[i].x, entities[i].y)) {
                    entities[i].dead = true;
                    clients[i2].addToInv(entities[i].subType, 1);
                }
            }
        }
    }
    for (var i = 0; entities.length > i; i++) {
        if (entities[i].dead) {
            entities.splice(i, 1);
            i--;
        }
    }
}
setInterval(loop, 1000 / 60);



//express
var app = express();

//GET html index file
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/index.html');
    console.log("sent file: " + req.url);
});

//GET html files
app.get(/html/, function (req, res) {
    res.sendFile(__dirname + '/html/' + req.url.slice(6));
    console.log("sent file: " + req.url);
});

//GET css files
app.get(/css/, function (req, res) {
    res.sendFile(__dirname + '/css/' + req.url.slice(5));
    console.log("sent file: " + req.url);
});

//GET all scripts
app.get(/script/, function (req, res) {
    res.sendFile(__dirname + '/script/' + req.url.slice(8));
    console.log("sent file: " + req.url);
});

//GET image assets
app.get(/image/, function (req, res) {
    res.sendFile(__dirname + '/image/' + req.url.slice(7));
    console.log("sent file: " + req.url);
});

//listen on port 42069
app.listen(42069, function () {
	console.log('App successfully started.');
})