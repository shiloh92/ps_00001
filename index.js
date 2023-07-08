var urls = [
  'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js',
  './common/math.js',
  './slots/data/data.js',
  './wallet/login.js',
  './slots/world.js',
  './slots/save.js',
  './slots/dna.js',
  './slots/draw.js',
  './slots/movement.js',
  './slots/ui.js',
  './slots/refiner.js',
  './slots/player.js',
  './slots/npc.js',
  './slots/extras/typing_fx.js', 
  './main.js'
];

var i = 0;
var i = 0;

var recursiveCallback = function() {
  if (i < urls.length) {
    loadScript(urls[i], function() {
      i++;
      recursiveCallback();
    });
  } else {
    // alert('Loading Success !');
  }
}; 

function loadScript(url, callback) { 
  var script = document.createElement("script")
  script.type = "text/javascript"; 
  if (script.readyState) {  //IE
    script.onreadystatechange = function() {
      if (script.readyState == "loaded" ||
        script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function() {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

for (a in urls) {
  loadScript(urls[a], recursiveCallback);
}
