var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#3c60d7";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "brown";
ctx.fillRect(0, 450, canvas.width, 50);

const BoxDx=-5,BirdDy=3.75;
var birdY = 200, birdX = 300, score=0;
var blocks=[{x:900, gap:random()}, {x:1150, gap:random()},{x:1400, gap:random()}, {x:1650, gap:random()},{x:1900, gap:random()}];
for(var i=1;i<blocks.length;i++){
  do{
    blocks[i].gap=blocks[i-1].gap-70+random();
  }while(blocks[i].gap<=10 || blocks[i].gap>=340)
}

document.querySelector("#canvas").addEventListener("mousedown",function () {
  birdY-=25;
})

setInterval(function(){
  if(hasGameEnded()){
    endGame();
  }
  for(i=0;i<blocks.length;i++){
    if(blocks[i].x<=-50)
      replaceBox(i);
  }
  clearCanvas();
  makeBird();
  makeBoxes();
  updateScore();
},50);

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#3c60d7";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "brown";
  ctx.fillRect(0, 450, canvas.width, 50);
}

function makeBird() {
  birdY+=BirdDy;
  ctx.fillStyle = "#fff";
  ctx.fillRect(birdX, birdY, 30, 30);
}

function makeBoxes() {
  for (var i = 0; i < blocks.length; i++) {
    ctx.fillStyle="#91C788";
    blocks[i].x+=BoxDx;
    ctx.fillRect(blocks[i].x, 0, 50, blocks[i].gap);
    ctx.fillRect(blocks[i].x, blocks[i].gap+100, 50, 450-(blocks[i].gap+100));
  }
}

function replaceBox(i) {
  if(i===0){
    blocks[0].x = 1200;
    do{
      blocks[0].gap=blocks[4].gap-70+random();
    }while(blocks[0].gap<=10 || blocks[0].gap>=340)
  }
  blocks[i].x = 1200;
  do{
    blocks[i].gap=blocks[i-1].gap-70+random();
  }while(blocks[i].gap<=10 || blocks[i].gap>=340)
}

function updateScore() {
  for(var i=0;i<blocks.length;i++){
    if(birdX-blocks[i].x===55)
      score++;
  }
  ctx.fillStyle = 'gold';
  ctx.textAlign = 'center';
  ctx.font = 'normal bold 24px serif';
  ctx.fillText('Score : '+score, 70, 35);
}

function random() {
  return Math.round(Math.random()*240);
}

function hasGameEnded() {
  if(birdY>=420){
    return true;
  }
  for (var i = 0; i < blocks.length; i++) {
    if (birdX+30 >= blocks[i].x && birdX <= blocks[i].x + 50) {
      if(birdY<=blocks[i].gap || birdY+30>=blocks[i].gap+100){
        return true;
      }
    }
  }
  return false;
}

function endGame() {
  alert("Your Score is : " + score);
}
