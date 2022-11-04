// Select canvas
const canvas = document.querySelector("canvas");

// Define 2D context
const ctx = canvas.getContext("2d");

// font
ctx.font = "20px 'Silkscreen'";
ctx.fillStyle = "white";

// Game Over and Win
const gameOver = document.getElementById("gameOver");
const win = document.getElementById("win");

// Load images
// Main Character
const g0 = new Image();
const g1 = new Image();
const g2 = new Image();
const g3 = new Image();
const g4 = new Image();
const g5 = new Image();
g0.src = "./img/Characters/Cat/1.png";
g1.src = "./img/Characters/Cat/2.png";
g2.src = "./img/Characters/Cat/3.png";
g3.src = "./img/Characters/Cat/4.png";
g4.src = "./img/Characters/Cat/5.png";
g5.src = "./img/Characters/Cat/6.png";

// Enemy 1
const e0 = new Image();
const e1 = new Image();
const e2 = new Image();
const e3 = new Image();
e0.src = "./img/Characters/Bat1/1.png";
e1.src = "./img/Characters/Bat1/2.png";
e2.src = "./img/Characters/Bat1/3.png";
e3.src = "./img/Characters/Bat1/4.png";

// Enemy 2
const e4 = new Image();
const e5 = new Image();
const e6 = new Image();
const e7 = new Image();
e4.src = "./img/Characters/Bat2/1.png";
e5.src = "./img/Characters/Bat2/2.png";
e6.src = "./img/Characters/Bat2/3.png";
e7.src = "./img/Characters/Bat2/4.png";

// Shooting star
const s0 = new Image();
s0.src = "./img/icons/shooting.png";

// explosion
const explosionImg = new Image();
explosionImg.src = "./img/icons/explosion.png";

// Potion
const item = new Image();
item.src = "./img/icons/collectible.png";

// Lifes
const heart = new Image();
heart.src = "./img/icons/life.png";

// Background
const img = new Image();
img.src = "./img/Backgrounds/loopbackground3.jpg";

img.onload = function(){
  startGame();
}


// Sprites
const catSprites = [g0, g1, g2, g3, g4, g5];
const bat1Sprites = [e0, e1, e2, e3, e2, e1];
const bat2Sprites = [e4, e5, e6, e7, e6, e5];

// Enemy, stars, explosions and items lists
let enemies1 = [];
let enemies2 = [];
let starsArray = [];
let explosionArray = [];
let potions = [];

// Define characters
class cat {
  constructor(ctx, positionX, positionY, image) {
    this.name = "macska";
    this.life = 3;
    this.positionX = positionX;
    this.positionY = positionY;
    this.image = image;
    this.ctx = ctx;
    this.potionsNum = 0;
    this.score = 0;
  }

  // Draw
  drawing() {
    this.ctx.drawImage(this.image, this.positionX, this.positionY);

    // Lifes
    this.ctx.fillText(`X${this.life}`, 60, 50);
    this.ctx.drawImage(heart, 20, 25);

    // Potions
    this.ctx.fillText(`X${this.potionsNum}`, 200, 50);
    this.ctx.drawImage(item, 160, 16);

    // Score
    this.ctx.fillText(`Score:${this.score}`, 620, 50);
  }

  // Movements
  front() {
    if (this.positionX + 100 < 760) {
      this.positionX = this.positionX + 10;
    }
  }

  back() {
    if (this.positionX > 0) {
      this.positionX = this.positionX - 10;
    }
  }

  up() {
    if (this.positionY > 0) {
      this.positionY = this.positionY - 10;
    }
  }

  down() {
    if (this.positionY + 106 < 460) {
      this.positionY = this.positionY + 10;
    }
  }

  shoot() {
    if (starsArray.length < 3) {
      const star = new shootStars(
        ctx,
        character.positionX + 80,
        character.positionY + 25,
        s0
      );

      starsArray.push(star);
    }
  }

  loseLife() {
    this.life -= 1;

    if (this.life == 0) {
      clearInterval(intervalCharacter);
      clearInterval(intervalBat1);
      clearInterval(intervalBat2);

      gameOver.classList.remove("hide");
    }
  }

  gainPotion() {
    this.potionsNum += 1;

    if (this.potionsNum == 5) {
      this.potionsNum = 0;
      this.life += 1;
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

class shootStars {
  constructor(ctx, positionX, positionY, image) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.ctx = ctx;
    this.image = image;
  }

  front() {
    this.positionX = this.positionX + 7;
  }

  drawing() {
    this.ctx.drawImage(this.image, this.positionX, this.positionY);
  }
}

class explosion {
  constructor(ctx, positionX, positionY, image) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.ctx = ctx;
    this.image = image;
    this.sizeX = 50;
    this.sizeY = 42;
  }

  drawing() {
    this.ctx.drawImage(this.image, this.positionX, this.positionY);
    this.sizeX += 5;
    this.sizeY += 2;
  }
}

class potion {
  constructor(ctx, positionX, positionY, image) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.ctx = ctx;
    this.image = image;
  }

  back() {
    this.positionX = this.positionX - 5;
  }

  drawing() {
    this.ctx.drawImage(this.image, this.positionX, this.positionY);
  }
}

class Background {
  constructor(ctx, positionX, speed, image) {
    this.positionX = positionX;
    this.ctx = ctx;
    this.speed = speed - 1;
    this.image = image;
  }

  move() {
    this.positionX += this.speed;
    this.positionX %= img.width;
  }

  draw() {
    this.ctx.drawImage(this.image, this.positionX, 0);

    if(this.speed < 0) {
      this.ctx.drawImage(this.image, this.positionX + img.width, 0);
    } else {
      this.ctx.drawImage(this.image, this.positionX - this.image.width, 0);
    }
  }
}

// Main character and background
const character = new cat(ctx, 40, 200, g0);
const backgroundLoop = new Background(ctx, 0, 0, img);

// Counter
let counter = 0;

// Game start
let intervalCharacter;
let intervalBat1;
let intervalBat2;
let intervalItems;

function startGame() {
  character.life = 3;
  character.score = 0;
  character.potionsNum = 0;
  enemies1 = [];
  enemies2 = [];
  itemsArray = [];
  starsArray = [];
  character.positionX = 40;
  character.positionY = 200;
  backgroundLoop.positionX = 0;
  gameOver.classList.add("hide");
  win.classList.add("hide");

  // Draw character, enemies and items and their interactions
  intervalCharacter = setInterval(() => {
    ctx.clearRect(0, 0, 768, 468);
    updateCanvas();
    character.drawing();


    enemies1.forEach((enemy1, enemyPosition) => {
      enemy1.back();
      enemy1.drawing();
      enemy1.image = bat1Sprites[counter];

      if (
        enemy1.positionX <= character.positionX + 90 &&
        enemy1.positionY + 80 >= character.positionY &&
        enemy1.positionY <= character.positionY + 100 &&
        enemy1.positionX + 100 >= character.positionX
      ) {
        enemies1.splice(enemyPosition, 1);

        character.loseLife();
      }

      if (enemy1.positionX < -100) {
        enemies1.splice(enemyPosition, 1);
      }
    });

    enemies2.forEach((enemy2, enemyPosition) => {
      enemy2.back();
      enemy2.drawing();
      enemy2.image = bat2Sprites[counter];

      if (
        enemy2.positionX <= character.positionX + 90 &&
        enemy2.positionY + 64 >= character.positionY &&
        enemy2.positionY <= character.positionY + 100 &&
        enemy2.positionX + 103 >= character.positionX
      ) {
        enemies2.splice(enemyPosition, 1);

        character.loseLife();
      }

      if (enemy2.positionX < -103) {
        enemies2.splice(enemyPosition, 1);
      }
    });

    itemsArray.forEach((collectible, itemPosition) => {
      collectible.back();
      collectible.drawing();
      collectible.image = item;

      if (
        collectible.positionX <= character.positionX + 90 &&
        collectible.positionY + 43 >= character.positionY &&
        collectible.positionY <= character.positionY + 100 &&
        collectible.positionX + 36 >= character.positionX
      ) {
        itemsArray.splice(itemPosition, 1);

        character.gainPotion();

        character.score += 50;

        if (character.score >= 2000) {
          clearInterval(intervalCharacter);
          clearInterval(intervalBat1);
          clearInterval(intervalBat2);

          win.classList.remove("hide");
        }
      }

      if (collectible.positionX < -36) {
        itemsArray.splice(itemPosition, 1);
      }
    });

    starsArray.forEach((star, starIndex) => {
      star.drawing();
      star.front();

      // Disappear at the end of the canvas
      if (star.positionX + 30 > 768) {
        starsArray.splice(starIndex, 1);
      }

      // Disappear if it collides with a bat
      enemies1.forEach((enemy1, enemyIndex) => {
        if (
          star.positionX + 10 >= enemy1.positionX &&
          star.positionY <= enemy1.positionY + 84 &&
          star.positionY + 27 >= enemy1.positionY &&
          star.positionX <= enemy1.positionX + 100
        ) {
          starsArray.splice(starIndex, 1);

          enemies1.splice(enemyIndex, 1);

          const explode = new explosion(
            ctx,
            star.positionX + 30,
            star.positionY,
            explosionImg
          );

          explosionArray.push(explode);

          character.score += 100;

          if (character.score >= 2000) {
            clearInterval(intervalCharacter);
            clearInterval(intervalBat1);
            clearInterval(intervalBat2);

            win.classList.remove("hide");
          }
        }
      });

      enemies2.forEach((enemy2, enemyIndex) => {
        if (
          star.positionX + 10 >= enemy2.positionX &&
          star.positionY <= enemy2.positionY + 69 &&
          star.positionY + 27 >= enemy2.positionY &&
          star.positionX <= enemy2.positionX + 103
        ) {
          starsArray.splice(starIndex, 1);

          enemies2.splice(enemyIndex, 1);

          const explode = new explosion(
            ctx,
            star.positionX + 30,
            star.positionY,
            explosionImg
          );

          explosionArray.push(explode);

          character.score += 150;

          if (character.score >= 2000) {
            clearInterval(intervalCharacter);
            clearInterval(intervalBat1);
            clearInterval(intervalBat2);

            win.classList.remove("hide");
          }
        }
      });
    });

    explosionArray.forEach((blast, explosions) => {
      blast.drawing();

      if (blast.sizeX >= 100 && blast.sizeY >= 84) {
        explosionArray.splice(explosions, 1);
      }
    });
  }, 1000 / 60);

  // Enemies respawn
  intervalBat1 = setInterval(() => {
    if (Math.floor(Math.random() * 2) == 1) {
      const height1 = Math.floor(Math.random() * 200);

      const enemy1 = new bat1(ctx, 768, height1, e0);
      enemies1.push(enemy1);
    }
  }, 2000);

  intervalBat2 = setInterval(() => {
    if (Math.floor(Math.random() * 2) == 1) {
      const height2 = Math.floor(Math.random() * 400);

      const enemy2 = new bat2(ctx, 768, height2, e4);
      enemies2.push(enemy2);
    }
  }, 2000);

  // Items respawn
  intervalItems = setInterval(() => {
    if (Math.floor(Math.random() * 2) == 1) {
      const height3 = Math.floor(Math.random() * 400);

      const collectible = new potion(ctx, 768, height3, item);
      itemsArray.push(collectible);
    }
  }, 1500);

  setInterval(() => {
    spritesAnimation();
  }, 200);
}



window.addEventListener("keydown", (event) => {
  switch (event.code) {
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
    case "Space":
      character.shoot();
      break;
  }
});

function spritesAnimation() {
  character.image = catSprites[counter];
  if (counter < 5) {
    counter++;
  } else {
    counter = 0;
  }
}

function updateCanvas() {
  backgroundLoop.move();
  backgroundLoop.draw();
}

