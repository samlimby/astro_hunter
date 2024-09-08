const gameCanvas = document.getElementById("game-canvas");
gameCanvas.width = 810; 
gameCanvas.height = 560; 

const c = gameCanvas.getContext("2d");

let levelSpeed = 4;
let astroidCount = 0;
let gameScore = 0;
let activeGame = false;

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

let playerShape = {
    x: 200, 
    y: 400,
    dx: 0,
    dy: 0,
    radius: 56
};

// Define game states
const GAME_STATES = {
    DEFAULT: 'default',
    GAME: 'game'
};

let currentGameState = GAME_STATES.DEFAULT; // Start with the default state

// Game Loop: Manage which level to draw
function gameLoop() {
    c.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    switch (currentGameState) {
        case GAME_STATES.DEFAULT:
            drawDefault();
            break;
        case GAME_STATES.GAME:
            gameUpdate();
            drawGame();
            break;
    }

    requestAnimationFrame(gameLoop);
}

// Default Level: Display Menu
function drawDefault() {
    c.font = "30px Arial";
    c.fillStyle = "black";
    c.fillText("Main Menu", gameCanvas.width / 2 - 100, gameCanvas.height / 2 - 60);
    c.fillText("Click to Start Game", gameCanvas.width / 2 - 150, gameCanvas.height / 2);
}

// Game Level: Initialize and Draw
function initializeGame() {
    activeGame = true;
    gameScore = 0; 
    astroidArray = []; 

    for (let i = 0; i < 5; i++) {
        astroidArray.push(createAstroid());
    }

    playerShape.x = 200;
    playerShape.y = 400;
}

function gameCounter() {
    c.font = "20px Departure Mono";
    c.fillStyle = "dark grey";
    c.fillText(`Score: ${gameScore}`, 660, 40);
    if (activeGame) {
        gameScore++;
    }
}

// Draw Player and Asteroids
function drawPlayer() {
    c.fillStyle = "black";
    c.fillRect(playerShape.x, playerShape.y, playerShape.radius, playerShape.radius);
}

function drawAstroid() {
    c.fillStyle = "grey";
    astroidArray.forEach(function(astroid) {
        c.fillRect(astroid.x, astroid.y, astroid.radius, astroid.radius);
    });
}

function playerUpdate() {
    playerShape.x += playerShape.dx;
    playerShape.y += playerShape.dy;
}

function astroidUpdate() {
    astroidArray.forEach(function(astroid) {
        astroid.x -= astroid.dx;

        if (astroid.x + astroid.radius < 0) { 
            astroid.x = gameCanvas.width;  
            astroid.y = Math.floor(Math.random() * gameCanvas.height);  
        }
    });
}

function shapeCollision() {
    astroidArray.forEach(function(astroid) {
        if (isRectCollision(playerShape, astroid)) {
            resetGame();
        }
    });
}

// Collision Detection
function isRectCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.radius &&
        rect1.x + rect1.radius > rect2.x &&
        rect1.y < rect2.y + rect2.radius &&
        rect1.y + rect1.radius > rect2.y
    );
}

// Game Update: Runs for the Game State
function gameUpdate() {
    gameCounter();
    playerUpdate();
    astroidUpdate();
    shapeCollision();
}

// Draw Game: Renders Player and Asteroids
function drawGame() {
    drawPlayer();
    drawAstroid();
}

// Reset Game: Resets all game variables
function resetGame() {
    activeGame = false;
    currentGameState = GAME_STATES.DEFAULT; // Go back to the default state
}

// Handle User Input for Game
window.addEventListener("keydown", function(event) {
    if (currentGameState === GAME_STATES.GAME) {
        if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
            playerShape.y -= playerYMovement; 
        } else if (event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
            playerShape.y += playerYMovement;
        } else if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
            playerShape.x -= playerXMovement;
        } else if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
            playerShape.x += playerXMovement;
        }
    }
});

// Handle Click to Start Game
window.addEventListener("click", function() {
    if (currentGameState === GAME_STATES.DEFAULT) {
        currentGameState = GAME_STATES.GAME; // Switch to game state
        initializeGame(); // Initialize game variables and settings
    }
});

// Start the game loop
gameLoop();
