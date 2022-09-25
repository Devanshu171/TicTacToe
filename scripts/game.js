function resetGame() {
  activePlayer = 0;
  currentRound = 1;
  gameOverElement;
}
function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players");
    return;
  }
  activePlayerName.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}
function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerName.textContent = players[activePlayer].name;
}
function selectGameField(event) {
  if (event.target.tagName !== "LI") return;
  const selectedFied = event.target;
  const selectedCol = selectedFied.dataset.col - 1;
  const selectedRow = selectedFied.dataset.row - 1;
  if (gameData[selectedRow][selectedCol] > 0) {
    alert("please use others cell");
    return;
  }
  selectedFied.textContent = players[activePlayer].symbol;
  selectedFied.classList.add("disabled");

  gameData[selectedRow][selectedCol] = activePlayer + 1;
  const winnerId = checkForGameOver();
  // console.log(winnerId);
  if (winnerId !== 0) {
    endGame(winnerId);
  }
  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[1][1];
  }
  if (
    gameData[0][2] > 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  ) {
    return gameData[1][1];
  }
  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function endGame(winnerId) {
  gameOverElement.style.display = "block";
  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    // console.log(winnerName);
    document.getElementById("winner-name").textContent = winnerName;
    // gameOverElement.firstElementChild.textContent = winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "Its's a draw!";
  }
}
