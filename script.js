const gameCanvas = document.getElementById("game-canvas");
gameCanvas.width = 810; 
gameCanvas.height = 560; 

const c = gameCanvas.getContext("2d");

let levelSpeed = 5;
let astroidCount = 0;

const playerXMovement = 2;
const playerYMovement = 2;

// functions to draw both shapes initially
// functions to update and apply movement to both shapes

let playerShape = {
    x: 200, 
    y: 400,
    dx: playerXMovement,
    dy: playerYMovement,
    radius: 56
};

let astroidShape = {
    x: Math.floor(Math.random() * gameCanvas.width),
    y: Math.floor(Math.random() * gameCanvas.height),
    dx: levelSpeed,
    dy: levelSpeed,
    radius: 48
};

const astroidArray = [];


window.addEventListener("click", function(){

    function drawPlayer() {
        c.fillStyle = "black";
        c.fillRect(playerShape.x, playerShape.y, playerShape.radius, playerShape.radius);
    };
    
    function drawAstroid() {
        c.fillStyle = "red";
        c.fillRect(astroidShape.x, astroidShape.y, astroidShape.radius, astroidShape.radius);
    };
    
    function playerUpdate() {
        playerShape.x += playerShape.dx;
        playerShape.y += playerShape.dy;
    }
    
    function astroidUpdate() {
        astroidShape.x += astroidShape.dx;
        astroidShape.y += astroidShape.dy;
    }
    
    function animate() {
        requestAnimationFrame(animate) 
        c.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        drawPlayer();
        drawAstroid();
        playerUpdate();
        astroidUpdate();
    };

    window.addEventListener("keydown", function(event){
        if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
            playerShape.y = -playerYMovement
            console.log(playerShape.y)
        } else if (event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
            playerShape.y = playerYMovement
        } else if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
            playerShape.x = -playerXMovement
        } else if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
            playerShape.x = playerXMovement
        }
    });

    animate();

});

console.log(playerShape.x, playerShape.y)
console.log(astroidShape.x, astroidShape.y)