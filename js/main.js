let paint = document.getElementById("paint");
let ctx = paint.getContext("2d");

let lastStatus;
let isDrawing = false;
let drawingMode = 0;

let positions = {
  prevPos: {
    x: 0,
    y: 0
  },
  currPos: {
    x: 0,
    y: 0
  }
};

paint.addEventListener("mousedown", drawing);

paint.addEventListener("mousemove", draw);

paint.addEventListener("mouseup", notDrawing);

paint.addEventListener("mouseout", notDrawing);

function drawing(evt) {
  let { prevPos } = positions;
  saveStatus();
  isDrawing = true;
  prevPos.x = evt.offsetX;
  prevPos.y = evt.offsetY;
}

function notDrawing(evt) {
  isDrawing = false;
  ctx.closePath();
}

function draw(evt) {
  if (isDrawing) {
    let { prevPos, currPos } = positions;
    currPos.x = evt.offsetX;
    currPos.y = evt.offsetY;
    // console.log(drawingMode)
    switch (drawingMode) {
      case 0:
        line(prevPos, currPos);
        prevPos.x = currPos.x;
        prevPos.y = currPos.y;
        break;
      case 1:
        clearCanvas();
        line(prevPos, currPos);
        break;
      case 2:
        clearCanvas();
        rect(prevPos, currPos);
        break;
      case 3:
        clearCanvas();
        square(prevPos, currPos);
        break;
      case 5:
        clearCanvas();
        circle(prevPos, currPos);
        break;
      default:
        break;
    }
  }
}

function saveStatus() {
  lastStatus = ctx.getImageData(0, 0, 1080, 480);
}

function clearCanvas() {
  ctx.clearRect(0, 0, 1080, 480);
  ctx.putImageData(lastStatus, 0, 0);
  ctx.beginPath();
}

function drawPixel(x, y) {
  ctx.fillRect(x, y, 1, 1);
}

function line(p1, p2) {
  if (!p2) p2 = p1;

  let x1 = p1.x;
  let y1 = p1.y;

  let x2 = p2.x;
  let y2 = p2.y;

  let stepx = 1;
  let stepy = 1;
  let incE = 0;
  let incNE = 0;
  let p = 0;

  let dx = x2 - x1;
  let dy = y2 - y1;

  if (dy < 0) {
    dy = -dy;
    stepy = -1;
  }

  if (dx < 0) {
    dx = -dx;
    stepx = -1;
  }

  let x = x1;
  let y = y1;

  drawPixel(x, y);
  if (dx > dy) {
    p = 2 * dy - dx;
    incE = 2 * dy;
    incNE = 2 * (dy - dx);
    while (x !== x2) {
      x += stepx;
      if (p < 0) {
        p += incE;
      } else {
        y += stepy;
        p += incNE;
      }
      drawPixel(x, y);
    }
  } else {
    p = 2 * dx - dy;
    incE = 2 * dx;
    incNE = 2 * (dx - dy);
    while (y !== y2) {
      y += stepy;
      if (p < 0) {
        p += incE;
      } else {
        x += stepx;
        p += incNE;
      }
      drawPixel(x, y);
    }
  }
}

function rect() {
  let { prevPos, currPos } = positions;

  let p1 = {
    x: prevPos.x,
    y: prevPos.y
  };
  let p2 = {
    x: currPos.x,
    y: prevPos.y
  };
  let p3 = {
    x: currPos.x,
    y: currPos.y
  };
  let p4 = {
    x: prevPos.x,
    y: currPos.y
  };

  line(p1, p2);
  line(p2, p3);
  line(p3, p4);
  line(p4, p1);
}

function square() {
  let { prevPos, currPos } = positions;

  let dx = Math.round(currPos.x - prevPos.x);
  let dy = Math.round(currPos.y - prevPos.y);

  let p1 = {
    x: prevPos.x,
    y: prevPos.y
  };
  let p2 = {
    x: dx < dy ? currPos.x : prevPos.x + dy,
    y: prevPos.y
  };
  let p3 = {
    x: dx < dy ? currPos.x : prevPos.x + dy,
    y: dx > dy ? currPos.y : prevPos.y + dx
  };
  let p4 = {
    x: prevPos.x,
    y: dx > dy ? currPos.y : prevPos.y + dx
  };

  line(p1, p2);
  line(p2, p3);
  line(p3, p4);
  line(p4, p1);
}

function polygon() {}

function circle(p1, p2) {
  let x1 = p1.x;
  let x2 = p2.x;
  let y1 = p1.y;
  let y2 = p2.y;

  let dx = x2 - x1;
  let dy = y2 - y1;

  let r = Math.abs(dx) < Math.abs(dy) ? Math.abs(dx / 2) : Math.abs(dy / 2);

  let center = {
    x: x1 + r,
    y: y1 + r
  };

  let x, y, p;
  x = 0;
  y = r;
  p = 1 - r;

  let centerX = center.x;
  let centerY = center.y;

  if (dx < 0) {
    centerX -= r * 2;
  }

  if (dy < 0) {
    centerY -= r * 2;
  }

  drawSymmetry(centerX, centerY, x, y);

  if (r > 0) {
    while (y > x) {
      x += 1;
      if (p < 0) {
        p += 2 * x + 1;
      } else {
        y -= 1;
        p += 2 * x + 1 - 2 * y;
      }
      drawSymmetry(centerX, centerY, x, y);
    }
  } else {
    while (x > y) {
      x -= 1;
      if (p >= 0) {
        p += 2 * x + 1;
      } else {
        y += 1;
        p += 2 * x + 1 - 2 * y;
      }
      drawSymmetry(centerX, centerY, x, y);
    }
  }

  /* se cicla hasta trazar todo un octante */
}

function drawSymmetry(centerX, centerY, x, y) {
  line({ x: centerX + x, y: centerY + y });
  line({ x: centerX - x, y: centerY - y });
  line({ x: centerX + x, y: centerY - y });
  line({ x: centerX - x, y: centerY + y });
  line({ x: centerX + y, y: centerY + x });
  line({ x: centerX - y, y: centerY - x });
  line({ x: centerX + y, y: centerY - x });
  line({ x: centerX - y, y: centerY + x });
}
