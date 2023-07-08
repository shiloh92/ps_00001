var wordElement = document.querySelector(".updating-text");
var ui_messages = ["Stay Focused, Win Big",
"Eliminate Distractions, Achieve Goals",
"Clear Mind, Clear Code",
"One Task, One Goal",
"Stay on Target, Succeed",
"Simplify, Succeed",
"Prioritize, Prosper",
"Stay on Track, Shine",
"Eliminate Noise, Enhance Productivity",
"Consistent Progress, Constant Success",
"Keep it simple, Keep it moving",
"Narrow your focus, widen your success",
"Stay true to the task",
"Don't let scope creep sabotage",
"Keep the main thing, the main thing",
"Efficiency over everything",
"Concentrate on what counts",
"Stay laser-focused",
"Keep it on course",
"Stay the course, succeed"
  //   "Access to hypernet brought to you by the Pseudai Foundation",
  //   "Bringing the future to you",
  //   "Do not squander resources",
  //   "Cryotravel to a colonizable quadrant",
  //   "Scavenging is illegal",
  //   "The difficult is not impossible",
  //   "Processing and refinery technologies brought to you by IDOSEN Partners",
  //   "SHARD ZM-8 Technologies: brute potential in interspace warfare",
  //   "All unlicensed travel is prohibited",
  //   "BREAKING NEWS. MORBIUS-TYPEX Mining Consortium has elected John Klim to head the third dynasty for the duration of 28,000 days",
  //   "BREAKING NEWS. 3 new bounties have been listed" ,
  // "More dreams than dreamers",
  // "Stand and see with shoulders shining, arc and summer!",
  // "Recyclers are celebrating abandoned space debris found",
  // "Marloks are furious tht Recyclers are holding a festival for exotic spices and liquor",
  // "Marloks issue a threat against the Recyclers for taking in refugees into scavenging groups",
  // "Recyclers have called for an expansion of peace zones for refugees in certain sectors"
  ];
 
var messageIndex = 0;
var currentMessage = ui_messages[messageIndex];
var currentLetterIndex = 0;

function type() {
  if (currentLetterIndex < currentMessage.length) {
    wordElement.textContent += currentMessage[currentLetterIndex];
    currentLetterIndex++;
    setTimeout(type, 50);
  } else {
    setTimeout(erase, 5000);
  }
}

function erase() {
  if (currentLetterIndex > 0) {
    wordElement.textContent = wordElement.textContent.slice(0, -1);
    currentLetterIndex--;
    setTimeout(erase, 50);
  } else {
    messageIndex++;
    if (messageIndex === ui_messages.length) {
      messageIndex = 0;
    }
    currentMessage = ui_messages[messageIndex];
    currentLetterIndex = 0;
    setTimeout(type, 50);
  }
}

type();
