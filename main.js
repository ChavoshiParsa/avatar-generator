import "./style.css";

const SIZE = 600;

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
  const canvas = document.getElementById(id);
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  return ctx;
}

function draw(ctx, squareSize) {
  for (let i = 0; i < SIZE; i += squareSize) {
    for (let j = 0; j < SIZE; j += squareSize) {
      ctx.fillStyle = blackOrWhite();
      ctx.fillRect(i, j, squareSize, squareSize);
    }
  }
}

const ctx = getCanvas("canvas");

draw(ctx, 50);
