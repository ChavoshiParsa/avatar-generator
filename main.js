import "./style.css";

const SIZE = 600;

export function GRN(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomColor({ sr, sg, sb }, { er, eg, eb }) {
  const r = GRN(sr, er);
  const g = GRN(sg, eg);
  const b = GRN(sb, eb);
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
  return { ctx, canvas };
}

function draw(ctx, squareSize, rainbow) {
  const colorList = [];

  for (let i = 0; i < SIZE / squareSize / 2; i++) {
    colorList[i] = [];
    for (let j = 0; j < SIZE / squareSize / 2; j++) {
      let color = rainbow
        ? generateRandomColor(
            { sr: 0, sg: 0, sb: 0 },
            { er: 255, eg: 255, eb: 255 }
          )
        : blackOrWhite();
      colorList[i].push(color);
    }
  }

  // console.log(colorList);

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

const { ctx, canvas } = getCanvas("canvas");
const checkboxLine = document.querySelector("#checkboxLine");
const checkboxColor = document.querySelector("#checkboxColor");
const generateButton = document.querySelector(".generateButton");
const downloadButton = document.querySelector(".downloadButton");

let isCheckedLine = checkboxLine.checked;
checkboxLine.addEventListener("change", (e) => {
  isCheckedLine = checkboxLine.checked;
  const verticalLine = document.querySelector(".verticalLine");
  const horizontalLine = document.querySelector(".horizontalLine");
  verticalLine.style.display = isCheckedLine ? "block" : "none";
  horizontalLine.style.display = isCheckedLine ? "block" : "none";
});

let isCheckedColor = checkboxColor.checked;
checkboxColor.addEventListener("change", (e) => {
  isCheckedColor = checkboxColor.checked;
});

generateButton.addEventListener("click", () => {
  const select = document.querySelector("#selector");
  let squareSize = Number(select.value);
  draw(ctx, squareSize, isCheckedColor);
});

downloadButton.addEventListener("click", () => {
  let canvasUrl = canvas.toDataURL();
  const createEl = document.createElement("a");
  createEl.href = canvasUrl;

  createEl.download = "download-this-canvas";

  createEl.click();
  createEl.remove();
});

// setInterval(() => {
//   draw(ctx, 25, false);
// }, 500);
