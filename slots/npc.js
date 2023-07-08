var npcArray = []; 

function createNPCFleet(quantity) {
    for (var i = 0; i < quantity; i++) {
        createNPC(i, tasks, galaxies, shipType);
    }
}

function createNPC(shipID, shipStatuses, galaxies, shipType) {
    var ship = {};
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var randomInt1 = alphabet[Math.floor(Math.random() * alphabet.length)];
    ship.id = randomInt1 + "-" + Math.floor(Math.random() * 1000);
    ship.type = "npc";
    ship.dna = randomDNA(); 
    ship.hp_max = Math.floor(Math.random() * 100 + 150);
    ship.hp =  ship.hp_max;
    ship.minerals = {};
    ship.minerals.cel = Math.floor(Math.random() * 31);
    ship.minerals.ils = Math.floor(Math.random() * 175);
    ship.minerals.mog = Math.floor(Math.random() * 1000);
    ship.task_a = shipStatuses[Math.floor(Math.random() * shipStatuses.length)];
    ship.task_b = shipStatuses[Math.floor(Math.random() * shipStatuses.length)];
    ship.star = maxStarSystems[Math.floor(Math.random() * maxStarSystems)];
    ship.progress = 0;
    ship.x = Math.round(Math.random() * 350);
    ship.y = Math.round(Math.random() * 350);
    ship.dest_x = Math.round(Math.random() * 350);
    ship.dest_y = Math.round(Math.random() * 350);
    ship.faction = factions[Math.floor(Math.random() * factions.length)];
    ship.collisionRadius=10;
    ship.image = mediumShipImages[Math.floor(Math.random() * mediumShipImages.length)];
    npcArray.push(ship);
    return ship;
}
   
function findClosestObject(ship, objects) {
let closestObject;
let closestDistance = Number.MAX_VALUE;
for (const object of objects) {
const dx = ship.x - object.x;
const dy = ship.y - object.y;
const distance = Math.sqrt(dx * dx + dy * dy);
if (distance < closestDistance) {
closestDistance = distance;
closestObject = object;
}
}
return closestObject;
}

function moveToPointAwayFrom(ship, objectsArray, distance) {
  let minX = ship.x;
  let minY = ship.y;
  let maxX = ship.x;
  let maxY = ship.y;
  let currX, currY;
  for (let i = 0; i < objectsArray.length; i++) {
    currX = objectsArray[i].x;
    currY = objectsArray[i].y;
    minX = Math.min(minX, currX);
    minY = Math.min(minY, currY);
    maxX = Math.max(maxX, currX);
    maxY = Math.max(maxY, currY);
  }
  ship.dest_x = Math.min(maxX + distance, ship.x + distance);
  ship.dest_y = Math.min(maxY + distance, ship.y + distance);
} 

function setMineDest(ship) { 
        // we look for the nearest orbital asteroid
        var target = findClosestObject(ship, asteroidArray);
        ship.dest_x = target.x;
        ship.dest_y = target.y;  
}

function setIdleDest(ship){
        // move 30 pixels away from all objects to idle
        let new_array = npcArray.concat(asteroidArray);
        moveToPointAwayFrom(ship, new_array, 30);          
}