const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageText = document.querySelector("[data-winning-message] p");
const winningMessageElement = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector(".restart-btn");

let isCircleTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("x");
  board.classList.remove("circle");

  isCircleTurn ? board.classList.add("circle") : board.classList.add("x");
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every(
    (cell) => cell.classList.contains("x") || cell.classList.contains("circle")
  );
};

const endGame = (isDraw) => {
  if (isDraw) winningMessageText.innerText = "Tied!";
  else winningMessageText.innerText = `${isCircleTurn ? "Circle" : "X"} win!`;

  winningMessageElement.classList.add("show-winning-message");
};

const handleClick = (e) => {
  const classToAdd = isCircleTurn ? "circle" : "x";
  placeMark(e.target, classToAdd);

  const isWin = checkForWin(classToAdd);
  const isDraw = checkForDraw();

  if (isWin) return endGame(false);
  if (isDraw) return endGame(true);

  swapTurns();
};

const startGame = () => {
  cellElements.forEach((cell) => {
    cell.classList.remove("circle");
    cell.classList.remove("x");

    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });

  isCircleTurn = false;

  board.classList.add("x");

  setBoardHoverClass();
  winningMessageElement.classList.remove("show-winning-message");
};

startGame();

restartButton.addEventListener("click", startGame);
