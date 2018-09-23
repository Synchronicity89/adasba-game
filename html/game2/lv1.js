var lv1 = {
    f: [
        {
            start: 0,
            end: 0,
            f: function() {
                o.push(new MsgBox(20, 20, [
                    "Hello.",
                    "I am the artificial intelligence on board your spacecraft.",
                    "My SSDs have been wiped. Location is currently unknown.",
                    "Scans of your biological systems indicate the presence of an amnestic agent.",
                    "Your memory appears compromised.",
                    "Press [ENTER] to continue."
                ], 1));
            } 
        },
        {
            start: 1,
            end: 1,
            f: function() {
                if (kD[13] != true) {
                    lc--;
                }
            }
        },
        {
            start: 2,
            end: 2,
            f: function() {
                o.push(new MsgBox(20, 20, [
                    "It is fortunate, however, that I have been hard coded with instructions on the operation of this spacecraft.",
                    "[WASD] will allow movement in the orthogonal directions.",
                    "[LEFT MOUSE BUTTON] will create a projectile.",
                    "Press [ENTER] to continue."
                ], 3));
            } 
        },
        {
            start: 3,
            end: 3,
            f: function() {
                if (kD[13] != true) {
                    lc--;
                }
            }
        },
        {
            start: 4,
            end: 4,
            f: function() {
                o.push(new MsgBox(20, 20, [
                    "{NOTICE} AI DEDUCTION MODULE IS NOW ONLINE.",
                    "You have been given an amnestic agent, and my memory has been wiped.",
                    "There is an approximately 98% certainty that this was done deliberately.",
                    "The chance that these two events would coincide is near zero.",
                    "{WARNING} FIVE UNIDENTIFIED OBJECTS DETECTED",
                    "Press [ENTER] to continue."
                ], 5));
            } 
        },
        {
            start: 5,
            end: 5,
            f: function() {
                if (kD[13] != true) {
                    lc--;
                }
            }
        },
        {
            start: 50,
            end: 50,
            f: function() {
                for (var i = 0; 5 > i; i++) {
                    o.push(new Enemy(1920, 108 + i * 216, 0, 0, new BasicEnemy()));
                }
            }
        },
        {
            start: 51,
            end: 51,
            f: function() {
                if (enemies()) {
                    lc--;
                } else {
                    console.log("a");
                }
            }
        },
        {
            start: 52,
            end: 52,
            f: function() {
                o.push(new MsgBox(20, 20, [
                    "You have successfully destroyed all nearby unidentified objects.",
                    "They appeared to be unmanned drones.",
                    "{WARNING} LONG RANGE SCANNERS HAVE DETECTED HOSTILE ENTITIES.",
                    "These ones appear to possess similar projectile technology to our own. Be careful."
                ], 53));
            } 
        },
        {
            start: 53,
            end: 53,
            f: function() {
                if (kD[13] != true) {
                    lc--;
                }
            }
        },
        {
            start: 54,
            end: 400,
            f: function() {
                if (lc % 150 == 0) {
                    o.push(new Enemy(500, 500, 0, 0, new ProjectileEnemy()))
                }
            }
        },
        {
            start: 401,
            end: 401,
            f: function() {
                if (enemies()) {
                    lc--;
                } else {
                    console.log("a");
                }
            }
        },
        {
            start: 402,
            end: 402,
            f: function() {
                o.push(new MsgBox(20, 20, [
                    "All enemies have been destroyed. No more appear to be-",
                    "{NOTICE} Incoming transmission.",
                    "{MESSAGE} This is an automated transmission: Sensors detect you have destroyed our security drones.",
                    "{MESSAGE} Surrender, or a fleet of spacecraft will be sent to intercept your location, with the intent of your destruction.",
                    "Our methods of escape are limited. The FTL drive appears to be damaged.",
                    "The only option we have is to find one."
                ], 403));
            } 
        },
        {
            start: 403,
            end: 403,
            f: function() {
                if (kD[13] != true) {
                    lc--;
                }
            }
        },
        {
            start: 404,
            end: 404,
            f: function() {
                o.push(new MsgBox(20, 20, [
                    "I can perform a scan for FTL-capable craft in the general area.",
                    "However, the other spacecraft will reach us before I am done.",
                    "You will have to hold them off in the mean time.",
                    "Some are already within sensor range."
                ], 405));
            } 
        },
        {
            start: 405,
            end: 405,
            f: function() {
                if (kD[13] != true) {
                    lc--;
                }
            }
        },
        {
            start: 450,
            end: 450,
            f: function() {
                for (var i = 0; 10 > i; i++) {
                    o.push(new Enemy(1920, 54 + i * 108, 0, 0, new BasicEnemy()));
                }
            }
        }
    ]
};