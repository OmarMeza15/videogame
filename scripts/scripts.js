// Select canvas
const canvas = document.querySelector("canvas");

// Define 2D context
const ctx = canvas.getContext("2d");

// Load images
    // Main Character 
const g0 = new Image();
const g1 = new Image();
const g2 = new Image();
const g3 = new Image();
const g4 = new Image();
const g5 = new Image();
g0.src = "/img/Characters/Cat/1.png";
g1.src = "/img/Characters/Cat/2.png";
g2.src = "/img/Characters/Cat/3.png";
g3.src = "/img/Characters/Cat/4.png";
g4.src = "/img/Characters/Cat/5.png";
g5.src = "/img/Characters/Cat/6.png";

    // Enemy 1
const e0 = new Image();
const e1 = new Image();
const e2 = new Image();
const e3 = new Image();
e0.src = "/img/Characters/Bat1/1.png";
e1.src = "/img/Characters/Bat1/2.png";
e2.src = "/img/Characters/Bat1/3.png";
e3.src = "/img/Characters/Bat1/4.png";

    // Enemy 2
const e4 = new Image();
const e5 = new Image();
const e6 = new Image();
const e7 = new Image();
e4.src = "/img/Characters/Bat2/1.png";
e5.src = "/img/Characters/Bat2/2.png";
e6.src = "/img/Characters/Bat2/3.png";
e7.src = "/img/Characters/Bat2/4.png";

    // Background
const img = new Image();
img.src = "/img/Backgrounds/loopbackground3.jpg";

// Sprites
const catSprites = [g0, g1, g2, g3, g4, g5];
const bat1Sprites = [e0, e1, e2, e3, e2, e1];
const bat2Sprites = [e4, e5, e6, e7, e6, e5];

// Background loop
// const backgroundImage = {
//     img: img,
//     x: 0,
//     speed: -1,
  
//     move: function() {
//       this.x += this.speed;
//       this.x %= img.width;
//     },
  
//     draw: function() {
//       ctx.drawImage(this.img, this.x, 0);
//       if (this.speed < 0) {
//         ctx.drawImage(this.img, this.x + img.width, 0);
//       } else {
//         ctx.drawImage(this.img, this.x - this.img.width, 0);
//       }
//     },
//   };
  
//   function updateCanvas() {
//     backgroundImage.move();
  
//     ctx.clearRect(0, 0, 768, 468);
//     backgroundImage.draw();
  
//     requestAnimationFrame(updateCanvas);
//   }

// img.onload = updateCanvas();

// Define characters
class cat {
    constructor(ctx, positionX, positionY, image) {
        this.name = "macska";
        this.life = 3;
        this.positionX = positionX;
        this.positionY = positionY;
        this.image = image;
        this.ctx = ctx;
        this.score = 0;
    }

    // Draw
    drawing() {
        this.ctx.drawImage(this.image, this.positionX, this.positionY);
      }

    // Movements
    front() {
        if (this.positionX + 100 < 760) {
            this.positionX = this.positionX + 10;
        }
    }

    back() {
        if(this.positionX > 0) {
            this.positionX = this.positionX - 10;
        }
    }

    up() {
        if(this.positionY > 0) {
            this.positionY = this.positionY - 10;
        }
    }

    down() {
        if(this.positionY + 106 < 460) {
            this.positionY = this.positionY + 10;
        }
    }
}

class bat1 {
    constructor(ctx, positionX, positionY, image) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.image = image;
        this.ctx = ctx;
    }

    back() {
        this.positionX = this.positionX - 5;
    }

    drawing() {
        this.ctx.drawImage(this.image, this.positionX, this.positionY);
    }
}

class bat2 {
    constructor(ctx, positionX, positionY, image) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.image = image;
        this.ctx = ctx;
    }

    back() {
        this.positionX = this.positionX - 5;
    }

    drawing() {
        this.ctx.drawImage(this.image, this.positionX, this.positionY);
    }
}

// Character
const character  = new cat(ctx, 40, 200, g0);

// Counter
let counter = 0;

// Game start
let intervalCharacter;
let intervalEnemies;
let intervalBat2;

function startGame() {
    character.life = 3;
    enemies1 = [];
    enemies2 = [];
    character.positionX = 40;
    character.positionY = 200;

    intervalCharacter = setInterval(() => {
        ctx.clearRect(0, 0, 768, 468);
        character.drawing();

        enemies1.forEach((enemy1, enemyPosition) => {
            enemy1.back();
            enemy1.drawing();
            enemy1.image = bat1Sprites[counter];
        });

        enemies2.forEach((enemy2, enemyPosition) => {
            enemy2.back();
            enemy2.drawing();
            enemy2.image = bat2Sprites[counter];
        });
    }, 1000 / 60);
    
    // Create enemies
    intervalEnemies = setInterval(() => {
        if(Math.floor(Math.random() * 2) == 1) {
            const height1 = Math.floor(Math.random() * 200);

            const enemy1 = new bat1(ctx, 768, height1, e0);
            enemies1.push(enemy1);
        }
    }, 2000);

    intervalBat2 = setInterval(() => {
        if(Math.floor(Math.random() * 2) == 1) {
            const height2 = Math.floor(Math.random() * 400);

            const enemy2 = new bat2(ctx, 768, height2, e4);
            enemies2.push(enemy2);
        }
    }, 2000);

    setInterval(() => {
        spritesAnimation();
    }, 200);
}

startGame();

window.addEventListener("keydown", (event) => {
    switch  (event.code) {
        case "ArrowRight":
            character.front();
            break;
        case "ArrowLeft":
            character.back();
            break;
        case "ArrowUp":
            character.up();
            break;
        case "ArrowDown":
            character.down();
            break;
    }
})

function spritesAnimation() {
    character.image = catSprites[counter];
    if(counter < 5) {
        counter++;
      } else {
        counter = 0;
      }
}
