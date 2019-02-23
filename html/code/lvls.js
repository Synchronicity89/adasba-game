var lvls = [
    {
        p: {
            x: 16,
            y: 16
        },
        goal: function() {
            if (p.x == 12 && p.y == 12) {
                return true;
            }
            return false;
        },
        tiles: [
            { x: 16, y: 16, type: "default" },
            { x: 15, y: 16, type: "default" },
            { x: 14, y: 16, type: "default" },
            { x: 13, y: 16, type: "default" },
            { x: 12, y: 16, type: "default" },
            { x: 12, y: 15, type: "default" },
            { x: 12, y: 14, type: "default" },
            { x: 12, y: 13, type: "default" },
            { x: 12, y: 12, type: "end" }
        ]
    }
];