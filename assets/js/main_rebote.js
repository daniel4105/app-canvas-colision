document.addEventListener("DOMContentLoaded", () => {
const canvas = document.getElementById("canvasBounce");
let ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 300;
canvas.style.background = "#faf5ff";

class Circle{
    constructor(x,y,r){
        this.posX = x;
        this.posY = y;
        this.radius = r;
        this.dx = Math.random()*4-2;
        this.dy = Math.random()*4-2;
        this.color = "#7c3aed";
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.posX,this.posY,this.radius,0,Math.PI*2);
        ctx.fill();
    }

    move(){
        if (this.posX + this.radius > 300 || this.posX - this.radius < 0) this.dx *= -1;
        if (this.posY + this.radius > 300 || this.posY - this.radius < 0) this.dy *= -1;

        this.posX += this.dx;
        this.posY += this.dy;
    }
}

let circles = [];

for(let i=0;i<8;i++){
    circles.push(new Circle(Math.random()*300,Math.random()*300,12));
}

function bounce(){

    for(let i=0;i<circles.length;i++){
        for(let j=i+1;j<circles.length;j++){

            let c1 = circles[i];
            let c2 = circles[j];

            let dx = c2.posX - c1.posX;
            let dy = c2.posY - c1.posY;

            let dist = Math.sqrt(dx*dx+dy*dy);

            if(dist < c1.radius + c2.radius){

                c1.color = "#f97316";
                c2.color = "#f97316";

                let tempX = c1.dx;
                let tempY = c1.dy;

                c1.dx = c2.dx;
                c1.dy = c2.dy;

                c2.dx = tempX;
                c2.dy = tempY;
            }
        }
    }
}

function animate(){
    ctx.clearRect(0,0,300,300);

    circles.forEach(c => {
        c.move();
        c.color = "#7c3aed";
    });

    bounce();

    circles.forEach(c => c.draw());

    requestAnimationFrame(animate);
}

animate();

});