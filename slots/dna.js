 

// used for dna checks
var traitPositions = {
    character: 0,
    resource: 1,
    food: 2,
    workEthic: 3,
    illness: 4,
    chat: 5,
    smell: 6,
    zone: 7,
    history: 8,
    thought: 9,
    dislikes: 10
};

function createDNA(traits) {
    let dna = "";

    for (let trait in traits) {
        if (!traitOptions[trait]) {
            dna += "X";
            continue;
        }
        let value = traitOptions[trait].indexOf(traits[trait]);
        if (value === -1) {
            dna += "X";
            continue;
        }
        dna += String.fromCharCode(65 + value);
    }
    return dna;
} 
 
function extractDNA(dna) {
    let traits = {};
    let paragraph = "";
    for (let i = 0; i < dna.length; i++) {
        let traitName = getTraitName(i);
        if (!traitName) {
            continue;
        }
        let valueIndex = dna.charCodeAt(i) - 65;
        if (valueIndex < 0 || valueIndex >= traitOptions[traitName].length) {
            continue;
        }
        let traitValue = traitOptions[traitName][valueIndex];
        traits[traitName] = traitValue;
        paragraph += `The NPC's ${traitName} is ${traitValue}. `;
    }
    return paragraph;
}


function getTraitName(i) {
    switch (i) {
        case 0:
            return "character";
        case 1:
            return "resource";
        case 2:
            return "food";
        case 3:
            return "workEthic";
        case 4:
            return "illness";
        case 5:
            return "chat";
        case 6:
            return "smell";
        case 7:
            return "zone";
        case 8:
            return "history";
        case 9:
            return "thought";
        case 10:
            return "dislikes";
        default:
            return null;
    }
}

 
function randomDNA() {
    let traits = {};
    for (let trait in traitOptions) {
        let value = traitOptions[trait][Math.floor(Math.random() * traitOptions[trait].length)];
        traits[trait] = value;
    }
    return createDNA(traits);
}

 
function checkDNA(dna, trait) {
    if (!traitOptions[trait]) {
        return false;
    }
    let position = traitPositions[trait];
    let valueIndex = dna.charCodeAt(position) - 65;
    if (valueIndex < 0 || valueIndex >= traitOptions[trait].length) {
        return false;
    }
    let traitValue = traitOptions[trait][valueIndex];
    return traitValue;
}

function checkTraitConflict(dna1, trait1, dna2, trait2) {
    let trait1Value = checkDNA(dna1, trait1);
    let trait2Value = checkDNA(dna2, trait2);
    if (trait1Value === trait2Value) {
        return `Conflict detected: ${trait1} of ${dna1} is ${trait1Value} and ${trait2} of ${dna2} is ${trait2Value}`;
    } else {
        return `No conflict detected. ${trait1} of ${dna1} is ${trait1Value} and ${trait2} of ${dna2} is ${trait2Value}`;
    }
}
 
function dnaTest(){   
let npc1DNA = randomDNA(); 
let npc2DNA = randomDNA(); 
let ext1 = extractDNA(npc1DNA);
let ext2 = extractDNA(npc2DNA); 
let extracts = npc1DNA + ' ' + ext1  + ' ' +  npc2DNA  + ' ' + ext2;
let conflict = checkTraitConflict(npc1DNA, "dislikes", npc2DNA, "food"); 
$('#action_p').text(extracts + conflict)
}