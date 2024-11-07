const cells = document.querySelectorAll("[data-cell]");
const player1ScoreElement = document.getElementById("player1Score");
const player2ScoreElement = document.getElementById("player2Score");
const messageElement = document.getElementById("message");
const restartButton = document.getElementById("restartButton");

let player1Score = 0;
let player2Score = 0;
let isPlayer1Turn = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove("x", "o");
        cell.textContent = "";  // Limpar o texto das células
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });
    messageElement.textContent = "";  // Limpar a mensagem
    isPlayer1Turn = true;
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isPlayer1Turn ? "x" : "o";
    cell.classList.add(currentClass);
    cell.textContent = isPlayer1Turn ? "X" : "O";  // Adiciona "X" ou "O" ao texto da célula

    if (checkWin(currentClass)) {
        endGame(false);
        updateScore(currentClass);
    } else if (isDraw()) {
        endGame(true);
    } else {
        isPlayer1Turn = !isPlayer1Turn;
    }
}

function endGame(draw) {
    if (draw) {
        messageElement.textContent = "Empate!";
    } else {
        messageElement.textContent = `${isPlayer1Turn ? "Jogador 1" : "Jogador 2"} venceu!`;
    }
    startGame();
}

function updateScore(winner) {
    if (winner === "x") {
        player1Score++;
        player1ScoreElement.innerText = player1Score;
    } else {
        player2Score++;
        player2ScoreElement.innerText = player2Score;
    }
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains("x") || cell.classList.contains("o");
    });
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

restartButton.addEventListener("click", startGame);

startGame();
