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



// Player Constructor
function Player(name, symbol) {
    return { name, symbol };
};



// Game controller
const gameController = (function GameController() {
    // Assign 2 players
    const playerOne = Player('Tim', 'X');
    const playerTwo = Player('John', 'O');

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
            console.log('Cell already taken');
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

        if (
            flatBoard[a] === flatBoard[b] &&
            flatBoard[b] === flatBoard[c] &&
            typeof flatBoard[a] !== 'number'
        ) {
            console.log('You win');
        }
    }
};

checkWinner();



// Display DOM logic
function displayGame() {
    // Grab game board
    const gameBoard = document.querySelector('.game-board');

    gameBoard.addEventListener('click', (e) => {
        // Grab cells id and convert to number
        const cellData = Number(e.target.dataset.id);
        // Grab symbol and assign to new variable
        const turnInfo = gameController(cellData);

        // Target the exact cell
        if (e.target.classList.contains('cell')) {
            e.target.style.backgroundColor = '#fcd8ed';
            e.target.textContent = turnInfo.symbolPlaced;
        }
    });
};
displayGame();