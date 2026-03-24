document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("canvasMove");
    let ctx = canvas.getContext("2d");

    canvas.width = 300;
    canvas.height = 300;
    canvas.style.background = "#e0f2fe";

    const range = document.getElementById("rangeCircles");
    const input = document.getElementById("inputCircles");
    const label = document.getElementById("valueCircles");

    class Circle {
        constructor(x, y, r) {
            this.posX = x;
            this.posY = y;
            this.radius = r;
            this.dx = Math.random() * 4 - 2;
            this.dy = Math.random() * 4 - 2;
        }

        draw() {
            ctx.beginPath();
            ctx.fillStyle = "#2563eb";
            ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        update() {
            if (this.posX + this.radius > 300 || this.posX - this.radius < 0) this.dx *= -1;
            if (this.posY + this.radius > 300 || this.posY - this.radius < 0) this.dy *= -1;

            this.posX += this.dx;
            this.posY += this.dy;

            this.draw();
        }
    }

    let circles = [];

    function createCircles(n) {
        circles = [];

        for (let i = 0; i < n; i++) {
            circles.push(new Circle(
                Math.random() * (300 - 24) + 12,
                Math.random() * (300 - 24) + 12,
                12
            ));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, 300, 300);
        circles.forEach(c => c.update());
        requestAnimationFrame(animate);
    }

    function updateValue(val) {
        val = parseInt(val);

        label.textContent = val;
        range.value = val;
        input.value = val;

        createCircles(val);
    }

    range.addEventListener("input", e => {
        updateValue(parseInt(e.target.value));
    });

    input.addEventListener("input", e => {
        let val = Math.max(1, Math.min(30, parseInt(e.target.value)));
        updateValue(val);
    });

    updateValue(8);
    animate();

});