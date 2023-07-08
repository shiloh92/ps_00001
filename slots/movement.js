function updateLocation(ship, speed) {
    var dx = ship.dest_x - ship.x;
    var dy = ship.dest_y - ship.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx);
    ship.x += Math.cos(angle) * speed.x;
    ship.y += Math.sin(angle) * speed.y;
}

function movePlayerShip(ship, canvas) {
    var dx = ship.dest_x - ship.x;
    var dy = ship.dest_y - ship.y;  
}

function updatePlayerShip() {
  var dx = player.dest_x - player.x;
  var dy = player.dest_y - player.y;
  var dist = Math.sqrt(dx * dx + dy * dy);
  // if player ship is close to destination, stop moving
  if (dist < player.speed) {
    player.x = player.dest_x;
    player.y = player.dest_y;
    player.task_a = "idle";
    //collisionDetection(player, asteroidArray)
  } else {
    // move player ship towards destination
    player.x += (dx / dist) * player.speed;
    player.y += (dy / dist) * player.speed;
  }
  // check if player ship is going out of bounds and adjust if necessary
  drawPlayer(ctx, player)
}

function navigate(sector){
  sectorSelect = sector;
  alert("you set sector to : " + sectorSelect) 
  $('.sectorsList .nav.activeitem').removeClass('activeitem');
  // add the active class to the clicked link
  $(`.sectorsList .nav:nth-child(${sector})`).toggleClass('activeitem');
  $('.nav').on("click", function(){
  $('.sectorsList .nav').not(this).not('.activeitem').removeClass("activeitem");
  $(this).addClass("activeitem");
  });
}