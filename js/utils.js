let pencil = document.querySelector('#pencil');
let line = document.querySelector('#line');
let rectTool = document.querySelector('#rect');
let squareTool = document.querySelector('#square');

pencil.onclick = () => {
  drawingMode = 0;
  // paint.classList.add('pencil-cursor');

}

line.onclick = () => {
  drawingMode = 1;
  // paint.style.cursor = 'crosshair';
}

rectTool.onclick = () => {
  drawingMode = 2;
  // paint.style.cursor = 'crosshair';
}

squareTool.onclick = () => {
  drawingMode = 3;
  // paint.style.cursor = 'crosshair';
}