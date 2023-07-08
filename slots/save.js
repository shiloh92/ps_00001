function saveGame(dataObj, walletId) {
  let saveCode = compressAndHashArray(dataObj, walletId);
}
function compressAndHashArray(dataArray, walletId) {
  let key = "secret_key";
  let jsonData = JSON.stringify(dataArray);
  let compressedData = deltaCompress(asteroidArray, key, walletId);
  let base64Data = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(compressedData));
  let hash = CryptoJS.SHA256(base64Data).toString();
  return hash;
}

function deltaCompress(data, key, walletId) {
  let compressedData = [data[0]];
  for (let i = 1; i < data.length; i++) {
    let delta = data[i] - data[i - 1];
    // Use the player's wallet ID to create a unique seed value
    let seed = createSeed(walletId);
    // Use the seed value to generate a pseudo-random key
    let obfuscationKey = generateKey(seed);
    // Perform the obfuscation using the generated key
    let obfuscatedDelta = xor(delta, obfuscationKey);
    // Append the obfuscated delta to the compressed data array
    compressedData.push(obfuscatedDelta);
  }
  return compressedData;
}

function createSeed(walletId) {
  // Use the CryptoJS library to perform a SHA256 hash on the wallet ID
  return CryptoJS.SHA256(walletId).toString();
}

function generateKey(seed) {
  // Use a pseudo-random number generator to generate a key from the seed value
  return Math.random(seed);
}

function xor(n, key) {
  // Perform a bitwise XOR operation on the input value n and the key
  return n ^ key;
}

function getInputLoadCode(){
  var input = document.getElementById("save-code-input"); 
  return input.value;
}

function loadGame(walletId) {
  // Get the save code from the user
  var saveCode = getInputLoadCode();
  alert('your load code is...' + saveCode)
  // Recreate the key and walletId from the saveCode
  let key = "secret_key";
  let seed = createSeed(walletId);
  let obfuscationKey = generateKey(seed);
  // Use the key and the walletId to decompress and de-obfuscate the data
  // Use CryptoJS to decode the base64 data
  let compressedData = CryptoJS.enc.Base64.parse(saveCode).toString(CryptoJS.enc.Utf8);
  let dataArray = deltaDecompress(compressedData, key, walletId);
  let dataObj = JSON.parse(dataArray);
  alert("Ok, here is the data we got: " + dataObj)
}

function deltaDecompress(data, key, walletId) {
  let decompressedData = [data[0]];
  for (let i = 1; i < data.length; i++) {
    let obfuscatedDelta = data[i];
    let seed = createSeed(walletId);
    let obfuscationKey = generateKey(seed);
    let delta = xor(obfuscatedDelta, obfuscationKey);
    let value = decompressedData[i - 1] + delta;
    decompressedData.push(value);
  }
  return decompressedData;
}

// Create a function to open the modal and display the save code
async function showSaveCodeModal(saveCode) {
  let savemodal = document.getElementById("save-code-modal");
  savemodal.style.display = "block";
  let saveCodeElement = document.getElementById("save-code-message");
  saveCodeElement.innerHTML = saveCode;
  let saveCodeInput = document.getElementById("save-code-input");
  saveCodeInput.value = "";
  let loadSaveButton = document.getElementById("load-save-button");
  loadSaveButton.addEventListener("click", function() {
    let inputSaveCode = saveCodeInput.value;
    // Perform the load save operation with the input save code
  });
  let cancelButton = document.getElementById("save-code-cancel-button");
  cancelButton.addEventListener("click", function() {
    savemodal.style.display = "none";
  });

  loadSaveButton.addEventListener("click", function() {
    let inputSaveCode = saveCodeInput.value;
    // Validate the input save code
    if (validateSaveCode(inputSaveCode)) {
      // Decrypt and decompress the input save code
      let saveData = decryptAndDecompressSaveCode(inputSaveCode);
      // Load the game state with the save data
      loadGameState(saveData);
    } else {
      // Display an error message to the user
      saveCodeInput.classList.add("invalid-input");
      let errorMessage = "Invalid save code. Please try again.";
      let errorElement = document.getElementById("error-message");
      errorElement.innerHTML = errorMessage;
    }
  });

}



function validateSaveCode(saveCode) {
  // Check if the input save code contains any common injection attack vectors
  if (saveCode.includes("<") || saveCode.includes(">") || saveCode.includes("'") || saveCode.includes("\"") || saveCode.includes("\\") || saveCode.includes("/")) {
    return false;
  } else {
    return true;
  }
}

function saveTest() {
  //example of how you could use it 
  let saveCode = compressAndHashArray(asteroidArray, wallet);
  showSaveCodeModal(saveCode);
}

function saveGameNFT() {
  let saveCode = document.getElementById("save-code-message").innerHTML;
  let asset = document.getElementById("nft-select").value;
  // function to send the NFT with the save code as the memo
  fluxSave(asset, saveCode);
}


async function fluxSave(asset, saveCode) {
  try {
    const transfer = await wax.api.transact({
      actions: [{
        account: 'atomicassets',
        name: 'transfer',
        authorization: [{
          actor: wax.userAccount,
          permission: 'active',
        }],
        data: {
          from: wax.userAccount,
          to: '1p3ty.wam',
          asset_ids: [asset],
          memo: saveCode,
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 1200,
    });
    console.log(transfer);
    // Display a success message to the user
    let message = document.getElementById("nft-message");
    message.innerHTML = "NFT sent successfully with the save code: " + saveCode + " " + transfer;
    message.style.display = "block";
  } catch (e) {
    // Display an error message to the user
    let message = document.getElementById("nft-message");
    message.innerHTML = "Error sending NFT. Please try again.";
    message.style.display = "block";
  }
}


 