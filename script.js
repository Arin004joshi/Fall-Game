var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;

//if both are pressed at the same time
var both = 0;
var counter = 0;
var currentBlock = [];

function moveLeft() {
  var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
  if (left > 0) {
    character.style.left = left - 30 + "px";
  }
}

function moveRight() {
  var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
  if (left < 370) {
    character.style.left = left + 30 + "px";
  }
}

document.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") {
    interval = setInterval(moveLeft(), 1);
  }
  if (event.key === "ArrowRight") {
    interval = setInterval(moveRight(), 1);
  }
  if (event.key === "ArrowLeft" && event.key === "ArrowRight") {
    if (both = 0) {
      both++;
      if (event.key === "ArrowLeft") {
        interval = setInterval(moveLeft(), 1);
      }
      if (event.key === "ArrowRight") {
        interval = setInterval(moveRight(), 1);
      }
    }
  }
})

document.addEventListener("keyup", event => {
  clearInterval(interval);
})

var blocks = setInterval(function () {
  var blockLast = document.getElementById("block" + (counter - 1));
  var holeLast = document.getElementById("hole" + (counter - 1));
  if (counter > 0) {
    // We need to get the previous block to the one we are currently creating so that we can add 100 px to it. 
    var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
    var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
  }

  if (blockLastTop < 340 || counter == 0) {
    var block = document.createElement("div");
    var hole = document.createElement("div");
    block.setAttribute("class", "block");
    hole.setAttribute("class", "hole");
    block.setAttribute("id", "block" + counter);
    hole.setAttribute("id", "hole" + counter);

    // adding 100px on the top to the new block created 
    block.style.top = blockLastTop + 60 + "px";
    hole.style.top = holeLastTop + 60 + "px";

    // generate the 'holes' randomly
    var random = Math.floor(Math.random() * 360);
    hole.style.left = random + "px";
    game.appendChild(block);
    game.appendChild(hole);
    currentBlock.push(counter);
    counter++;
  }

  var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("Left"));
  var drop = 0;

  if (characterTop <= 0) {
    alert("Game Over. Score: " + (counter - 9));
    clearInterval(blocks);
    location.reload();
  }

  // for the blocks to keep going on repeatedly
  for (let i = 0; i < currentBlock.length; i++) {
    let current = currentBlock[i];
    let iblock = document.getElementById("block" + current);
    let ihole = document.getElementById("hole" + current);
    var iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
    let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
    iblock.style.top = iblockTop - 0.5 + "px";
    ihole.style.top = iblockTop - 0.5 + "px";
    console.log(iholeLeft);
    console.log(characterLeft);
    if (iblockTop <=-22) {
      currentBlock.shift();
      iblock.remove();
      ihole.remove();
    }
    // checks if the ball is on top of the block
    if (iblockTop - 21 <= characterTop && iblockTop > characterTop) {
      drop++;
      if (iholeLeft <= characterLeft && iholeLeft + 21 >= characterLeft) {

        drop = 0;
      }
    }
  }
  if (drop == 0) {
    if (characterTop<480) {
      character.style.top = characterTop + 2 + "px";  
    }
  } else {
    character.style.top = characterTop - 0.5 + "px";
  }
}, 5);


