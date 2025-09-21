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
    const playerOne = new Player('Tim', 'X');
    const playerTwo = new Player('John', 'O');

    // Player One starts 1st
    let currentPlayer = playerOne;

    // Player Turns function
    return function playTurn(cellId) {
        // Find exact cell
        const row = Math.floor(cellId / gameBoard.columns);
        const col = cellId % gameBoard.columns;
        const board = gameBoard.getBoard();

        // If chosen cell is a number
        if (typeof board[row][col] === 'number') {
            // Add current players symbol
            board[row][col] = currentPlayer.symbol;
            // Switch turn
            currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
            // Print players move
            console.log(`${currentPlayer.name}'s turn (${currentPlayer.symbol})`);
        } else {
            console.log('Cell already taken');
        }
    }

})();
// Update cell each time
gameBoard.updateCell();
// Display the game board
console.log(gameBoard.getBoard());
// Add X or O to a certain position
gameController(0);
gameController(3);
gameController(1);
gameController(4);
gameController(2);



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
        flatBoard[a], flatBoard[b], flatBoard[c];

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