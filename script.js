const gameCanvas = document.getElementById("game-canvas");
gameCanvas.width = 810; 
gameCanvas.height = 560; 

const c = gameCanvas.getContext("2d");

let levelSpeed = 4;
let astroidCount = 0;

const playerXMovement = 25;
const playerYMovement = 25;

let astroidArray = [];

function createAstroid() {
    return {
        x: 800,
        y: Math.floor(Math.random() * gameCanvas.height),
        dx: levelSpeed,
        dy: levelSpeed,
        radius: 48
    }
}

for (let i = 0; i < 5; i++) {
    astroidArray.push(createAstroid());
}

let playerShape = {
    x: 200, 
    y: 400,
    dx: 0,
    dy: 0,
    radius: 56
};

window.addEventListener("click", function(){

    function drawPlayer() {
        c.fillStyle = "black";
        c.fillRect(playerShape.x, playerShape.y, playerShape.radius, playerShape.radius);
    };
    
    function drawAstroid() {
        c.fillStyle = "red";
        astroidArray.forEach(function(astroid){
            c.fillRect(astroid.x, astroid.y, astroid.radius, astroid.radius);
        });
    };
    
    function playerUpdate() {
        playerShape.x += playerShape.dx;
        playerShape.y += playerShape.dy;
    }
    
    function astroidUpdate() {
        astroidArray.forEach(function(astroid){
            astroid.x -= astroid.dx;

            if (astroid.x + astroid.radius < 0) { 
                astroid.x = gameCanvas.width;  
                astroid.y = Math.floor(Math.random() * gameCanvas.height);  
            };
        });
    };
    
    function animate() {
        requestAnimationFrame(animate) 
        c.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

        playerUpdate();
        drawPlayer();

        astroidUpdate();
        drawAstroid();
    };

    window.addEventListener("keydown", function(event){
        if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
            playerShape.y -= playerYMovement; 
            console.log(playerShape.y)
        } else if (event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
            playerShape.y += playerYMovement;
        } else if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
            playerShape.x -= playerXMovement
        } else if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
            playerShape.x += playerXMovement
        }
    });

    animate();

});

console.log(astroidArray)