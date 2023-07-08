function drawAsteroids(ctx, arr) { 
  arr.forEach(function(orbital) {
    var c = new Image();
    c.src =  orbital.image;
      //"https://i.ibb.co/sVWW0M8/Asteroid.png"; 
    ctx.drawImage(c, orbital.x, orbital.y, 24, 25);
     if (toggleNames) {
    ctx.fillStyle = "yellow";
    ctx.fillText(orbital.id + " OBJ", orbital.x - 15, orbital.y + 45);
    ctx.font = "10px MS Sans Serif";
  } 
  });
}

function drawShips(ctx, ships) {
  for (var i = 0; i < ships.length; i++) {
    ctx.clearRect(ships[i].x, ships[i].y, 10, 10);
    var c = new Image();
    c.src = ships[i].image;
    ctx.drawImage(c, ships[i].x, ships[i].y, 10, 10);
    setShipStatusColor(ctx, ships[i].task_a)
    if (toggleNames) {
      ctx.fillText(ships[i].id + " NPC", ships[i].x - 20, ships[i].y + 32);
      ctx.font = "10px MS Sans Serif";
    } 
  } 
} 

function displayCanvasNotification(ctx, text) {
    // Clear the previous notification
    ctx.clearRect(player.x, player.y - 20, ctx.measureText(text).width, 20);
    // Display the new notification
    ctx.fillStyle = "red";
    ctx.font = "20px Arial";
    ctx.fillText(text, player.x, player.y);
} 

function drawPlayer(ctx, ships) {
  ctx.clearRect(ships.x, ships.y, 10, 10);
  var c = new Image();
  c.src = "./images/assets/ships/S0.png";
  $('#player_ship_image').attr('src', './images/assets/ships/S0.png'); 
  ctx.drawImage(c, ships.x, ships.y, 10, 10); 
  // Check if ship status is "mining" 
  if (ships.status === "mining") {
    ctx.fillStyle = "#33ff00"; // blue color
  } else {
    ctx.fillStyle = "#00ffab"; // teal color 
  }
  ctx.fillText("MY SHIP", ships.x - 20, ships.y + 32);
  ctx.font = "10px MS Sans Serif";
} 

function drawGrid(ctx) { 
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  var gridSize = 8;
  var cellSize = canvas.width / gridSize;
  ctx.beginPath(); 
  for (var i = 0; i < gridSize; i++) {
    ctx.moveTo(0, i * cellSize);
    ctx.lineTo(canvas.width, i * cellSize);
    ctx.moveTo(i * cellSize, 0);
    ctx.lineTo(i * cellSize, canvas.height);
  } 
  ctx.strokeStyle = "rgba(49,193,106,0.5)";
  ctx.stroke();
}
  

function setShipStatusColor(ctx, ship) {
  switch (ship) {
    case 'moving':
      ctx.fillStyle = "#0000FF";
      break;
    case 'mining':
      ctx.fillStyle = "green";
      break;
    case 'sabotaging':
      ctx.fillStyle = "orange";
      break;
    case 'attacking':
      ctx.fillStyle = "red";
      break;
    case 'repairing':
      ctx.fillStyle = "#FFFFFF";
      break;
    case 'refining':
      ctx.fillStyle = "#FFFFFF";
      break;
    default:
      ctx.fillStyle = "#FFFFFF"; break;
  }
}
 