var sectorSelect = 0;
var maxStarSystems = 8;
var asteroidArray = [];
var imgDir = {
    'B':5, // bases
    'S':1, // sm ships
    'M':14, // m ships
    'L':22, // lg ships
    'XL':10, // xl ships
    'AST':6 // asteroids
}
var asteroidImages = prepareImageSources(imgDir['AST'], "asteroids", 'AST');
var mediumShipImages = prepareImageSources(imgDir['M'], "ships", 'M');


function createNewID() {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var randomInt1 = alphabet[Math.floor(Math.random() * alphabet.length)];
  var result = randomInt1 + "-" + Math.floor(Math.random() * 1000);
  return result;
}

function createGrid(width, height, size) {
  var grid = [];
  for (var x = 0; x < width; x += size) {
    for (var y = 0; y < height; y += size) {
      grid.push({ x: x, y: y });

    }
  }
  return grid;
}

function getAvailableCells(grid, array) {
  var availableCells = [];
  grid.forEach(function(cell) {
    var occupied = false;
    array.forEach(function(orbitalObject) {
      if (cell.x === orbitalObject.x && cell.y === orbitalObject.y) {
        occupied = true;
      }
    });
    if (!occupied) {
      availableCells.push(cell);
    }
  });
  return availableCells;
}

function generatePosition(canvasWidth, canvasHeight, gridSize, array) {
  var grid = createGrid(canvasWidth, canvasHeight, gridSize);
  var availableCells = getAvailableCells(grid, array);
  var randomIndex = Math.floor(Math.random() * availableCells.length);
  var cell = availableCells[randomIndex];
  array.push(cell);
  console.log("generate position has created these values: " + { x: cell.x, y: cell.y })
  return { x: cell.x, y: cell.y };
}

 

function getObjectImage(size, type) {
  var images = {
    "asteroid": {
      "small": "./images/assets/asteroids/AST7.png",
      "large": "./images/assets/asteroids/AST7.png",
      "very large": "./images/assets/asteroids/AST6.png",
      "huge": "./images/assets/asteroids/AST7.png",
    },
    "debris": {
      "small": "./images/assets/asteroids/AST0.png",
      "large": "./images/assets/asteroids/AST0.png",
      "very large": "./images/assets/asteroids/AST0.png",
      "huge": "./images/assets/asteroids/AST0.png",
    },
    "anomaly": {
      "small": "./images/assets/asteroids/AST0.png",
      "large": "./images/assets/asteroids/AST0.png",
      "very large": "./images/assets/asteroids/AST0.png",
      "huge": "./images/assets/asteroids/AST0.png",
    }
  };

  return images[type][size];
}

function randObjectData(type) { 
  var celRange = { min: 5, max: 15 };
  var ilsRange = { min: 25, max: 50 };
  var mogRange = { min: 100, max: 500 };
console.log(type)
  switch (type) {
    case 'cel':
      return Math.round(Math.random() * (celRange.max - celRange.min) + celRange.min); 
    case 'ils':
      return Math.round(Math.random() * (ilsRange.max - ilsRange.min) + ilsRange.min);
        case 'mog':
      return Math.round(Math.random() * (mogRange.max - mogRange.min) + mogRange.min);
        case 'faction':
      return factions[Math.floor(Math.random() * factions.length)];
       case 'status':
      return 'normal'
         default: 
      console.log("ERROR populating orbital object data.")
      break;
  } 
}

function createStarSystem(sector, qty) {
  var orbitalObjects = [];
  var types = ["asteroid", "debris", "anomaly"];
  var sizes = ["small", "large", "very large", "huge"]; 
  var randomType, randomHabitability, randomSize, randomImage, randomX, randomY;
  for (var i = 0; i < qty; i++) {
    randomType="asteroid";
    // randomType = types[Math.floor(Math.random() * types.length)]; disabled for now
    randomHabitability = Math.random() > 0.5;
    randomStarSystem = Math.floor(Math.random() * maxStarSystems) + 1;
    randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    randomImage = getObjectImage(randomSize, randomType);
    randomX = Math.floor(Math.random() * canvas.width);
    randomY = Math.floor(Math.random() * canvas.height);
    var newMapObject = {};
    newMapObject.id = createNewID();
    newMapObject.sector = sector;
    newMapObject.star = randomStarSystem;
    newMapObject.type = randomType;
    newMapObject.habitable = randomHabitability;
    newMapObject.size = randomSize;
    newMapObject.image = randomImage;
    newMapObject.x = randomX;
    newMapObject.y = randomY;
    newMapObject.collisionRadius = 10;
    newMapObject.minerals={};
    newMapObject.minerals.cel = randObjectData("cel");
    newMapObject.minerals.ils = randObjectData("ils");
    newMapObject.minerals.mog = randObjectData("mog");
    newMapObject.status = randObjectData("status");
    newMapObject.faction = randObjectData("faction");
    newMapObject.description = "New space object.";
    orbitalObjects.push(newMapObject);
  }
  console.log(orbitalObjects)
  return orbitalObjects;
}

function prepareImageSources(qty, type, initials) {
  // creates a list of urls to images based on the dir you provide and how many assets there are of this type of asteroid, ship, base, etc
  let imageSources = [];
  for (let i = 0; i <= qty; i++) {
    let imageSource = `./images/assets/${type}/${initials}${i}.png`;
    imageSources.push(imageSource);
  }
  return imageSources;
}
