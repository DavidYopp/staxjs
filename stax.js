const CANVAS_BORDER_COLOUR = 'black';
const CANVAS_BACKGROUND_COLOUR = 'white';
const BRIX_COLOUR = 'lightblue';
const BRIX_BORDER_COLOUR = 'navy';


let brix = [
  {x: 200, y: 650},
  {x: 150, y: 650},
  {x: 100, y: 650},
  {x: 50, y: 650},
];

let GAME_SPEED = 140;
let score = 0;
let dx = 10;
let dy = 650;
let right = true;
let left = false;
let stackPos = [];


const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext("2d");

main();


document.addEventListener("keydown", storePos);

function main() {

  hitWhichWall();
  setTimeout(function onTick() {
    if (stackPos.length > 1){
      if (stackPos[stackPos.length-1].length === 0) {
        return
      } else if (stackPos.length === 14){
         window.alert('You Win');
         return;
     }
    }
    clearCanvas();
    advanceBrix(left, right);
    drawStack();
    drawBrix();

    main();
  }, GAME_SPEED)
}

function clearCanvas() {
  ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
  ctx.strokestyle = CANVAS_BORDER_COLOUR;
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.strokeRect(0,0, gameCanvas.width, gameCanvas.height);
}

function advanceBrix(left, right) {
  if (left) {
    switch (stackPos[stackPos.length-1] ? stackPos[stackPos.length-1].length : 4) {
      case 4:
        brix = [
          {x: brix[0].x-50, y: dy},
          {x: brix[1].x-50, y: dy},
          {x: brix[2].x-50, y: dy},
          {x: brix[3].x-50, y: dy},
        ];
        break;
      case 3:
        brix = [
          {x: brix[0].x-50, y: dy},
          {x: brix[1].x-50, y: dy},
          {x: brix[2].x-50, y: dy},
        ];
        break;
      case 2:
        brix = [
          {x: brix[0].x-50, y: dy},
          {x: brix[1].x-50, y: dy},
        ];
        break;
      case 1:
        brix = [
          {x: brix[0].x-50, y: dy},
        ];
        break;
    }

  } else {
      switch (brix.length) {
        case 4:
          brix = [
            {x: brix[0].x+50, y: dy},
            {x: brix[1].x+50, y: dy},
            {x: brix[2].x+50, y: dy},
            {x: brix[3].x+50, y: dy},
          ];
          break;
        case 3:
          brix = [
            {x: brix[0].x+50, y: dy},
            {x: brix[1].x+50, y: dy},
            {x: brix[2].x+50, y: dy},
          ];
          break;
        case 2:
          brix = [
            {x: brix[0].x+50, y: dy},
            {x: brix[1].x+50, y: dy},
          ];
          break;
        case 1:
          brix = [
            {x: brix[0].x+50, y: dy},
          ];
          break;
      }
  }
}

function hitWhichWall() {
  let hitLeftWall;
  let hitRightWall;
  if (right) {
    hitRightWall = brix[0].x == gameCanvas.width -50;
  }
  if (left) {
    hitLeftWall = brix[brix.length-1].x == 0;
  }
  if (hitLeftWall) {
    right = true
    left = false
    dx = 10
  }
  if (hitRightWall) {
    left = true
    right = false
    dx = -10
  }
}

function drawStack(){
  for (let i of stackPos) {
    i.forEach(drawEachBrick);
  }
}

function drawBrix(){
  brix.forEach(drawEachBrick);
};

function drawEachBrick(brick) {
  ctx.fillStyle = BRIX_COLOUR;
  ctx.strokestyle = BRIX_BORDER_COLOUR;
  ctx.fillRect(brick.x, brick.y, 50, 50);
  ctx.strokeRect(brick.x, brick.y, 50, 50);
}

function checkStackAlign() {
  let newArr = [];
  let lastStack = stackPos[stackPos.length-1]
  let prevStack = stackPos[stackPos.length-2]
  for (let i =0; i < lastStack.length; i++) {
    for (let j=0;j<prevStack.length; j++) {
      if (lastStack[i].x === prevStack[j].x) {
        newArr.push(lastStack[i]);
      }
    }
  }
return newArr;
}

function storePos(event) {
  if (event.keyCode === 32) {
    event.preventDefault();
    dy -= 50
    stackPos.push(brix);
    if (stackPos.length === 1) {
      score += 10;
      document.getElementById('score').innerHTML = score;
    }
    if (stackPos.length > 1){
      score += 10;
      document.getElementById('score').innerHTML = score;
      stackPos[stackPos.length-1]=checkStackAlign();
      if (stackPos.length === 3) {
        GAME_SPEED = 100;
      }
      if (stackPos.length === 6){
        GAME_SPEED = 80;
      }
    }
  }
}
