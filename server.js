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

//a bunch of functions i use for stuff and things
var func = require('./func.js');

//maps
var Map = require('./map.js').Map;

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
		concurrencyLimit: 8,          // Limits zlib concurrency for perf.
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

for (var i = 0; 500 > i; i++) {
    t.getBlock(Math.floor(Math.random() * c.mapX), Math.floor(Math.random() * c.mapY)).switchTo(bT.wall);
}

for (var i = 0; c.mapY > i; i++) {
    t.getBlock(0, i).switchTo(bT.wall);
}

for (var i = 0; c.mapY > i; i++) {
    t.getBlock(c.mapX - 2, i).switchTo(bT.wall);
}

for (var i = 0; c.mapX > i; i++) {
    t.getBlock(i, 0).switchTo(bT.wall);
}

for (var i = 0; c.mapX > i; i++) {
    t.getBlock(i, c.mapY - 2).switchTo(bT.wall);
}


//when websocket connects and when a message is sent
wss.on('connection', function (ws) {
    clients.push(new Player(ws, c.startX, c.startY, userCount, c.playerW, c.playerH, t, clients));
    userCount++;
    ws.on('message', function (message) {
        if (func.isJSON(message)) {
            var msg = JSON.parse(message);
            clients[ws.userID].input = func.cBV(msg);
        }
    });
});



function loop() {
    li++;
    for (var i = 0; clients.length > i; i++) {
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
                if (tile.blockType != "air") {
                    toSend.map.push(tile.getData());
                }
            });
            for (var i2 = 0; clients.length > i2; i2++) {
                //console.log(clients);
                toSend.players.push(clients[i2].getData());
            }
            clients[i].communicate(toSend);
        }
    }
    for (var i = 0; entities.length > i; i++) {
        if (entities[i].entityType == "item") {
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