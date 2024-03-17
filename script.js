const boardContainer = document.querySelector(".board-container")
const winnerDisplay = document.querySelector("#winner-display")
const winnerDisplayBtn = document.querySelector("#winner-display-btn")
const winnerDisplayText = document.querySelector("#winner-display-text") 
const resetBtn = document.querySelector("#reset-btn")



winnerDisplayBtn.addEventListener("click", () => {
    console.log("clicked")
    resetGame()
    winnerDisplay.close();
} )

resetGame = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    boardContainer.innerHTML = "";
    winner = null;
    printBoard();
}

resetBtn.addEventListener("click", resetGame)

const createPlayer = function(playerName, playerSymbol) {
    const name = playerName;
    const symbol = playerSymbol;
    return {name, symbol}
}

playerO = createPlayer("Marcus", "O")
playerX = createPlayer("James", "X")
let active = playerO

let activePlayer = playerX
let winner = null;

let board = ["", "", "", "", "", "", "", "", ""]

const playTurn = (player, symbolPosition) => {
    if (!board[symbolPosition])
    board[symbolPosition] = player.symbol;
    activePlayer = activePlayer === playerX ? playerO : playerX;
    determineWinner()
}

const determineWinner = () => {
    // Rows
    if ((board[0] !== "" && board[0] === board[1] && board[0] === board[2]) ||
        (board[3] !== "" && board[3] === board[4] && board[3] === board[5]) ||
        (board[6] !== "" && board[6] === board[7] && board[6] === board[8])
        ) {
        winner = activePlayer;
    } 
    // Columns 
    else if ((board[0] !== "" && board[0] === board[3] && board[0] === board[6]) ||
        (board[1] !== "" && board[1] === board[4] && board[1] === board[7]) ||
        (board[2] !== "" && board[2] === board[5] && board[2] === board[8])) {
        winner = activePlayer;
    } 
    // Diagonals
    else if ((board[0] !== "" && board[0] === board[4] && board[0] === board[8]) ||
        (board[2] !== "" && board[2] === board[4] && board[2] === board[6])) {
        winner = activePlayer;
    } 
    handleWinner()
}

const printBoard = () => {
    for (let i = 0; i < board.length; i++) {
        const cellContainer = createCell(i)    
        boardContainer.appendChild(cellContainer);
    }
}

// Create a cell function factory with an index and unique id 
const createCell = function(i) {
    const cellContainer = document.createElement("div");
    cellContainer.classList.add("cell-container");
    cellContainer.id = `cell-${i}`
    cellContainer.innerHTML = `<p>${board[i]}<p>`;
    (function(index) {cellContainer.addEventListener("click", () => {
        console.log(board)
        playTurn(activePlayer, index)
        document.querySelector(`#cell-${index}`).textContent = board[index]
        console.log(winner)
    })
    })(i);
    return cellContainer
} 

printBoard()

const handleWinner = () => {
    if (winner) {
        winnerDisplayText.innerHTML = `${winner.name} wins!`
        winnerDisplay.showModal()
    }
}





