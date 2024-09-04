const gameCanvas = document.getElementById("game-canvas");
gameCanvas.width = 810; 
gameCanvas.height = 560; 

const c = gameCanvas.getContext("2d");

let keyboardActions = {

};

window.addEventListener("click", function(){
    playerShape();
});

function playerShape() {
    let x = 200;
    let y = 400;
    let dx = 10;
    let dy = 10;
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