let game = true;
// Enemies our player must avoid
var Enemy = function(x,y,s) {
    this.x = x;
    this.y = y;
    this.speed = s;
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    this.height = 65;
    this.width = 98;
    this.collision = false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Enemies will move with random speeds
    this.speed = 110 + Math.floor(Math.random() * 250);
    this.x += this.speed * dt;
    //Enemies will reposition and keep moving along the x-axis
    // when they're off the canvas
    if(this.x > ctx.canvas.width){
      this.x = Math.floor((-300 * Math.random()) + 1)
    }

    // Collision detection
    if(this.checkCollisions(player.x,player.y,player.width,player.height,this.x,this.y,this.width,this.height)) {
      this.collision = true;
      if(player) {
        player.reset();
      }
    }
    else {
        this.collision = false;
      }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Function for collision detection
Enemy.prototype.checkCollisions = function(px,py,pw,ph,ex,ey,ew,eh) {
  return (Math.abs(px-ex) * 2 < pw + ew) && (Math.abs(py-ey) * 2 < ph + eh);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,s) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';
    this.height = 75;
    this.width = 85;
};

Player.prototype.update = function(dt) {
    // winning condition when player reaches certian y-coordinate
    if(game && this.y < 0){
      this.gameWon();
    }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(move) {
  const row = 83;
  const col = 101;
// Switch case used to update player positions
  switch(String(move)) {
    case "left": if(this.x - col >= 0)
                  this.x -= col;
                  break;
    case "right": if(this.x + col < ctx.canvas.width)  //width of canvas
                  this.x += col;
                  break;
    case "up": if(this.y + row >= row)
                this.y -= row;
                break;
    case "down": if(this.y + row <= ctx.canvas.height - 196)
                this.y += row;
                break;
  }
};

// Reset function when collision is detected
Player.prototype.reset = function() {
  this.x = 202;
  this.y = 410;
};

Player.prototype.gameWon = function() {
  game = false;
  setTimeout(this.win, 500);
  let body = document.querySelector(".body-element");
  body.classList.add("win");
  allEnemies = [];
};

// Alert box appears on winning condition
Player.prototype.win = function () {
  alert("You Win! Refresh Page to play again");
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//Random start positions
const enemyPlaces = [230,145,65];

let allEnemies = enemyPlaces.map((y,xAxis) => {
  return new Enemy(Math.floor((-300 * Math.random()) + 1),y);
})

const player = new Player(202,410, 'images/char-cat-girl.png' );

// This listens for key presses and sends the keys to your
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
