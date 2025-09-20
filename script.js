const gameBoard = (function Gameboard() {
    const columns = 3;
    const rows = 3;
    const board = [];
    let cellId = 0;

    for (let i = 0; i < rows; i++) {
        board[i] = [];

        for (let j = 0; j < columns; j++) {
            board[i][j] = cellId++;
        }
    }

    console.log(board);

    // const getBoard = () => board;
})();   




function Player(name, symbol) {
    return { name, symbol };
};




const gameController = (function GameController() {

})();