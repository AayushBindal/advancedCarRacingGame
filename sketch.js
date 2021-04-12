var database;

var game, gameState;
var player, playerCount;
var form;

var allPlayers, finishedPlayers;
var distance;

var car1, car2, car3, car4;
var car1_img, car2_img, car3_img, car4_img;
var cars;
var passedFinish;

var xSet;
var yVel, xVel;

var backgroundImg;

var ground_img, track_img;

var bronze_img, silver_img, gold_img;

var time = 59;
function preload() {
  car1_img = loadImage("Images/car1.png");
  car2_img = loadImage("Images/car2.png");
  car3_img = loadImage("Images/car3.png");
  car4_img = loadImage("Images/car4.png");

  ground_img = loadImage("Images/ground.png");
  track_img = loadImage("Images/track.png");

  bronze_img = loadImage("Images/bronze.png");
  silver_img = loadImage("Images/silver.png");
  gold_img = loadImage("Images/gold.png");

  backgroundImg = loadImage("Images/carBackground1.jfif");
}

function setup() {
  //create the canvas
  createCanvas(displayWidth * 0.99, displayHeight * 0.885);

  //create the database
  database = firebase.database();

  //set the variables
  gameState = 0;
  distance = 0;
  finishedPlayers = 0;
  yVel = 0;
  xVel = 0;

  xSet = false;

  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  //draw the background
  background(backgroundImg);
  var count = World.seconds;

  /*textSize(20);
  stroke(255);
  fill(255);
  text("time remaining: "+count, displayWidth/2+550, 20);*/
  //start the game
  if (playerCount === 4 && finishedPlayers === 0) {
    game.updateState(1);
  }

  //start the game for real
  if (gameState === 1) {
    game.play();
  }

  //end the game
  if (finishedPlayers === 4) {
    game.updateState(2);
    //gameState = 2;
  }

  //display ranking
  if (gameState === 2 && finishedPlayers === 4) {
    game.displayRanks();
  }
}
function keyPressed() {
  if (keyCode === 13 && gameState !== 1 && passedFinish === false) {
    form.enter();
    passedFinish = true;
  }
}
