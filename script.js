// Create game board
const gameBoard = (function Gameboard() {
    let rows = 3;
    let columns = 3;
    const board = [];

    // Get 2D array
    function updateCell() {
        let cellId = 0;

        for (let i = 0; i < rows; i++) {
            board[i] = [];

            for (let j = 0; j < columns; j++) {
                board[i][j] = cellId++;
            }
        }
    }

    const getBoard = () => board;

    return { getBoard, updateCell, columns, rows };
})();



// Display result text
const result = document.querySelector('.result-text');
// Check if game over flag
let gameOver = false;



// Player Constructor
function Player(name, symbol) {
    return { name, symbol };
};



// Game controller
const gameController = (function GameController() {
    // Assign 2 players
    const playerOne = Player('Player 1', 'X');
    const playerTwo = Player('Player 2', 'O');

    // Player One starts 1st
    let currentPlayer = playerOne;

    // Player Turns function
    return function playTurn(cellId) {
        // Find exact cell
        const row = Math.floor(cellId / gameBoard.columns);
        const col = cellId % gameBoard.columns;
        const board = gameBoard.getBoard();

        // If target cell is a number
        if (typeof board[row][col] === 'number') {
            // Add current players symbol
            board[row][col] = currentPlayer.symbol;

            const placed = { symbol: currentPlayer.symbol, name: currentPlayer.name };
            // Switch turn/player
            currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;

            return {
                symbolPlaced: placed.symbol,
                currentPlayer: placed.name,
                nextPlayer: currentPlayer.name,
                nextSymbol: currentPlayer.symbol
            }

        } else {
            result.textContent = `Cell already taken!`;
        }
    }

})();
// Update cell each time
gameBoard.updateCell();
// Display the game board
console.log(gameBoard.getBoard());



// Check Winner
function checkWinner() {
    const board = gameBoard.getBoard();
    // Flatten board to 1D
    const flatBoard = board.flat();

    const isBoardFull = flatBoard.every(cell => typeof cell !== 'number');

    // Win patterns
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ];

    // Check all patterns
    for (let pattern of winPatterns) {
        // Destructure
        const [a, b, c] = pattern;

        // Check winning combination
        if (
            flatBoard[a] === flatBoard[b] &&
            flatBoard[b] === flatBoard[c] &&
            typeof flatBoard[a] !== 'number'
        ) {
            // Return winning symbol
            return flatBoard[a];
        }
    }

    // Check if board is full
    if (isBoardFull) {
        return 'draw';
    }
    return null;
};



// Display DOM logic
function displayGame() {
    // Grab game board element
    const gameBoardEl = document.querySelector('.game-board');
    // Restart button
    const restartBtn = document.querySelector('.restart-btn');

    gameBoardEl.addEventListener('click', cellClick);
    restartBtn.addEventListener('click', restartGame);

    // Cell click function
    function cellClick(e) {
        if (gameOver) return;

        // Grab cells id and convert to number
        const cellData = Number(e.target.dataset.id);
        // Grab symbol and assign to new variable
        const turnInfo = gameController(cellData);

        if (!turnInfo) return;

        // Target the exact cell
        if (e.target.classList.contains('cell')) {
            // Change cell color when pressed
            e.target.style.backgroundColor = '#fcd8ed';
            // Display X or O in a pressed cell
            e.target.textContent = turnInfo.symbolPlaced;
            // Display result text
            result.textContent = `${turnInfo.nextSymbol}'s turn`;
        }

        let winner = checkWinner();

        // Declare winner
        if (winner === 'X' || winner === 'O') {
            result.textContent = `${turnInfo.symbolPlaced} wins!`;
            gameOver = true;
        } else if (winner === 'draw') {
            result.textContent = `It's a draw`;
            gameOver = true;
        } else {
            result.textContent = `${turnInfo.nextSymbol}'s turn`;
        }
    }

    // Reset game function
    function restartGame() {
        gameBoard.updateCell();
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = '';
        });
        result.textContent = 'New game! X goes first';
        gameOver = false;
    }
}
displayGame();