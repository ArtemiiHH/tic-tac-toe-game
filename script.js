const gameBoard = (function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];
    // Cell ID
    let cellId = 0;

    // Get 2D array
    for (let i = 0; i < rows; i++) {
        board[i] = [];

        for (let j = 0; j < columns; j++) {
            board[i][j] = cellId++;
        }
    }
    // Display 2D array
    console.log(board);

    // const getBoard = () => board;
})();




function Player(name, symbol) {
    return { name, symbol };
};



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



const gameController = (function GameController() {
    const playerOne = new Player('Tim', 'X');
    const playerTwo = new Player('John', 'O');

    let currentPlayer = playerOne;

    currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;

    for (let i = 0; i < board; i++) {
        if (board[i]) {
            board[i].push(currentPlayer.symbol);
        }
    }
})();