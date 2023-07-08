 newTea=[]; 

function randomItem(array){
var x = array[Math.round(Math.random()*(array.length-1))];
return x;
}  

function makeTea(div) {
    var temp = ["Hot", "Very Hot", "Extremely Hot"];
    var teas = ["Green", "Dragon Chai", "Rose", "Oolong", "Black", "Earl Grey", "Bergamot", "Peppermint", "Mint", "Orange", "Blackberry"];
    var x = document.getElementById(div); 
    // set innerHTML of div to "Replicating..." immediately
    x.innerHTML = "Replicating...";

    setTimeout(function() {
        var randTeas = randomItem(teas);
        var randTemp = randomItem(temp);
		newTea.push(randTeas + " Tea", randTemp);
        // create elements and set their properties
        var img = document.createElement("IMG");
        img.src = 'https://i.ibb.co/R4SWzVR/tearedhot.gif';
        var li = document.createElement("LI");
        var p = document.createElement("P");
        p.innerHTML = randTeas + " (" + randTemp + ")";
        li.appendChild(img);
        li.appendChild(p);
        x.appendChild(li);
    }, 3500);
}
