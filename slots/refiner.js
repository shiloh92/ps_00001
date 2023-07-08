// Get references to the modal, the dropdown, the input, and the buttons
var modal = document.getElementById("refine-modal");
var mineralSelect = document.getElementById("mineral-select");
var amountInput = document.getElementById("amount-input");
var refineButton = document.getElementById("refine-button");
var cancelButton = document.getElementById("cancel-button");
var upArrow = document.getElementById("up-arrow");
var downArrow = document.getElementById("down-arrow");
var refineSelect = document.getElementById("refine-select");

 

function mineralExchange(player, mineralFrom, mineralTo, amount) {

  var cargo = getTotalCargo();
  alert(mineralFrom + ' to ' + mineralTo + ' : ' + amount)
  if (mineralFrom === mineralTo) {
    console.log("Cannot refine the same mineral into itself");
    return;
  }

  if (!exchangeRates[mineralFrom] || !exchangeRates[mineralTo]) {
    console.log("Invalid mineral type");
    return;
  }

  if (amount > player.minerals[mineralFrom] || amount < 1) {
    console.log("You do not have enough " + mineralFrom);
    return;
  }


  if (amount * exchangeRates[mineralFrom] > cargo - player.max_cargo) {
    console.log("You do not have enough cargo space for this exchange");
    return;
  }

  var refinedAmount = amount * exchangeRates[mineralTo] / exchangeRates[mineralFrom];
  refinedAmount = Number(refinedAmount.toFixed(2));


  alert('here is what you will get: ' + refinedAmount)

  player.minerals[mineralFrom] -= Number(amount.toFixed(2));
  player.minerals[mineralTo] += refinedAmount; 
  updateMineralSelect(player);

  displayRefineMessage(amount, mineralFrom, refinedAmount, mineralTo);
  // Disable the refine button and mineral select dropdown
  document.getElementById("refine-button").disabled = true;
  mineralSelect.disabled = true;
}





upArrow.addEventListener("click", () => {
  // Increment the amount input by 5
  amountInput.value = parseInt(amountInput.value) + 5;
});

downArrow.addEventListener("click", () => {
  // Decrement the amount input by 5
  amountInput.value = parseInt(amountInput.value) - 5;
});


document.getElementById("refine-button").addEventListener("click", function() {

  var mineral = mineralSelect.value;
  var refinedMineral = refineSelect.value;
  var amount = Math.floor(amountInput.value);

  if (mineral === refinedMineral) {
    alert("Cannot refine the same mineral into itself");
  } else {
    mineralExchange(player, mineral, refinedMineral, amount);
  }
});

// Add cancel refine button
cancelButton.addEventListener("click", () => {
  $('#refine-modal').css('display', 'none');
  updateMineralSelect(player);

});

function updateMineralSelect(player) {
  // Clear the current options in the mineral-select dropdown
  mineralSelect.innerHTML = "";
  // Iterate over the minerals in the player object
  for (const mineral in player.minerals) {
    // Create a new option element for the mineral
    const option = document.createElement("option");
    option.value = mineral;
    option.text = `${mineral}: ${player.minerals[mineral]}`;
    // Append the new option to the mineral-select dropdown
    mineralSelect.appendChild(option);
  }
}

function displayRefineMessage(amount, mineralFrom, refinedAmount, mineralTo) {
  const message = document.getElementById("refine-message");
  message.innerHTML = `Congrats! You have exchanged ${amount} ${mineralFrom} for ${refinedAmount} ${mineralTo}`;
  message.style.display = "block";
  setTimeout(() => {
    message.style.display = "none";
    document.getElementById("refine-modal").style.display = "none";
  }, 3000);
}
