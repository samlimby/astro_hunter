const gameCanvas = document.getElementById("game-canvas");
gameCanvas.width = 1200; // Set canvas width
gameCanvas.height = 560; // Set canvas height

const c = gameCanvas.getContext("2d");

window.addEventListener("click", function(){
    playerShape();
});

function playerShape() {
    let x = 200;
    let y = 400;
    let dx = 1;
    let dy = 1;
    function draw() {
        c.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        c.fillStyle = "black";
        c.fillRect(x, y, 56, 56);
    };

    window.addEventListener("keyup", function(){
        console.log("event pressed");
        x += dx;
        draw();
    })
    window.addEventListener("keydown", function(){
        x += -dy;
        draw();
    })

    draw();
};