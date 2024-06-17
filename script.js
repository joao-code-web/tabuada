document.addEventListener("DOMContentLoaded", () => {
    const playerXInput = document.getElementById("playerX");
    const playerOInput = document.getElementById("playerO");
    const startButton = document.getElementById("start-game");
    const boardContainer = document.querySelector(".board");
    const winnerDisplay = document.querySelector(".winner");

    // usei o gpt para poder pegar as imagens do pc

    let playerXImageSrc = "";
    let playerOImageSrc = "";
    let nameX = "";
    let nameO = "";

    playerXInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            playerXImageSrc = URL.createObjectURL(file);
        }
        nameX = file.name
    });

    playerOInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            playerOImageSrc = URL.createObjectURL(file);
        }

        nameO = file.name
    });

    startButton.addEventListener("click", () => {
        if (playerXImageSrc && playerOImageSrc) {
            createBoard();
        } else {
            alert("escolha as imagens");
        }
    });

    function createBoard() {
        boardContainer.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.dataset.index = i;
            square.addEventListener("click", () => {
                handleSquareClick(square);
            });
            boardContainer.appendChild(square);
        }
    }

    function handleSquareClick(square) {
        if (!square.innerHTML) {
            const currentPlayerImage = getCurrentPlayerImage();
            square.innerHTML = `<img src="${currentPlayerImage}" alt="Player Image">`;
            checkWinner();
        }
    }

    function getCurrentPlayerImage() {
        return currentPlayer() === "X" ? playerXImageSrc : playerOImageSrc;
    }

    function currentPlayer() {
        const countX = Array.from(boardContainer.children).filter(square => square.innerHTML.includes(playerXImageSrc)).length;
        const countO = Array.from(boardContainer.children).filter(square => square.innerHTML.includes(playerOImageSrc)).length;
        return countX > countO ? nameX : "X";
    }

    function checkWinner() {
        const squares = Array.from(boardContainer.children);
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const line of lines) {
            const [a, b, c] = line;
            if (squares[a].innerHTML && squares[a].innerHTML === squares[b].innerHTML && squares[a].innerHTML === squares[c].innerHTML) {
                winnerDisplay.textContent = `Jogador ${currentPlayer()} ganhou!`;
                return;
            }
        }
        if (squares.every(square => square.innerHTML)) {
            winnerDisplay.textContent = "Empate!";
        }
    }
});
