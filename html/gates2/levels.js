var levels = [
    {
        load: function() {
            t.push(new TXT(950, 250, ["Right arrow to continue, left arrow to go back."]));

            t.push(new SlideshowTXT(950, 300, [
                ["Welcome to the I/O game!", 
                "Your goal is to convert inputs into the required outputs using logic gates."],
                ["To the left is the 'input' (in). It creates bits which travel through your gates.",
                "To the right is the 'output' (out). It needs certain bits to reach it."],
                ["Press the '1' key to select the 'not' gate.",
                "This should be selected by default. (in the top left corner)",
                "Click to place it wherever you want."],
                ["Unsatisfied with its location? Right click to delete it."],
                ["To connect gates, click the gate you want your signal to begin at. (in this case, the 'in' gate)",
                "Then, click the gate which you want your signal to end at. (your newly-created 'not' gate)",
                "You can cancel a connection by right-clicking."],
                ["These 'not' gates invert signals.",
                "In other words, they turn a '0' to a '1', and a '1' to a '0'.",
                "We can't see this yet since we haven't 'tested' the signal.",
                "Connect the 'not' gate to the output, then press 'T' to test the signal.",
                "The input will produce a '0' bit."]
            ]));

            o.push(new In(600, 550, function(a) {
                if (releaseBit && bitCounter == 0) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(false, this, a[i]));
                    }
                }
            }, ["Produces:", "0"]));

            o.push(new Out(1300, 550, function(a) {
                for (var i = 0; a.length > i; i++) {
                    if (!a[i].value) {
                        this.stored = [];
                    }
                }
                return clamp(a.length, 0, 1);
            }, ["Requires:", "1"]));
        }
    },
    {
        load: function() {
            t.push(new TXT(950, 250, ["Right arrow to continue, left arrow to go back."]));

            t.push(new SlideshowTXT(950, 300, [
                ["Now that you've mastered the 'not' gate, let's look at the 'or' gate.", 
                "Select the 'or' gate by pressing '2'. The 'or' gate will require two inputs."],
                ["The 'or' gate will always output a '1' unless both inputs are '0'",
                "In that case, it will output a '0'"],
                ["The inputs here will continuously loop through the numbers listed below them.",
                "The output requires the numbers in the order listed below it.",
                "Notice how when you look at the corresponding numbers in each list,",
                "the logic fits that of an 'or' gate."],
                ["The first number on the inputs is '0'. The output also has a '0'.",
                "For all the other inputs (where at least one of them is a '1'), the required output is '1'."],
                ["Try and set up a circuit which produces the desired output."]
            ]));

            
            o.push(new In(600, 450, function(a) {
                var seq = [false, false, true, true];

                if (releaseBit && bitCounter < 4) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(seq[bitCounter], this, a[i]));
                    }
                }
            }, ["Produces:", "0, 0, 1, 1"]));

            o.push(new In(600, 650, function(a) {
                var seq = [false, true, false, true];

                if (releaseBit && bitCounter < 4) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(seq[bitCounter], this, a[i]));
                    }
                }
            }, ["Produces:", "0, 1, 0, 1"]));

            o.push(new Out(1300, 550, function(a) {
                var seq = [false, true, true, true];
                if (a.length > 4) {
                    a.pop();
                }
                for (var i = 0; a.length > i; i++) {
                    if (a[i].value != seq[i]) {
                        this.stored = [];
                    }
                }
                return clamp(a.length / 4, 0, 1);
            }, ["Requires:", "0, 1, 1, 1"]));
        }
    },
    {
        load: function() {
            t.push(new TXT(950, 250, ["Right arrow to continue, left arrow to go back."]));

            t.push(new SlideshowTXT(950, 300, [
                ["You may have noticed the third type of gate, the 'and' gate.", 
                "The 'and' gate only returns a '1' if both inputs are '1'.",
                "Otherwise it just returns a '0'."],
                ["I think you know what to do."]
            ]));

            
            o.push(new In(600, 450, function(a) {
                var seq = [false, false, true, true];
                
                if (releaseBit && bitCounter < 4) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(seq[bitCounter], this, a[i]));
                    }
                }
            }, ["Produces:", "0, 0, 1, 1"]));

            o.push(new In(600, 650, function(a) {
                var seq = [false, true, false, true];

                if (releaseBit && bitCounter < 4) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(seq[bitCounter], this, a[i]));
                    }
                }
            }, ["Produces:", "0, 1, 0, 1"]));

            o.push(new Out(1300, 550, function(a) {
                var seq = [false, false, false, true];
                if (a.length > 4) {
                    a.pop();
                }
                for (var i = 0; a.length > i; i++) {
                    if (a[i].value != seq[i]) {
                        this.stored = [];
                    }
                }
                return clamp(a.length / 4, 0, 1);
            }, ["Requires:", "0, 0, 0, 1"]));
        }
    },
    {
        load: function() {
            t.push(new TXT(950, 250, ["Right arrow to continue, left arrow to go back."]));

            t.push(new SlideshowTXT(950, 300, [
                ["Sometimes you need more than one logic gate..."],
                ["Hint: Notice how the output looks like the reverse of the 'or' gate from level 2?",
                "You might need to apply this kind of thinking to later levels."]
            ]));

            
            o.push(new In(600, 450, function(a) {
                var seq = [false, false, true, true];
                
                if (releaseBit && bitCounter < 4) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(seq[bitCounter], this, a[i]));
                    }
                }
            }, ["Produces:", "0, 0, 1, 1"]));

            o.push(new In(600, 650, function(a) {
                var seq = [false, true, false, true];

                if (releaseBit && bitCounter < 4) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(seq[bitCounter], this, a[i]));
                    }
                }
            }, ["Produces:", "0, 1, 0, 1"]));

            o.push(new Out(1300, 550, function(a) {
                var seq = [true, false, false, false];
                if (a.length > 4) {
                    a.pop();
                }
                for (var i = 0; a.length > i; i++) {
                    if (a[i].value != seq[i]) {
                        this.stored = [];
                    }
                }
                return clamp(a.length / 4, 0, 1);
            }, ["Requires:", "1, 0, 0, 0"]));
        }
    },
    {
        load: function() {
            o.push(new In(600, 450, function(a) {
                var seq = [false, false, true, true];
                
                if (releaseBit && bitCounter < 4) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(seq[bitCounter], this, a[i]));
                    }
                }
            }, ["Produces:", "0, 0, 1, 1"]));

            o.push(new In(600, 650, function(a) {
                var seq = [false, true, false, true];

                if (releaseBit && bitCounter < 4) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(seq[bitCounter], this, a[i]));
                    }
                }
            }, ["Produces:", "0, 1, 0, 1"]));

            o.push(new Out(1300, 550, function(a) {
                var seq = [true, true, true, false];
                if (a.length > 4) {
                    a.pop();
                }
                for (var i = 0; a.length > i; i++) {
                    if (a[i].value != seq[i]) {
                        this.stored = [];
                    }
                }
                return clamp(a.length / 4, 0, 1);
            }, ["Requires:", "1, 1, 1, 0"]));
        }
    },
    {
        load: function() {
            t.push(new TXT(950, 250, ["Right arrow to continue, left arrow to go back."]));

            t.push(new SlideshowTXT(950, 300, [
                ["This one requires a minimum of four gates.",
                "For a hint, press the right arrow."],
                ["Hint: This appears to be an 'or' gate, but not an 'and' gate...",
                "At the same time..."]
            ]));

            o.push(new In(600, 450, function(a) {
                var seq = [false, false, true, true];
                
                if (releaseBit && bitCounter < 4) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(seq[bitCounter], this, a[i]));
                    }
                }
            }, ["Produces:", "0, 0, 1, 1"]));

            o.push(new In(600, 650, function(a) {
                var seq = [false, true, false, true];

                if (releaseBit && bitCounter < 4) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(seq[bitCounter], this, a[i]));
                    }
                }
            }, ["Produces:", "0, 1, 0, 1"]));

            o.push(new Out(1300, 550, function(a) {
                var seq = [false, true, true, false];
                if (a.length > 4) {
                    a.pop();
                }
                for (var i = 0; a.length > i; i++) {
                    if (a[i].value != seq[i]) {
                        this.stored = [];
                    }
                }
                return clamp(a.length / 4, 0, 1);
            }, ["Requires:", "0, 1, 1, 0"]));
        }
    },
    {
        load: function() {
            o.push(new In(600, 450, function(a) {
                var seq = [false, false, true, true];
                
                if (releaseBit && bitCounter < 4) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(seq[bitCounter], this, a[i]));
                    }
                }
            }, ["Produces:", "0, 0, 1, 1"]));

            o.push(new In(600, 650, function(a) {
                var seq = [false, true, false, true];
                
                if (releaseBit && bitCounter < 4) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(seq[bitCounter], this, a[i]));
                    }
                }
            }, ["Produces:", "0, 1, 0, 1"]));

            o.push(new Out(1300, 550, function(a) {
                var seq = [true, false, false, true];
                if (a.length > 4) {
                    a.pop();
                }
                for (var i = 0; a.length > i; i++) {
                    if (a[i].value != seq[i]) {
                        this.stored = [];
                    }
                }
                return clamp(a.length / 4, 0, 1);
            }, ["Requires:", "1, 0, 0, 1"]));
        }
    },
    {
        load: function() {
            // t.push(new TXT(950, 250, ["Right arrow to continue, left arrow to go back."]));

            // t.push(new SlideshowTXT(950, 300, [
            //     ["This one requires a minimum of four gates.",
            //     "For a hint, press the right arrow."],
            //     ["Hint: This appears to be an 'or' gate, but not an 'and' gate."]
            // ]));

            o.push(new In(600, 250, function(a) {
                var seq = [];

                for (var i = 0; 8 > i; i++) {
                    if (i % 2 == 0) {
                        seq.push(false);
                    } else {
                        seq.push(true);
                    }
                }
                
                if (releaseBit && bitCounter < 16) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(seq[bitCounter], this, a[i]));
                    }
                }
            }, ["Produces:", "0, 1, 0, 1, 0, 1, 0, 1"]));

            o.push(new In(600, 450, function(a) {
                var seq = [];

                for (var i = 0; 4 > i; i++) {
                    if (i % 2 == 0) {
                        for (var i2 = 0; 2 > i2; i2++) {
                            seq.push(false);
                        }
                    } else {
                        for (var i2 = 0; 2 > i2; i2++) {
                            seq.push(true);
                        }
                    }
                }
                
                if (releaseBit && bitCounter < 16) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(seq[bitCounter], this, a[i]));
                    }
                }
            }, ["Produces:", "0, 0, 1, 1, 0, 0, 1, 1"]));

            o.push(new In(600, 650, function(a) {
                var seq = [];
                
                for (var i = 0; 2 > i; i++) {
                    if (i % 2 == 0) {
                        for (var i2 = 0; 4 > i2; i2++) {
                            seq.push(false);
                        }
                    } else {
                        for (var i2 = 0; 4 > i2; i2++) {
                            seq.push(true);
                        }
                    }
                }
                
                if (releaseBit && bitCounter < 16) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(seq[bitCounter], this, a[i]));
                    }
                }
            }, ["Produces:", "0, 0, 0, 0, 1, 1, 1, 1"]));

            o.push(new Out(1300, 550, function(a) {
                var seq = [];

                for (var i = 0; 16 > i; i++) {
                    seq.push(false);
                }

                seq[6] = true;

                seq[12] = true;

                if (a.length > 16) {
                    a.pop();
                }
                for (var i = 0; a.length > i; i++) {
                    if (a[i].value != seq[i]) {
                        this.stored = [];
                    }
                }
                return clamp(a.length / 16, 0, 1);
            }, ["Requires:", "0, 0, 0, 0, 0, 1, 0, 0"]));
        }
    },
    {
        load: function() {
            // t.push(new TXT(950, 250, ["Right arrow to continue, left arrow to go back."]));

            // t.push(new SlideshowTXT(950, 300, [
            //     ["This one requires a minimum of four gates.",
            //     "For a hint, press the right arrow."],
            //     ["Hint: This appears to be an 'or' gate, but not an 'and' gate."]
            // ]));

            o.push(new In(600, 250, function(a) {
                var seq = [];

                for (var i = 0; 16 > i; i++) {
                    if (i % 2 == 0) {
                        seq.push(false);
                    } else {
                        seq.push(true);
                    }
                }
                
                if (releaseBit && bitCounter < 16) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(seq[bitCounter], this, a[i]));
                    }
                }
            }, ["Produces:", "0, 1, 0, 1, 0, 1, 0, 1", "0, 1, 0, 1, 0, 1, 0, 1"]));

            o.push(new In(600, 450, function(a) {
                var seq = [];

                for (var i = 0; 8 > i; i++) {
                    if (i % 2 == 0) {
                        for (var i2 = 0; 2 > i2; i2++) {
                            seq.push(false);
                        }
                    } else {
                        for (var i2 = 0; 2 > i2; i2++) {
                            seq.push(true);
                        }
                    }
                }
                
                if (releaseBit && bitCounter < 16) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(seq[bitCounter], this, a[i]));
                    }
                }
            }, ["Produces:", "0, 0, 1, 1, 0, 0, 1, 1", "0, 0, 1, 1, 0, 0, 1, 1"]));

            o.push(new In(600, 650, function(a) {
                var seq = [];
                
                for (var i = 0; 4 > i; i++) {
                    if (i % 2 == 0) {
                        for (var i2 = 0; 4 > i2; i2++) {
                            seq.push(false);
                        }
                    } else {
                        for (var i2 = 0; 4 > i2; i2++) {
                            seq.push(true);
                        }
                    }
                }
                
                if (releaseBit && bitCounter < 16) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(seq[bitCounter], this, a[i]));
                    }
                }
            }, ["Produces:", "0, 0, 0, 0, 1, 1, 1, 1", "0, 0, 0, 0, 1, 1, 1, 1"]));

            o.push(new In(600, 850, function(a) {
                var seq = [];
                
                for (var i = 0; 2 > i; i++) {
                    if (i % 2 == 0) {
                        for (var i2 = 0; 8 > i2; i2++) {
                            seq.push(false);
                        }
                    } else {
                        for (var i2 = 0; 8 > i2; i2++) {
                            seq.push(true);
                        }
                    }
                }
                
                if (releaseBit && bitCounter < 16) {
                    for (var i = 0; a.length > i; i++) {
                        b.push(new Bit(seq[bitCounter], this, a[i]));
                    }
                }
            }, ["Produces:", "0, 0, 0, 0, 0, 0, 0, 0", "1, 1, 1, 1, 1, 1, 1, 1"]));

            o.push(new Out(1300, 550, function(a) {
                var seq = [];

                for (var i = 0; 16 > i; i++) {
                    seq.push(false);
                }

                seq[6] = true;

                seq[12] = true;

                if (a.length > 16) {
                    a.pop();
                }
                for (var i = 0; a.length > i; i++) {
                    if (a[i].value != seq[i]) {
                        this.stored = [];
                    }
                }
                return clamp(a.length / 16, 0, 1);
            }, ["Requires:", "0, 0, 0, 0, 0, 0, 1, 0", "0, 0, 0, 0, 1, 0, 0, 0"]));
        }
    }
]