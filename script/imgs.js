var assets = {};

//stone texture
assets.stone = document.createElement("canvas");
assets.stone.width = config.tX + 12;
assets.stone.height = config.tY + 12;
assets.stone.id = "stone";

var cx = assets.stone.getContext("2d");

cx.lineCap = "round";
cx.lineJoin = "round";
cx.lineWidth = 12;
cx.fillStyle = "lightgray";
cx.strokeStyle = "#848484";
cx.fillRect(6, 6, config.tX, config.tY);
cx.strokeRect(6, 6, config.tX, config.tY);



//stone ore texture
assets.wallOre = document.createElement("canvas");
assets.wallOre.width = config.tX / 3.5 + 12;
assets.wallOre.height = config.tY / 3.5 + 12;
assets.wallOre.id = "stoneOre";

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
assets.belt.id = "belt";
assets.belt.rotate = true;

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
assets.unbreakable.id = "unbreakable";

var cx = assets.unbreakable.getContext("2d");

cx.lineCap = "round";
cx.lineJoin = "round";
cx.lineWidth = 12;
cx.fillStyle = "#444444";
cx.strokeStyle = "#848484";
cx.fillRect(6, 6, config.tX, config.tY);
cx.strokeRect(6, 6, config.tX, config.tY);



//iron block texture
assets.iron = document.createElement("canvas");
assets.iron.width = config.tX + 12;
assets.iron.height = config.tY + 12;
assets.iron.id = "iron";

var cx = assets.iron.getContext("2d");

cx.lineCap = "round";
cx.lineJoin = "round";
cx.lineWidth = 12;
cx.fillStyle = "#99BEFF";
cx.strokeStyle = "#848484";
cx.fillRect(6, 6, config.tX, config.tY);
cx.strokeRect(6, 6, config.tX, config.tY);



//iron ore texture
assets.blueOre = document.createElement("canvas");
assets.blueOre.width = config.tX / 3.5 + 12;
assets.blueOre.height = config.tY / 3.5 + 12;
assets.blueOre.id = "ironOre";

var cx = assets.blueOre.getContext("2d");

cx.lineCap = "round";
cx.lineJoin = "round";
cx.lineWidth = 12;
cx.fillStyle = "#99BEFF"
cx.strokeStyle = "#999999";
cx.beginPath();
cx.rect(6, 6, config.tX/3.5,config.tY/3.5)
cx.stroke();
cx.fill();



//furnace texture
assets.furnace = document.createElement("canvas");
assets.furnace.width = config.tX + 12;
assets.furnace.height = config.tY + 12;
assets.furnace.id = "furnace";

var cx = assets.furnace.getContext("2d");
cx.fillText("WIP", 50, 50);



function tileFromString(asset, context, x, y, small, r) {
    if (small == false) {
        var dimX = config.tX + 12;
        var dimY = config.tY + 12;
    } else {
        var dimX = config.tX / 2 + 12;
        var dimY = config.tY / 2 + 12;
    }
    var oAssets = Object.values(assets);
    for (var i = 0; oAssets.length > i; i++) {
        if (oAssets[i].id == asset) {
            if (oAssets[i].rotate) {
                context.save();
                context.rotate(Math.PI / 2 * r);
                context.drawImage(oAssets[i], x, y, dimX, dimY);
                context.restore();
            } else {
                context.drawImage(oAssets[i], x, y, dimX, dimY);
            }
        }
    }
}