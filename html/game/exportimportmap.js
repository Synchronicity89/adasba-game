function indexOfObj(arr, obj) {
    for (var i = 0; arr.length > i; i++) {
        if (arr[i] === obj) {
            return i;
        }
    }
    return false;
}

function exportMap() {
    var map2 = JSON.parse(JSON.stringify(map));
    //console.log(map2);
    doToRect(map2.tiles, 0, 0, 50, 50, function (e, i, i2) {
        for (var i3 = 0; map2.tiles[i][i2].length > i3; i3++) {
            map2.tiles[i][i2][i3].texture = indexOfObj(aa, map.tiles[i][i2][i3].texture);
        }
    });
    return JSON.stringify(map2);
}

function importMap(mapImport) {
    var map2 = JSON.parse(mapImport);
    doToRect(map2.tiles, 0, 0, 50, 50, function (e, i, i2) {
        for (var i3 = 0; e.length > i3; i3++) {
            if (e[i3].texture != false || e[i3].texture == 0) {
                map2.tiles[i][i2][i3].texture = aa[e[i3].texture];
            }
        }
    });
    return map2;
}