let resetButton = document.getElementById("reset");
let clearButton = document.getElementById("clear");
let greyButton = document.getElementById("grey");
let randButton = document.getElementById("rgb");

let colorChoice;

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function createRow() {
  let element = document.getElementById("grid");
  let row = document.createElement("div");
  row.setAttribute("id", "row");
  element.appendChild(row);
  return row;
}

function createCell(row) {
  let cell = document.createElement("div");
  cell.setAttribute("name", "cell");
  cell.setAttribute("id", "cell");
  cell.setAttribute("onmouseover", "generateColor(this)");
  cell.style.border = "1px solid black";
  row.appendChild(cell);
}

function generateColor(x) {
  if (colorChoice == "grayscale") {
    var randomColor;
    switch (x.style.backgroundColor) {
      case "rgb(24, 24, 24)":
        break;
      case "rgb(48, 48, 48)":
        randomColor = "rgb(24,24,24)";
        break;
      case "rgb(88, 88, 88)":
        randomColor = "rgb(48,48,48)";
        break;
      case "rgb(128, 128, 128)":
        randomColor = "rgb(88,88,88)";
        break;
      case "rgb(192, 192, 192)":
        randomColor = "rgb(128,128,128)";
        break;
      default:
        randomColor = "rgb(192,192,192)";
        break;
    }
  } else {
    randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
  x.style.backgroundColor = randomColor;
}

function createGrid(numRows) {
  let grid = document.createElement("div");
  grid.setAttribute("name", "grid");
  grid.setAttribute("id", "grid");
  document.body.appendChild(grid);
  let numCols = numRows;
  for (let i = 0; i < numRows; i++) {
    let row = createRow();
    for (let j = 0; j < numCols; j++) {
      createCell(row);
    }
  }
}

clearButton.addEventListener("click", () => {
  let cell = document.getElementsByName("cell");
  for (let i = 0; i < cell.length; i++) {
    cell[i].style.backgroundColor = "#ffffff";
  }
});

resetButton.addEventListener("click", () => {
  let prompt = window.prompt("Please set the size of the grid between 0 and 100.");
  console.log(prompt);
  if (prompt == null) {
    return;
  } else if (prompt.length <= 0 || isNaN(prompt)) {
    return;
  } else if (parseInt(prompt) >= 0 && parseInt(prompt) <= 100) {
    let element = document.getElementById("grid");
    element.remove();
    createGrid(parseInt(parseInt(prompt)));
  }
});

randButton.addEventListener("click", () => {
    colorChoice = "default";
});

greyButton.addEventListener("click", () => {
    colorChoice = "grayscale";
});

createGrid(16);
