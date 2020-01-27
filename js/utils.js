let pencil = document.querySelector('#pencil');
let lineTool = document.querySelector('#line');
let rectTool = document.querySelector('#rect');
let squareTool = document.querySelector('#square');
let triangleTool = document.querySelector('#triangle');
let circleTool = document.querySelector('#circle');

pencil.onclick = () => {
  drawingMode = 0;
}

lineTool.onclick = () => {
  drawingMode = 1;
}

rectTool.onclick = () => {
  drawingMode = 2;
}

squareTool.onclick = () => {
  drawingMode = 3;
}

triangleTool.onclick = () => {
  drawingMode = 4;
}

circleTool.onclick = () => {
  drawingMode = 5;
}