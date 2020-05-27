const CANVAS_BORDER_COLOUR = 'black';
let CANVAS_BACKGROUND_COLOUR = 'azure';
let BRIX_COLOUR = 'lightblue';
let BRIX_BORDER_COLOUR = 'navy';


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
let brixLength = 4;
let level = 1;
let circleRadius=10;
let transitionDone = false;
let initialLoad = true;
let gameEnd = false;

const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext("2d");

// clearCanvas();

document.addEventListener("keydown", storePos);
document.getElementById('reloadBtn').style.visibility = "hidden";

clearCanvas();
drawGrad();

function drawGrad() {
  if (circleRadius===700) {
    if (gameEnd){
      drawStack();
      return;
    } else {
      ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
      ctx.fill();
      circleRadius = 10;
      GAME_SPEED = 140;
      transitionDone = true;
      stackPos = [];
      dx = 10;
      dy = 650;
      right = true;
      left = false;
      brix = [
        {x: 200, y: 650},
        {x: 150, y: 650},
        {x: 100, y: 650},
        {x: 50, y: 650},
      ];
      if (level === 2) {
        brixLength = 4;
        GAME_SPEED = 120;
        BRIX_COLOUR = 'green';
        BRIX_BORDER_COLOUR = 'darkgreen';
        CANVAS_BACKGROUND_COLOUR = 'palegreen'
      }
      if (level === 3) {
        brixLength = 3;
        GAME_SPEED = 120;
        BRIX_COLOUR = 'lavender';
        BRIX_BORDER_COLOUR = 'purple';
        CANVAS_BACKGROUND_COLOUR = 'mediumorchid'
      }
      if (level === 4) {
        brixLength = 3;
        GAME_SPEED = 100;
        BRIX_COLOUR = 'yellow';
        BRIX_BORDER_COLOUR = 'orange';
        CANVAS_BACKGROUND_COLOUR = 'papayawhip'
      }
      if (level === 5) {
        brixLength = 2;
        GAME_SPEED = 100;
        BRIX_COLOUR = 'pink';
        BRIX_BORDER_COLOUR = 'red';
      }
      return main();
    }
  }
  setTimeout(function onTick() {
    var x = 250;
    var y = 350;
    // Radii of the white glow.
    innerRadius = 5;
    outerRadius = 70;
    // Radius of the entire circle.
    radius = circleRadius;

    let gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
    gradient.addColorStop(0, 'white');
    if (gameEnd){
      gradient.addColorStop(1, 'pink');
    } else {
      gradient.addColorStop(1, CANVAS_BACKGROUND_COLOUR);
    }
    ctx.arc(x, y, radius, 0, 5 * Math.PI);

    ctx.fillStyle = gradient;
    ctx.fill();

    circleRadius += 10;
    ctx.strokeRect(0,0, gameCanvas.width, gameCanvas.height);
    drawGrad();
    drawStack();
  }, 10)
}

function main() {
  hitWhichWall();
  setTimeout(function onTick() {
    if (stackPos.length > 1){
      if (stackPos[stackPos.length-1].length === 0) {
        document.getElementById('reloadBtn').style.visibility = "visible";
        document.removeEventListener("keydown", storePos);
        gameEnd = true;
        clearCanvas();
        drawGrad();
        return
      } else if (stackPos.length === 14){
         if (level === 5) {
           window.alert('You have hit the max score on max level congrats!!');
           window.location.reload();
         }
         window.alert('You Win-continue to next level');
         clearCanvas();
         level += 1;
         if (level === 2) {
           CANVAS_BACKGROUND_COLOUR = 'palegreen'
         }
         if (level === 3) {
           CANVAS_BACKGROUND_COLOUR = 'mediumorchid'
         }
         if (level === 4) {
           CANVAS_BACKGROUND_COLOUR = 'papayawhip'
         }
         if (level === 5) {
           CANVAS_BACKGROUND_COLOUR = 'lavenderblush'
         }
         transitionDone = false;
         drawGrad();
      }
    }
    if (transitionDone){
      clearCanvas();
      advanceBrix(left, right);
      drawStack();
      drawBrix();
      main();
    }
  }, GAME_SPEED)
}

function clearCanvas() {
  if (initialLoad) {
    ctx.fillStyle = 'white';
    initialLoad = false;
  }
  else {
    ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
  }
  ctx.strokestyle = CANVAS_BORDER_COLOUR;
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.strokeRect(0,0, gameCanvas.width, gameCanvas.height);
}

function advanceBrix(left, right) {
  if (left) {
    switch (brixLength) {
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
      switch (brixLength) {
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
      brixLength = stackPos[stackPos.length-1].length;
      if (stackPos.length === 4) {
        if(brixLength > 3){
          brixLength = brixLength;
        }
        GAME_SPEED = 100;
      }
      if (stackPos.length === 7){
        if(brixLength > 2){
          brixLength = brixLength;
        }
        GAME_SPEED = 80;
      }
    }
  }
}
