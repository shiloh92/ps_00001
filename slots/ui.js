function addText(text) {
  document.getElementById("data").innerHTML += text;
}

var toggleNames = false;
function toggleDisplayNames() {
  if (toggleNames) {
    toggleNames = false;
  } else {
    toggleNames = true;
  }
}

function createAllShipTabs() {
  console.log("creating data tabs for ships")
  for (i in npcArray) {
    createDataTab('data', 'ship', npcArray[i])
  }
}


function createDataTab(div, type, object) {
  if (type === 'ship') {
    var text = shipDisplayStats(object);
    var tabClass = 'tab';
  }
  if (type === 'asteroid') {
    var text = asteroidDisplayStats(object);
    var tabClass = 'tab orb_tab';
  }
  var tab = document.createElement("div");
  tab.setAttribute("id", object.id);
  tab.setAttribute("class", tabClass);
  var textNode = document.createTextNode(text);
  tab.appendChild(textNode);
  document.getElementById(div).appendChild(tab);
}


function updateDataTab(div, type, object) {
  if (type === 'ship') {
    var update = shipDisplayStats(object);
  }
  if (type === 'asteroid') {
    var update = asteroidDisplayStats(object);
  }
  $(div).text(update);
}
 

function shipDisplayStats(ship) {
  var shipStats =
    " SHIP // " +
    ship.id +
    " MAP: " +
    ship.star +
    " HP: " +
    ship.hp +
    " TASK: " +
    ship.task_a +
    " NEXT: " +
    ship.task_b +
    " " +
    ship.progress +
    "/10";
  return shipStats;
}

function asteroidDisplayStats(asteroid) {
  var asteroidStats =
    asteroid.type +
    " //  " +
    asteroid.id +
    " MAP: " +
    asteroid.star +
    " CEL: " +
    asteroid.minerals.cel +
    " TCL: " +
    asteroid.minerals.ils +
    " MOG: " +
    asteroid.minerals.mog +
    " STATUS: " +
    asteroid.status;
  return asteroidStats;
}




function refiner() {
  let modal = document.getElementById("refine-modal");
  document.getElementById("refine-button").disabled = false;
  mineralSelect.disabled = false;
  modal.style.display = "block";
}

 

 

function updatePlayerUI() { 
  var current_ship = player.ship;
  var current_class = player.class;
  document.getElementById("player_main").innerHTML = 'Captain ' + wallet + '\'s NFT ID# ' + player.asset + ", Model: " + current_ship +  " , Class: " + current_class;
  
  var cargo = getTotalCargo();
  var mog = player.minerals.mog;
  var cel = player.minerals.cel;
  var ils = player.minerals.ils;
  var def = player.def;
  var atk = player.atk;
  var spd = player.spd; 
  var mine_speed = player.mineSpeed;
  var max_cargo = player.max_cargo;
  document.getElementById("player_secondary").innerHTML =
    " || MOG: " +
    mog +
    " ILS: " +
    ils +
    " CEL: " +
    cel +
    " CARGO:" +
    cargo +
    "/" +
    max_cargo +
    "<br>DEF: " +
    def +
    " SPD: " +
    spd +
    " ATK: " +
    atk +
    " MINE: " +
    mine_speed;
}

function drawSystemOffline(ctx) {
  ctx.font = "40px Arial";
  ctx.fillStyle = "#08fa0f";
  ctx.textAlign = "center";
  ctx.fillText("SYSTEM OFFLINE", canvas.width / 2, canvas.height / 2-4); 
  ctx.font = "20px Space Mono";
  ctx.fillText("Login to enable system.", canvas.width / 2, canvas.height / 2 + 30);
} 

 