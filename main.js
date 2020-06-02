/*----- CONSTANTS -----*/

/*----- STATE -----*/
let tiles = [];
let settings = {
  easy: {
    boardSize: 10,
    mines: 10
  },
  medium: {
    boardSize: 16,
    mines: 40
  },
  hard: {
    boardSize: 22,
    mines: 99,
  }
}
let boardSize = 40;
let mines = 10;
let difficulty = settings.easy;

/*----- CACHED ELEMENT REFERENCES -----*/
let BOARD = document.querySelector('.board');
let DIFF = document.getElementById('difficulty');


/*----- EVENT LISTENERS -----*/
DIFF.addEventListener('click', changeDifficulty)
BOARD.addEventListener('click', reveal)


/*----- FUNCTIONS -----*/
function init() {
  clearBoard();
  buildBoard();
  drawNums();
  drawBoard();
}

function reveal(evt) {
  if (evt.target.id === '') return;
  let tileClicked = evt.target.id;
  let x = tileClicked.slice(1, 2);
  let y = tileClicked.slice(3, 4);
  evt.target.classList.add('revealed')
  if (x > 0 && x < difficulty.boardSize && y > 0 && y < difficulty.boardSize) {
    console.log('okay')
  }
  drawNums();
}

function changeDifficulty(evt) {
  difficulty = settings[evt.target.value]
  init()
}

function randomNum() {
  return Math.floor(Math.random() * Math.floor(difficulty.boardSize))
}

function fillMines() {
  for (let i = 0; i < difficulty.mines; i++) {
    let x = randomNum();
    let y = randomNum();
    if (tiles[x][y] === 'm') {
      i--;
    }
    tiles[x][y] = 'm'
    // document.querySelector(`#r${y}c${x}`).textContent = 'm'
  }
}

function drawNums() {
  for (let r = 0; r < tiles.length; r++) {
    let c = tiles[r].indexOf('m');
    while (c >= 0) {
      incr(r - 1, c - 1);
      incr(r - 1, c)
      incr(r - 1, c + 1)
      incr(r, c - 1)
      incr(r, c + 1)
      incr(r + 1, c - 1)
      incr(r + 1, c)
      incr(r + 1, c + 1)
      c = tiles[r].indexOf('m', c + 1)
    }
  }
}

function incr(x, y) {
  if (x < 0) return;
  if (y < 0) return;
  if (y > difficulty.boardSize - 1) return;
  if (x > difficulty.boardSize - 1) return;
  tiles[x][y] >= 0 ? tiles[x][y]++ : 'm'
}

function clearBoard() {
  BOARD.innerHTML = '';
  tiles = []
}

function buildBoard() {
  for (let i = 0; i < difficulty.boardSize; i++) {
    drawRows(i);
  }
  fillMines();
}

function drawRows(colIdx) {
  tiles.push([])
  for (let i = 0; i < difficulty.boardSize; i++) {
    tiles[colIdx].push(0)
  }
}

function drawBoard() {
  for (let x = 0; x < tiles.length; x++) {
    let newRow = document.createElement('div');
    newRow.className = 'row'
    newRow.id = `r${x}`;
    BOARD.appendChild(newRow)
    for (let y = 0; y < tiles[x].length; y++) {
      let newTile = document.createElement('div');
      newTile.className = 'tile'
      newTile.id = `r${x}c${y}`
      newTile.textContent = tiles[x][y]
      document.querySelector(`#r${x}`).appendChild(newTile)
    }
  }
}



init()