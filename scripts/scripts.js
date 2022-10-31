// Select canvas
const canvas = document.querySelector("canvas");

// Define 2D context
const ctx = canvas.getContext("2d");

// Load images
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

// Sprites
const catSprites = [g0, g1, g2, g3, g4, g5];

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

// Character
const character  = new cat(ctx, 40, 200, g0);

// Counter
let counter = 0;

// 
let intervalCharacter;

function startGame() {
    character.positionX = 40;
    character.positionY = 200;

    intervalCharacter = setInterval(() => {
        ctx.clearRect(0, 0, 768, 468);
        character.drawing();
    }, 1000 / 60);

    setInterval(() => {
        spritesAnimation();
    }, 100);
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
    if (counter < 5) {
        counter++;
      } else {
        counter = 0;
      }
}