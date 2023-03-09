// Initialize game board
var gameBoard = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

var currentPlayer = 1;
var winningCondition = 4;

// Function to handle player moves
function playerMove(column) {
  for (var i = gameBoard.length - 1; i >= 0; i--) {
    if (gameBoard[i][column] === 0) {
      gameBoard[i][column] = currentPlayer;
      return i;
    }
  }
  return -1; // Column is full
}

// Function to check for a winning condition
function checkWin(row, column) {
  // Check horizontal
  var count = 0;
  for (var i = 0; i < gameBoard[row].length; i++) {
    if (gameBoard[row][i] === currentPlayer) {
      count++;
      if (count === winningCondition) {
        return true;
      }
    } else {
      count = 0;
    }
  }

  // Check vertical
  count = 0;
  for (var i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i][column] === currentPlayer) {
      count++;
      if (count === winningCondition) {
        return true;
      }
    } else {
      count = 0;
    }
  }

  // Check diagonal (top-left to bottom-right)
  var startRow = row - Math.min(row, column);
  var startColumn = column - Math.min(row, column);
  count = 0;
  for (var i = startRow, j = startColumn; i < gameBoard.length && j < gameBoard[row].length; i++, j++) {
    if (gameBoard[i][j] === currentPlayer) {
      count++;
      if (count === winningCondition) {
        return true;
      }
    } else {
      count = 0;
    }
  }

  // Check diagonal (bottom-left to top-right)
  startRow = row + Math.min(gameBoard.length - 1 - row, column);
  startColumn = column - Math.min(gameBoard.length - 1 - row, column);
  count = 0;
  for (var i = startRow, j = startColumn; i >= 0 && j < gameBoard[row].length; i--, j++) {
    if (gameBoard[i][j] === currentPlayer) {
      count++;
      if (count === winningCondition) {
        return true;
      }
    } else {
      count = 0;
    }
  }

  return false;
}

// Add event listeners to cells
var cells = document.querySelectorAll('.cell');
for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', function() {
    var column = Array.prototype.indexOf.call(cells, this) % 7;
    var row = playerMove(column);
    if (row !== -1) {
  this.style.backgroundColor = (currentPlayer === 1) ? 'red' : 'yellow';
  if (checkWin(row, column)) {
    alert('Player ' + currentPlayer + ' wins!');
    resetGame();
  } else {
    currentPlayer = (currentPlayer === 1) ? 2 : 1;
  }
} else {
  alert('Column is full!');
}
});
}

// Function to reset the game
function resetGame() {
gameBoard = [
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
];

for (var i = 0; i < cells.length; i++) {
cells[i].style.backgroundColor = 'white';
}

currentPlayer = 1;
}
