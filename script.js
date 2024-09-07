const gameCanvas = document.getElementById("game-canvas");
gameCanvas.width = 810; 
gameCanvas.height = 560; 

const c = gameCanvas.getContext("2d");

let levelSpeed = 5;

window.addEventListener("click", function(){
    playerShape();
    for (let i = 0; i < 5; i++) {
        astroidShape();
    };

    function playerShape() {
        let x = 200;
        let y = 400;
        let dx = 25;
        let dy = 25;
        function draw() {
            c.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
            c.fillStyle = "black";
            c.fillRect(x, y, 56, 56);
        };
    
        // Event listener for keydown event
        window.addEventListener("keydown", function(event){
            if (event.key === "w" || event.key === "W") { 
                y -= dy; 
                draw();
            } else if (event.key === "s" || event.key === "S") {
                y += dy; 
                draw();
            }
    
            if (event.key === "a" || event.key === "A") {
                x -= dx;
                draw();
            } else if (event.key === "d" || event.key === "D") {
                x += dx;
                draw();
            }
        });
    
        draw();
    };

    function astroidShape() {
        const astroidArray = [];
        const astroidItem = Math.floor(Math.random() * levelSpeed);
    
        let x = gameCanvas.height / 2;
        let y = Math.floor(Math.random() * gameCanvas.height);
        let dx = levelSpeed;
        let dy = levelSpeed;
    
        function animate() {
        };
        
        function draw() {
            c.fillStyle = "gray";
            c.fillRect(x, y, 32, 32);
            astroidArray.push();
            console.log(astroidArray);
                
        };

        draw();
    };

});


