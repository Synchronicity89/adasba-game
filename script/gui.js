var guiWindows = {
    furnace: {
        type: "furnace",
        w: 300,
        h: 300,
        icons: [
            {
                x: 50,
                y: 50,
                type: "inv",
                name: "smelt",
                itemInfo: {
                    item: "none",
                    quantity: 0
                }
            },
            {
                x: 150,
                y: 50,
                type: "inv",
                name: "fuel",
                itemInfo: {
                    item: "none",
                    quantity: 0
                }
            }
        ]
    }
}

function makeGui(gui, block) {
    var g = cBV(gui);
    guiLoop(g);
    setInterval(makeGui, 1000 / 60, gui, block);
}

function guiLoop(gui) {

}