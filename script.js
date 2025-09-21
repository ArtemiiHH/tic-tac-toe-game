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



function Player(name, symbol) {
    return { name, symbol };
};



const gameController = (function GameController() {
    const playerOne = new Player('Tim', 'X');
    const playerTwo = new Player('John', 'O');

    let currentPlayer = playerOne;

    return function playTurn(cellId) {
        const row = Math.floor(cellId / gameBoard.columns);
        const col = cellId % gameBoard.columns;
        const board = gameBoard.getBoard();

        if (typeof board[row][col] === 'number') {
            board[row][col] = currentPlayer.symbol;
            currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
        } else {
            console.log('Cell already taken');
        }
    }

})();
gameBoard.updateCell();
console.log(gameBoard.getBoard());
gameController(0); // should place X at top-left
gameController(1);
gameController(8);



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