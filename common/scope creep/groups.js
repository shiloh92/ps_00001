// let groupName = "Group1";
// let taskA = "collect resources";
// let taskB = "defend group";
// let destX = "20";
// let destY = "30";
// let groupDNA = createGroupDNA(groupName, taskA, taskB, destX, destY);

// let ships = [ship1, ship2, ship3];
// ships.forEach(ship => ship.groupDNA = groupDNA);

// function createGroupDNA(groupName, taskA, taskB, destX, destY) {
//     let groupDNA = "";
//     groupDNA += groupName[0];
//     groupDNA += taskA[0];
//     groupDNA += taskB[0];
//     groupDNA += destX[0];
//     groupDNA += destY[0];
//     groupDNA += Math.floor(Math.random() * 10);
//     return groupDNA;
// }

// function checkGroupStatus(groupDNA) {
//     let groupName = groupDNA[0];
//     let taskA = groupDNA[1];
//     let taskB = groupDNA[2];
//     let destX = groupDNA[3];
//     let destY = groupDNA[4];
//     let shipsCount = groupDNA[5];
// let shipsCompleted = 0;
// ships.forEach(ship => {
// if (ship.groupDNA === groupDNA) {
// if (checkDNA(ship.dna, taskA) === "completed" && checkDNA(ship.dna, taskB) === "completed") {
// shipsCompleted++;
// }
// }
// });
// if (shipsCompleted === shipsCount) {
// console.log(Objectives of ${groupName} completed at ${destX}, ${destY}. Group is disbanded.);
// ships.forEach(ship => {
// if (ship.groupDNA === groupDNA) {
// ship.groupDNA = "";
// }
// });
// } else {
// console.log(Objectives of ${groupName} are ongoing. ${shipsCompleted} out of ${shipsCount} ships have completed the objectives.);
// }
// }
