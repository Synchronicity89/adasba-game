var assets = {};

//wall texture
assets.wall = document.createElement("canvas");
assets.wall.width = config.tX + 12;
assets.wall.height = config.tY + 12;

var cx = assets.wall.getContext("2d");

cx.lineCap = "round";
cx.lineJoin = "round";
cx.lineWidth = 12;
cx.fillStyle = "lightgray";
cx.strokeStyle = "#848484";
cx.fillRect(6, 6, config.tX, config.tY);
cx.strokeRect(6, 6, config.tX, config.tY);



//wall ore texture
assets.wallOre = document.createElement("canvas");
assets.wallOre.width = config.tX / 3.5 + 12;
assets.wallOre.height = config.tY / 3.5 + 12;

var cx = assets.wallOre.getContext("2d");

cx.lineCap = "round";
cx.lineJoin = "round";
cx.lineWidth = 12;
cx.fillStyle = "#c4c4c4"
cx.strokeStyle = "#999999";
cx.beginPath();
cx.rect(6, 6, config.tX/3.5,config.tY/3.5)
cx.stroke();
cx.fill();



//belt texture
assets.belt = document.createElement("canvas");
assets.belt.width = config.tX + 12;
assets.belt.height = config.tY + 12;

var cx = assets.belt.getContext("2d");

cx.lineCap = "round";
cx.lineJoin = "round";
cx.lineWidth = 12;
cx.fillStyle = "#555555";
cx.strokeStyle = "#608dff";
cx.fillRect(6, 6, config.tX, config.tY)
cx.strokeRect(6, 6, config.tX, config.tY);
cx.beginPath();
cx.moveTo(6 + config.tX / 3, 6 + 5 * config.tY / 8);
cx.lineTo(6 + config.tX / 2, 6 + 3 * config.tY / 8);
cx.lineTo(6 + 2 * config.tX / 3, 6 + 5 * config.tY / 8);
cx.stroke();



//unbreakable block texture
assets.unbreakable = document.createElement("canvas");
assets.unbreakable.width = config.tX + 12;
assets.unbreakable.height = config.tY + 12;

var cx = assets.unbreakable.getContext("2d");

cx.lineCap = "round";
cx.lineJoin = "round";
cx.lineWidth = 12;
cx.fillStyle = "#444444";
cx.strokeStyle = "#848484";
cx.fillRect(6, 6, config.tX, config.tY);
cx.strokeRect(6, 6, config.tX, config.tY);