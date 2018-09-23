    //render menu background
    // for (var i = 0; bg.length > i; i++) {
    //     mBrots[i] = mandelbrotRect(bg[i].mx * (2 - (Math.abs(c.width / 2 - bg[i].x) / (c.width / 2)) * 2), bg[i].my * (2 - (Math.abs(c.width / 2 - bg[i].x) / (c.width / 2)) * 2), 0, 0, 16, 1, 1)[0][0].path;
    //     bg[i].x -= 5 / bg[i].parallax;

    //     if (bg[i].x < 0) {
    //         bg[i].x = 1920;
    //     }

    //     ctx.save();

    //     if (mBrots2[i] != undefined) {
    //         for (var i2 = 1; mBrots[i].length > i2 && mBrots2[i].length > i2; i2++) {
    //             //console.log("a")
    //             if (pyth(mBrots[i][i2].x, mBrots[i][i2].y, mBrots2[i][i2].x, mBrots2[i][i2].y) < 1 / 10) {
    //                 ctx.strokeStyle = "hsla(0, 0%, 100%, " + (1 - pyth(mBrots[i][i2].x, mBrots[i][i2].y, mBrots2[i][i2].x, mBrots2[i][i2].y) * 10) / 4 + ")";
    //                 ctx.beginPath();
    //                 ctx.moveTo(mBrots2[i][i2].x * (5000 / bg[i].parallax) + bg[i].x, mBrots2[i][i2].y * (5000 / bg[i].parallax) + bg[i].y);
    //                 ctx.lineTo(mBrots[i][i2].x * (5000 / bg[i].parallax) + bg[i].x, mBrots[i][i2].y * (5000 / bg[i].parallax) + bg[i].y);
    //                 ctx.stroke();
                    
    //                 if (mBrots[i].length - 1 > i2 && mBrots2[i].length - 1 > i2 && pyth(mBrots2[i][i2].x, mBrots2[i][i2].y, mBrots2[i][i2 + 1].x, mBrots2[i][i2 + 1].y) < 1 / 2) {
    //                     ctx.strokeStyle = "hsla(0, 0%, 100%, " + (1 - pyth(mBrots2[i][i2].x, mBrots2[i][i2].y, mBrots2[i][i2 + 1].x, mBrots2[i][i2 + 1].y) * 2) / 25 + ")";
    //                     ctx.beginPath();
    //                     ctx.moveTo(mBrots2[i][i2].x * (5000 / bg[i].parallax) + bg[i].x, mBrots2[i][i2].y * (5000 / bg[i].parallax) + bg[i].y);
    //                     ctx.lineTo(mBrots[i][i2 + 1].x * (5000 / bg[i].parallax) + bg[i].x, mBrots[i][i2 + 1].y * (5000 / bg[i].parallax) + bg[i].y);
    //                     ctx.stroke();
    //                 }
    //             }
    //         }
    //     }


    //     mBrots2[i] = mBrots[i];

    //     bg[i].mdx += Math.cos(Math.atan2(bg[i].my, bg[i].mx) - Math.PI * 0.5) / 500000;
    //     bg[i].mdy += Math.sin(Math.atan2(bg[i].my, bg[i].mx) - Math.PI * 0.5) / 500000;
    //     if (pyth(bg[i].my, bg[i].mx) > 0.9) {
    //         bg[i].mdx -= Math.cos(Math.atan2(bg[i].my, bg[i].mx)) / 12500;
    //         bg[i].mdy -= Math.sin(Math.atan2(bg[i].my, bg[i].mx)) / 12500;
    //     }
    //     if (pyth(bg[i].my, bg[i].mx) < 0.3 || 
    //     pyth(mBrots[i][mBrots[i].length - 2].x, mBrots[i][mBrots[i].length - 2].y, mBrots[i][mBrots[i].length - 1].x, mBrots[i][mBrots[i].length - 1].y) < 0.01) {
    //         bg[i].mdx += Math.cos(Math.atan2(bg[i].my, bg[i].mx)) / 12500;
    //         bg[i].mdy += Math.sin(Math.atan2(bg[i].my, bg[i].mx)) / 12500;
    //     }
    //     if (mBrots[i].length < 16) {
    //         bg[i].mdx -= Math.cos(Math.atan2(bg[i].my, bg[i].mx)) / 12500;
    //         bg[i].mdy -= Math.sin(Math.atan2(bg[i].my, bg[i].mx)) / 12500;
    //     }
    //     bg[i].mdx *= 0.99;
    //     bg[i].mdy *= 0.99;
    //     bg[i].mx += bg[i].mdx;
    //     bg[i].my += bg[i].mdy;
    // }
    // ri++;