var c = document.getElementById("canvas-club");
var ctx = c.getContext("2d");
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var clearColor = '#252A34';
var maxDrops = 30;
var drops = [];

var image = new Image();
image.src = "https://www.sancristobal.gob.mx/wp-content/uploads/2022/09/covid19-principal-200x200.png";

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function Drop() {
    this.x = random(0, w);
    this.y = random(-h, -10);
    this.rotation = random(0, 360);
    this.speed = random(2, 5);
    this.size = random(20, 100);
}

Drop.prototype.update = function() {
    this.y += this.speed;

    if (this.y > h) {
        this.y = random(-h, -10);
        this.x = random(0, w);
        this.rotation = random(0, 360);
        this.speed = random(2, 5);
        this.size = random(20, 100);
    }
};

Drop.prototype.draw = function() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((Math.PI / 180) * this.rotation);
    ctx.drawImage(image, -this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
};

function setup() {
    for (var i = 0; i < maxDrops; i++) {
        drops.push(new Drop());
    }
}

function anim() {
    ctx.fillStyle = clearColor;
    ctx.fillRect(0, 0, w, h);

    for (var i = 0; i < maxDrops; i++) {
        drops[i].update();
        drops[i].draw();
    }

    requestAnimationFrame(anim);
}

window.addEventListener("resize", function() {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
});

image.addEventListener("load", function() {
    setup();
    anim();
});

image.addEventListener("error", function() {
    console.log("Error loading the image.");
});