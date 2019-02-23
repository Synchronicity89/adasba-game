//cartesian coordinates of loaded chunks
var loadedChunks = [];

//all in-game objects
var o = [];

//all map line seguments currently loaded
var chunks = [];

//"linked" chunks, where all of them load if a single one is loaded
var linkedChunks = [
    [
        {
            x: 2,
            y: 1
        },
        {
            x: 3,
            y: 1
        }
    ],
    [
        {
            x: 2,
            y: 2
        },
        {
            x: 1,
            y: 2
        },
        {
            x: 0,
            y: 2
        }
    ], 
    [   
        {
            x: 1,
            y: 3
        },
        {
            x: 2,
            y: 3
        },
        {
            x: 3,
            y: 3
        },
        {
            x: 2,
            y: 4
        },
        {
            x: 3,
            y: 4
        }
    ]
];

//tests for whether a chunk is linked
function isLinked(x, y) {
    for (var i = 0; linkedChunks.length > i; i++) {
        for (var i2 = 0; linkedChunks[i].length > i2; i2++) {
            if (linkedChunks[i][i2].x == x && linkedChunks[i][i2].y == y) {
                return {
                    state: true,
                    index: i,
                    index2: i2
                };
            }
        }
    }
    return {
        state: false
    };
}

//loads chunks
function loadChunk(x, y) {

    //cancels loading if chunk is already loaded
    var isLoaded = false;
    for (var i = 0; loadedChunks.length > i; i++) {
        if (x == loadedChunks[i].x && y == loadedChunks[i].y) {
            isLoaded = true;
        }
    }

    //tests for linked chunks (and loads them if the chunks are linked)
    for (var i = 0; linkedChunks.length > i; i++) {
        for (var i2 = 0; linkedChunks[i].length > i2; i2++) {
            if (linkedChunks[i][i2].x == x && linkedChunks[i][i2].y == y) {
                for (var i3 = 0; linkedChunks[i].length > i3; i3++) {
                    loadChunkNoLink(linkedChunks[i][i3].x, linkedChunks[i][i3].y);
                }
                isLoaded = true;
            }
        }
    }

    //if the chunk isn't already loaded, load it
    if (!isLoaded) {
        loadedChunks.push({
            x: x,
            y: y
        });
        chunks = chunks.concat(map.lines[y][x]);
        map.events[y][x].load();
    }
}

//loads chunks but ignores linking
function loadChunkNoLink(x, y) {
    var isLoaded = false;
    for (var i = 0; loadedChunks.length > i; i++) {
        if (x == loadedChunks[i].x && y == loadedChunks[i].y) {
            isLoaded = true;
        }
    }
    if (!isLoaded) {
        loadedChunks.push({
            x: x,
            y: y
        });
        chunks = chunks.concat(map.lines[y][x]);
        map.events[y][x].load();
    }
}

// function unloadChunk(x, y) {
//     for (var i = 0; loadedChunks.length > i; i++) {
//         if (loadedChunks[i].x == x && loadedChunks[i].y == y) {
//             loadedChunks.splice(i, 1);   
//         }
//     }
//     chunks = [];
//     for (var i = 0; loadedChunks.length > i; i++) {
//         loadChunk(xloadedChunks[i].x, loadedChunks[i].y);
//     }
// }

//unloads all irrelevant line segments, entities, and chunks
function unload() {

    //remove line segments outside of loaded chunks
    for (var i = 0; chunks.length > i; i++) {
        var isDeletable = true;
        for (var i2 = 0; loadedChunks.length > i2; i2++) {
            if (inclusiveInRect(loadedChunks[i2].x * 512, loadedChunks[i2].y * 512, 512, 512, chunks[i].start.x, chunks[i].start.y) || inRect(loadedChunks[i2].x * 512, loadedChunks[i2].y * 512, 512, 512, chunks[i].end.x, chunks[i].end.y)) {
               isDeletable = false;
            }
        }
        if (isDeletable) {
            chunks.splice(i, 1);
        }
    }

    //remove entities outside of loaded chunks
    for (var i = 0; o.length > i; i++) {
        var isDeletable = true;
        for (var i2 = 0; loadedChunks.length > i2; i2++) {
            if (inclusiveInRect(loadedChunks[i2].x * 512, loadedChunks[i2].y * 512, 512, 512, o[i].x, o[i].y)) {
               isDeletable = false;
            }
        }
        if (isDeletable) {
            o.splice(i, 1);
        }
    }

    //remove chunks faraway from player
    for (var i = 0; loadedChunks.length > i; i++) {
        if (!inRect(p.x - 1024, p.y - 1024, 2048, 2048, loadedChunks[i].x * 512 + 256, loadedChunks[i].y * 512 + 256)) {

            //tests if chunks are linked
            var chunkLinkData = isLinked(loadedChunks[i].x, loadedChunks[i].y);

            //if not linked, get rid of it
            if (!chunkLinkData.state) {
                loadedChunks.splice(i, 1);
                i--;

                //if linked, see if all linked chunks can be unloaded
                //if they can, then delete, otherwise don't
            } else {
                var isDeletable = true;
                for (var i2 = 0; linkedChunks[chunkLinkData.index].length > i2; i2++) {
                    if (inRect(p.x - 1024, p.y - 1024, 2048, 2048, linkedChunks[chunkLinkData.index][i2].x * 512 + 256, linkedChunks[chunkLinkData.index][i2].y * 512 + 256) && chunkLinkData.index2 != i2) {
                        isDeletable = false;
                    }
                }
                if (isDeletable) {
                    loadedChunks.splice(i, 1);
                    i--;
                }
            }
        }
    }
}