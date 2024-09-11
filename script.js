const gameCanvas = document.getElementById("game-canvas");
const scoreZone = document.getElementById("score_zone")
const scoreSection = document.getElementById("score_text-section");
let scoreText = document.getElementById("score-text");


const date = new Date();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

gameCanvas.width = 810; 
gameCanvas.height = 560; 

const c = gameCanvas.getContext("2d");

let levelSpeed = 4 * 1.5;
let astroidCount = 0;
let gameScore = 0;
let activeGame = false;

let priorScore = [];
let scoreLog = [];

scoreSection.innerHTML = `
    ${scoreText.innerHTML = localStorage.getItem("priorScore")}
`;


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

const GAME_STATES = {
    DEFAULT: 'default',
    GAME: 'game'
};

let currentGameState = GAME_STATES.DEFAULT;

// Initial button properties
const buttonX = 810 / 2 - 80; 
const buttonY = 560 / 2 - 24; 
const buttonWidth = 160;
const buttonHeight = 48;

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

function drawDefault() {
    // Draw button rectangle
    c.fillStyle = '#444444';
    c.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

    // Draw button text
    c.fillStyle = 'white';
    c.font = '20px Departure Mono';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText('Start Game', buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
}

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
    c.fillText(`Score: ${gameScore}`, 720, 40);
    if (activeGame) {
        gameScore++;
    }
}

function storeScore() {
    scoreLog.push(gameScore);
    renderScore();
}

function renderScore() {
    let newScore = document.createElement("p");
    newScore.classList.add("score_text");
    newScore.innerHTML = `${gameScore} - ${date.toDateString()} / ${hours}:${minutes}:${seconds}`
    scoreSection.appendChild(newScore);
    priorScore.push(newScore);
    localStorage.setItem("priorScore", newScore.innerHTML);
    newScore.innerHTML = localStorage.getItem("priorScore");
    console.log(localStorage.getItem("priorScore"));
}

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
            storeScore();
            resetGame();
        }
    });
}

function isRectCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.radius &&
        rect1.x + rect1.radius > rect2.x &&
        rect1.y < rect2.y + rect2.radius &&
        rect1.y + rect1.radius > rect2.y
    );
}

function gameUpdate() {
    gameCounter();
    playerUpdate();
    astroidUpdate();
    shapeCollision();
}

function drawGame() {
    drawPlayer();
    drawAstroid();
}

function resetGame() {
    activeGame = false;
    currentGameState = GAME_STATES.DEFAULT; 
}

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

window.addEventListener("click", function(event) {
    const rect = gameCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if the click is within the button area
    if (currentGameState === GAME_STATES.DEFAULT &&
        x >= buttonX && x <= buttonX + buttonWidth &&
        y >= buttonY && y <= buttonY + buttonHeight) {
        currentGameState = GAME_STATES.GAME; 
        initializeGame(); 
    }
});

gameLoop();
