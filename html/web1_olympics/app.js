var imgs = [];
function loop() {

  if (Math.random() > 0.996) {
    imgs.push({
      elem: document.createElement("img"),
      x: -window.innerWidth * 0.16,
      y: Math.random() * 1000 + 1000,
      dx: Math.random() * 2 + 1
    });
    var latestimg = imgs[imgs.length - 1].elem;
    //latestimg.id = imgs.length - 1;
    if (Math.random() > 0.5) {
      latestimg.src = "thanos-car.jpg";
    } else {
      latestimg.src = "thanoslamp.jpg";
    }
    latestimg.style.zIndex = -9999;
    latestimg.style.position = "absolute";
    latestimg.style.filter = "saturate(0) brightness(0.5) drop-shadow(16px 16px 20px #000000)";
    latestimg.style.width = (Math.random() * 8 + 8) + "%";
    document.getElementsByTagName("body")[0].appendChild(latestimg);
  }

  for (var i = 0; imgs.length > i; i++) {
    imgs[i].x += imgs[i].dx;
    imgs[i].elem.style.left = imgs[i].x + "px";
    imgs[i].elem.style.top = imgs[i].y + "px";
    if (imgs[i].x > window.innerWidth * 1.16) {
      imgs[i].elem.parentNode.removeChild(imgs[i].elem)
      imgs.splice(i, 1);
    }
  }

  requestAnimationFrame(loop);
}

loop();
