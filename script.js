"use strict";
window.addEventListener("DOMContentLoader", init());

function init() {
  const input = document.querySelector("input");
  input.addEventListener("input", trackChange);
  trackChange(input);
}

function trackChange(input) {
  input = document.querySelector("input");
  displayHEX(input);
}

function displayHEX(input) {
  let hexValue = input.value;
  document.querySelector("#output").style.backgroundColor = hexValue;

  let hexCode = document.querySelector("#hex");
  hexCode.textContent = ` ${hexValue}`;

  displayRGB(hexValue);
}

function displayRGB(hexValue) {
  // const inputRGB = hexValue.slice(1);

  const r = Number.parseInt(hexValue.slice(1, 3), 16);
  const g = Number.parseInt(hexValue.slice(3, 5), 16);
  const b = Number.parseInt(hexValue.slice(5), 16);

  document.querySelector("#rgb").textContent = `${r} ${g} ${b}`;
  displayHSL(r, g, b);
}

function displayHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  document.querySelector("#hsl").textContent = `${h} ${s} ${l}`;
}
