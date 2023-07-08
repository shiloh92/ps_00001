var collab = {};
var wallet = "3ahb2.wam";
  player = {
    ship: "Not identified",
    asset: "No asset accepted",
    class: "Not identified class", 
  }
var myNFTS = {};
var myCollab = {};
var mergedCollection = {};
var iterator = 0;
var states = [
  "initial scan completed",
  "secondary scan completed",
  "advanced scan completed",
];

var wax_endpoint = "https://api.wax-aa.bountyblok.io";
var wax_api = wax_endpoint + "/atomicassets/v1/assets?collection_name=pseudaimusic&schema_name=";
var wax_api2 = "&page=1&limit=100&order=desc&sort=asset_id";
  
async function login() {
  const userAccount = await wax.login();
  wallet = wax.userAccount;
  // const getInventory = await getNFT('pseudaimusic', 'series', userAccount); 
  collab = await getNFT('urbancltnfts', 'collabnfts', userAccount);  
  $('#login_btn').text(wallet);  
}


async function loadBlockchainData(url) {
  let response = await fetch(url);
  let data = await response.json();
  let result = data.data;
  return result;
}

async function loadCollections(user) {
  // remember you are using pseudai wallet to test, so this needs to be updated later
  $('#login_btn').text(user)
  var pseudai =
    wax_endpoint +
    "/atomicassets/v1/assets?collection_name=" +
    "pseudaimusic" +
    "&schema_name=" +
    "series" +
    "&owner=" +
    user +
    wax_api2;
  var collab1 =
    wax_endpoint +
    "/atomicassets/v1/assets?collection_name=" +
    "urbancltnfts" +
    "&schema_name=" +
    "collabnfts" +
    "&owner=" +
    user +
    wax_api2;
  myNFTS = await loadBlockchainData(pseudai);
  myCollab = await loadBlockchainData(collab1);
  mergedCollection = Object.assign({}, myNFTS, myCollab);
  const cc = await switchNFT("next", mergedCollection);
  // we update the nft list that is used for save files
  const dd = await updatesFluxNFTList(mergedCollection);
}


async function isCollab(template) {
  var collab_nfts = [606747, 606758, 606786];

  if (collab_nfts.includes(template)) {
    return true;
  } else {
    return false;
  }
}

async function displayNFT(data) {
  var asset = data[iterator];
  var img_url = "https://ipfs.io/ipfs/" + asset.data.img;

  // check if it is a collab nft (optionally)
  var collab = await isCollab(asset.template.template_id);
  if (!collab) {
    // append image of NFT and desc
    $("#action_h1").text(asset.name + "(#" + asset.template_mint + ")");
    $("#action_p").text(asset.data.description);
    $("#action_p2").text(asset.template.template_id);
    $("<img class='img_nft scale-in-center' src=" + img_url + "  >").prependTo("#action_h1"); 
  }
}


async function switchNFT(direction, assets) {
  if (direction == "next") {
    iterator++;
  } else if (direction == "back") {
    iterator--;
  }
  displayNFT(mergedCollection);
  if (iterator > mergedCollection.length - 1) {
    iterator = 0;
    displayNFT(mergedCollection);
  } 
}




async function findAvailableSaveFileNFTs(data) {
  console.log('got the data:' + data[4])
  let assets = [];
  for (a in data) {
    if (data[a].collection.collection_name === 'pseudaimusic' && data[a].schema.schema_name === 'research') {
      assets.push(data[a]);
    }
  }
  return assets;
} 

async function updatesFluxNFTList(data) {
  var assets = await findAvailableSaveFileNFTs(data);
  let $nftSelect = $("#nft-select");
  $nftSelect.empty();
  for (let i = 0; i < assets.length; i++) {
    let option = "<option value='" + assets[i].asset_id + "'>" + assets[i].name + ' (#' + assets[i].template_mint + ')' + "</option>";
    $nftSelect.append(option);
  }
}
 
function fillPlayerAssetId() {
  var asset = mergedCollection[iterator]; 
  // store the nft json for re-use
  myNFT = asset;
  player.asset= asset.asset_id; 
  setPlayerShipClassAndModel(data.rarity)   
  updatePlayerUI(); 
  // alert(asset.asset_id + ' is now your ship.'); 
    
  // clear off the system offline text
  gridCtx.clearRect(0, canvas.height / 2-35, canvas.width, canvas.height/2+30);
  
  startGame(); 
  $('#player_setup').remove();
}

  function createPlayerShip() {
  player.max_cargo = 10000;
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  player.dest_x = canvas.width / 2 + 19;
  player.dest_y = canvas.height / 2 + 19;
  player.task_a = "idle";
  player.task_b = "idle";
  player.progress = 0;
  player.id = "Player Ship";
  player.speed = 1.25;
  player.status = "idle";
  player.mineSpeed = 3;
  player.minedAmount = 0;
  player.collisionRadius = 10;
  player.canAttack = true;
  player.attackTarget = 'none';
  player.attackTargetMode = false;
  player.faction = 'neutral';  
  player.def = '???';
  player.atk = '???';
  player.spd = '???';
}