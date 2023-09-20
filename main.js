import "./style.css";

const SIZE = 500;

export function GRN(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomColor() {
  const r = GRN(0, 255);
  const g = GRN(0, 255);
  const b = GRN(0, 255);
  return `rgb(${r},${g},${b})`;
}

function blackOrWhite() {
  if (GRN(0, 1) === 1) return "#000";
  else return "#fff";
}

function getCanvas(id) {
  const canvas = document.querySelector(`#${id}`);
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  return ctx;
}

function draw(ctx, squareSize) {
  const colorList = [];

  for (let i = 0; i < SIZE / squareSize / 2; i++) {
    colorList[i] = [];
    for (let j = 0; j < SIZE / squareSize / 2; j++) {
      colorList[i].push(generateRandomColor());
    }
  }

  console.log(colorList);

  for (let i = 0; i < SIZE / 2; i += squareSize) {
    for (let j = 0; j < SIZE / 2; j += squareSize) {
      // console.log(i / squareSize, j / squareSize);
      ctx.fillStyle = colorList[i / squareSize][j / squareSize];
      ctx.fillRect(i, j, squareSize, squareSize);
    }
  }
  for (let i = SIZE / 2; i < SIZE; i += squareSize) {
    for (let j = 0; j < SIZE / 2; j += squareSize) {
      // console.log((SIZE - i) / squareSize - 1, j / squareSize);
      ctx.fillStyle = colorList[(SIZE - i) / squareSize - 1][j / squareSize];
      ctx.fillRect(i, j, squareSize, squareSize);
    }
  }
  for (let i = 0; i < SIZE / 2; i += squareSize) {
    for (let j = SIZE / 2; j < SIZE; j += squareSize) {
      // console.log(i / squareSize, (SIZE - j) / squareSize - 1);
      ctx.fillStyle = colorList[i / squareSize][(SIZE - j) / squareSize - 1];
      ctx.fillRect(i, j, squareSize, squareSize);
    }
  }
  for (let i = SIZE / 2; i < SIZE; i += squareSize) {
    for (let j = SIZE / 2; j < SIZE; j += squareSize) {
      // console.log((SIZE - i) / squareSize - 1, (SIZE - j) / squareSize - 1);
      ctx.fillStyle =
        colorList[(SIZE - i) / squareSize - 1][(SIZE - j) / squareSize - 1];
      ctx.fillRect(i, j, squareSize, squareSize);
    }
  }
  // requestAnimationFrame(draw);
}

const ctx = getCanvas("canvas");

setInterval(() => {
  draw(ctx, 50);
}, 500);
