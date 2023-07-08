function getTotalCargo(){
var result = player.minerals.cel + player.minerals.ils + player.minerals.mog;
  return result;
} 

// add event listener for clicks on canvas
canvas.addEventListener("click", function(event) {
  var rect = canvas.getBoundingClientRect();
  var clickX = event.clientX - rect.left;
  var clickY = event.clientY - rect.top;
  blinkDestinationDot()
  // set player ship's destination to click location
  player.dest_x = clickX;
  player.dest_y = clickY;
  // alert("the player will now begin moving to : " + player.dest_x  + " and " + player.dest_y)
});

function objectHasMineral(object, mineral) {
    if (object.minerals && object.minerals[mineral]) {
        return true;
    }
    return false;
}

function mineAsteroid(player, asteroid) {
    player.status = "mining";
    let miningInterval = setInterval(() => {
        if (objectHasMineral(asteroid, "mog")) {
            asteroid.minerals.mog -= player.mineSpeed;
            player.minerals.mog += player.mineSpeed;
            updatePlayerUI();
            if (!cargoSpaceCheck(player)) {
                console.log("Not enough cargo space for mined minerals!");
                displayCanvasNotification("Not enough cargo space for mined minerals!");
                clearInterval(miningInterval);
                player.status = "idle";
            }
        } else {
            console.log("Asteroid has been depleted of MOG mineral");
            removeAsteroidFromCanvas(asteroid); 
            displayCanvasNotification("Asteroid has been depleted of MOG mineral");
            clearInterval(miningInterval);
            player.status = "idle";
        }
    }, 1000);
}


 
function cargoSpaceCheck(player) {
  var total_cargo = getTotalCargo();
  if (total_cargo + player.minedAmount > player.cargo_max) {
    console.log("Not enough cargo space for mined minerals!");
    return false;
  }
  return true;
}

function collisionDetection(player, asteroids) {
 console.log("checking collision now!")
  for (var i = 0; i < asteroids.length; i++) {
    var dx = player.x - asteroids[i].x;
    var dy = player.y - asteroids[i].y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    // disabled radius check
          if (distance < player.collisionRadius + asteroids[i].collisionRadius) {
                  player.status = "mining";  
                  mineAsteroid(player, asteroids[i]);
           } 
  }
}
  
function blinkDestinationDot() {
  var blinkInterval = setInterval(function() {
    ctx.fillStyle = "green";
    ctx.fillRect(player.dest_x, player.dest_y, 8, 8);
    setTimeout(function() {
      ctx.clearRect(player.dest_x, player.dest_y, 8, 8);
    }, 400);
  }, 400);
  setTimeout(function() {
    clearInterval(blinkInterval);
  }, 5000);
}


function scan() {
  if (player.minerals.cel >= 10) {
    player.minerals.cel -= 10;
    // makeAsteroid(1, galaxies, asteroidType, npc); no longer exists as a function
    alert("Successfully scanned 1 asteroid.");
  } else {
    alert("You do not have enough CEL to scan. (10 CEL required)");
  }
}

function setAttackTarget(player, target) {
  // Make sure the target is a valid ship
  if (!(target instanceof Ship)) {
    console.error("Invalid target:", target);
    return;
  }
  // Check if the target is not friendly
  if (target.faction == player.faction) {
    alert("Invalid target: Friendly ship");
    return;
  }
  // Make sure the player ship is capable of attacking
  if (!player.canAttack) {
    console.error("Player ship cannot attack");
    return;
  }
  player.attackTarget = target;
  console.log("Player ship attack target set to:", target);
  // re-enable Move function for ship after you set target to attack
  document.addEventListener("click", setMoveDestination);
}

document.addEventListener("keydown", event => {
  if (event.key === "f") {
    player.attackTargetMode = true;
    $('#canvas').css('border-color', 'red');
    // Disable setting move destination for the player ship
    canvas.removeEventListener("click", setMoveDestination);

    // Add event listener for setting attack target
    canvas.addEventListener("click", event => {
      const x = event.clientX - canvas.getBoundingClientRect().left;
      const y = event.clientY - canvas.getBoundingClientRect().top;

      // Check if an enemy ship is clicked
      for (const ship of npcArray) {
        if (isClicked(ship, x, y)) {
          setAttackTarget(player, ship);
          break;
        }
      }
    });
  }
});

document.addEventListener("keyup", function(event) {
  if (event.code === "KeyF") {
    // F key has been released
    // Disable setting attack target mode
    $('#canvas').css('border-color', '#31C16A');
    player.attackTargetMode = false;
  }
});


// this generator should be deprecated!  
  var class_sm_ships = [];
  var class_md_ships = [];
  var class_lg_ships = [];
  var class_xl_ships = []; 
  
  function createRandShipName() {
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321";
    var fruits = ["apple", "orange", "tangerine", "banana", "grape", "grapefruit", "cherry", "mango", "lemon", "blueberry", "raspberry", "strawberry"];
    var shipTitles = ["Vega", "Twist", "Freak", "Monstra", "Duo", "Domax", "Redda", "Feep", "Mixer", "Lotask"];
    var newShipName = shipTitles[Math.floor(Math.random() * shipTitles.length)];
    newShipName += "-" + fruits[Math.floor(Math.random() * fruits.length)] + "-" + letters[Math.floor(Math.random() * letters.length)];
    return newShipName;
  }

  function createRandomShipStats(shipClass, modelName) {
    var class_name = ['S', 'M', 'L', 'XL'];
    var normal = [0.98, 1.2, 1.21, 1.22, 1.25];
    var cargo_stats = [1, 5, 10, 15, 30];
    var newShipModel = {
      class: class_name[shipClass],
      model: modelName,
      atk: round5(Math.floor(Math.random() * 5 * normal[shipClass]) + 1),
      spd: round5(Math.floor(Math.random() * 10 * normal[shipClass]) + 1),
      def: round5(Math.floor(Math.random() * 30 * normal[shipClass]) + 1),
      mine: Math.floor(Math.random() * 10) + 1,
      cargo: round10(Math.floor(Math.random() * 100 * cargo_stats[shipClass]) + 20)
    };
    return newShipModel;
  }

  function createClasses(){ 
  for (i = 0; i < 15; i++) {
    class_sm_ships.push(createRandomShipStats(0, createRandShipName()));
  }

  for (i = 0; i < 30; i++) {
    class_md_ships.push(createRandomShipStats(1, createRandShipName()));
  }

  for (i = 0; i < 30; i++) {
    class_lg_ships.push(createRandomShipStats(2, createRandShipName()));
  }

  for (i = 0; i < 30; i++) {
    class_xl_ships.push(createRandomShipStats(3, createRandShipName()));
  }
  return classes = [class_sm_ships, class_md_ships, class_lg_ships,
    class_xl_ships];
}
 

function setPlayerShipClassAndModel(rarity) {
var identifier = (player.asset).substr(-1);
  var classes = createClasses();
  // we check the NFT rarity to determine the class of ship to display
  switch (rarity) {
    case "Common":
      var size = "S"; 
      setPlayerShipClass(size, identifier);
      player.ship = classes[0][identifier].model;
      break;
    case "Uncommon":
      var size = "M";
      setPlayerShipClass(size, identifier);
      player.ship = classes[1][identifier].model;
      break;
    case "Rare":
      var size = "L";
      setPlayerShipClass(size, identifier);
      player.ship = classes[2][identifier].model;
      break;
    case "Ultra Rare":
      var size = "XL";
      setPlayerShipClass(size, identifier);
      player.ship = classes[3][identifier].model;
      break;
    default:
      var size = "S";
      setPlayerShipClass(size, identifier);
      player.ship = classes[3][identifier].model;
  }
  // we set the class using the letter assigned to classes of ships
  player.class = size; 
} 

function setPlayerShipClass(size, identifier){
// we give a default ship class if the nft has no available ship to assign  
  var modelCount = {
    S: 2,
    M: 14,
    L: 22,
    XL: 10,
  }; 
  if (identifier > modelCount[size]) {
    identifier = 0;
    var result = [size, identifier];
    player.class = classes[0][identifier];
  } else {
    var result = [size, identifier];
    player.class = classes[0][identifier];
  } 
  return result;
}