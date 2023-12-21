let currentPlayer = 'X';
let gameBoard = Array(9).fill('');
const statusDisplay = document.getElementById('status');
const board = document.getElementById('board');

function handleCellClick(index) {
  if (gameBoard[index] === '' && !checkGameEnd()) {
    gameBoard[index] = currentPlayer;
    updateBoard();
    if (!checkGameEnd()) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function updateBoard() {
  board.innerHTML = '';
  gameBoard.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell;
    cellElement.addEventListener('click', () => handleCellClick(index));
    board.appendChild(cellElement);
  });
}

function checkGameEnd() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
      statusDisplay.textContent = `Player ${currentPlayer} wins!`;
      return true;
    }
  }

  if (!gameBoard.includes('')) {
    statusDisplay.textContent = "It's a draw!";
    return true;
  }

  return false;
}

function resetGame() {
  currentPlayer = 'X';
  gameBoard = Array(9).fill('');
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  updateBoard();
}

// Initial setup
updateBoard();

