var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var gridCanvas = document.getElementById("grid-canvas"); 
var gridCtx = gridCanvas.getContext("2d"); 

var myNFT = {};
// the player is treated as a ship unto itself for modularity
// DO NOT MOVE player object anywhere !!!

var player = {
  ship: "no ship",
  asset: "none",
  class: "none",
  minerals: { mog: 1, ils: 1, cel: 1 }
};

function preload() {
  // display pre login message
  drawGrid(gridCtx);
  // drawSystemOffline(gridCtx)
  gridCanvas.style.zIndex = -1;
}

function startGame() {
  asteroidArray = createStarSystem(1, 32);
  console.log(asteroidArray.length)
  createPlayerShip(); 
  createNPCFleet(24);
  drawGrid(gridCtx);
  // drawSystemOffline(gridCtx)
  drawAll(); 
}


function nextTask(ship, last_task) {
    switch (last_task) {
        case "moving": 
            ship.task_a="mining"; 
            break;
        case "mining":
            setMineDest(ship); 
           break;
         case "idle":  
            setIdleDest(ship); 
           break;
    }  

} 
 

function runSim(ship) {  
  if(ship.task_a==='moving'){ 
    var dx = ship.dest_x - ship.x;
    var dy = ship.dest_y - ship.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var speed = 1;
    ship.x += (dx / dist) * speed;
    ship.y += (dy / dist) * speed;  
  } else {
 
  }
  ship.progress+=1;
  if(ship.progress>=100){
    ship.progress=0;
    nextTask(ship, ship.task_a)
  }

} 




async function drawAll() {
  sim = setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (a in npcArray) {
      runSim(npcArray[a]);
    }
    updatePlayerShip();
    drawAsteroids(ctx, asteroidArray);
    drawShips(ctx, npcArray); 
  }, 16.67);
}


function removeAsteroidFromCanvas(asteroid) {
  let index = asteroidArray.indexOf(asteroid);
  if (index > -1) {
    asteroidArray.splice(index, 1);
  }
}

preload();  



 
canvas.addEventListener("mousemove", function(event) {
let main_content = document.getElementById("id");
let rect = canvas.getBoundingClientRect();
let mouseX = event.clientX - rect.left;
let mouseY = event.clientY - rect.top;
let new_array = npcArray.concat(asteroidArray);
let tolerance = 15;
let found = false;

let npcTemplate = ["id", "type", "x", "y","dest_x", "dest_y", "minerals", "task_a", "task_b", "progress"];
let asteroidTemplate = ["id", "type", "x", "y", "habitable","size", "minerals", "status","faction","description"];

for (let i = 0; i < new_array.length; i++) {
let object = new_array[i];
if (Math.abs(object.x - mouseX) <= tolerance && Math.abs(object.y - mouseY) <= tolerance) {
let objectTemplate;
if (object.type === "npc") {
objectTemplate = npcTemplate;
} else if (object.type === "asteroid") {
objectTemplate = asteroidTemplate;
}
main_content.innerHTML = "";
for (let j = 0; j < objectTemplate.length; j++) {
let key = objectTemplate[j];
let span = document.createElement("p");
span.className = "data-element";
  if (typeof object[key] === 'number') {
    span.innerHTML = key + ": " + object[key].toFixed(2); 
  } else {
    span.innerHTML = key + ": " + object[key];
  }
if (key === 'minerals') {
span.innerHTML = key + ": ";
for (let mineralKey in object[key]) {
span.className = "data-element";
span.innerHTML += mineralKey + ": " + object[key][mineralKey] + " ";
}
}
  main_content.appendChild(span);
}
found = true;
break;
}
}

if (!found) {
main_content.innerHTML = " ";
}
});


