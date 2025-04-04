"use strict";
const rockBtn = document.querySelector("#rockBtn");
const paperBtn = document.querySelector("#paperBtn");
const resetBtn = document.querySelector("#resetBtn");
const scissorsBtn = document.querySelector("#scissorsBtn");
const resultEl = document.querySelector("#resultEl");
const scoreEl = document.querySelector("#scoreEl");
const moves = document.querySelector(".moves");

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

let result = "";
let computerMove = "";

scoreEl.innerHTML = `<span>Wins: ${score.wins}</span> -  <span>Loses: ${score.losses}</span> - <span>Ties: ${score.ties}</span>`;

rockBtn.addEventListener("click", () => {
  compareMove("rock");
});

paperBtn.addEventListener("click", () => {
  compareMove("paper");
});

scissorsBtn.addEventListener("click", () => {
  compareMove("scissors");
});

// function to determine computer's move
const getComputerMove = function () {
  const randomMove = Math.random();
  if (randomMove >= 0 && randomMove < 1 / 3) {
    computerMove = "rock";
  } else if (randomMove >= 1 / 3 && randomMove < 2 / 3) {
    computerMove = "paper";
  } else if (randomMove >= 2 / 3 && randomMove < 1) {
    computerMove = "scissors";
  }
};

//function to check player move vs computer move
const compareMove = function (playerMove) {
  getComputerMove();

  // if both move are the same
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
      moves.innerHTML = `
      <span>You <img src="imgs/rock.jpg"/></span>
      <span>Computer <img src="imgs/rock.jpg"/></span>
      `;
    }
    //if computer move is paper
    else if (computerMove === "paper") {
      result = "You Lose";
      moves.innerHTML = `
      <span>You <img src="imgs/rock.jpg"/></span>
      <span>Computer <img src="imgs/paper.jpg"/></span>
      `;
    }
    // if computer move is scissors
    else if (computerMove === "scissors") {
      result = "You Win";
      moves.innerHTML = `
      <span>You <img src="imgs/rock.jpg"/></span>
      <span>Computer <img src="imgs/scissors.jpg"/></span>
      `;
    }
  }
  // if both moves are the same
  else if (playerMove === "paper") {
    if (computerMove === "paper") {
      result = "Tie";
      moves.innerHTML = `
      <span>You <img src="imgs/paper.jpg"/></span>
      <span>Computer <img src="imgs/paper.jpg"/></span>
      `;
    }
    // if computer move is different
    else if (computerMove === "scissors") {
      result = "You Lose";
      moves.innerHTML = `
      <span>You <img src="imgs/paper.jpg"/></span>
      <span>Computer <img src="imgs/scissors.jpg"/></span>
      `;
    } else if (computerMove === "rock") {
      result = "You Win";
      moves.innerHTML = `
      <span>You <img src="imgs/paper.jpg"/></span>
      <span>Computer <img src="imgs/rock.jpg"/></span>
      `;
    }
  }
  // if both moves are the same
  else if (playerMove === "scissors") {
    if (computerMove === "scissors") {
      result = "Tie";
      moves.innerHTML = `
      <span>You <img src="imgs/scissors.jpg"/></span>
      <span>Computer <img src="imgs/scissors.jpg"/></span>
      `;
    }
    // if computer move is different
    else if (computerMove === "paper") {
      result = "You Win";
      moves.innerHTML = `
      <span>You <img src="imgs/scissors.jpg"/></span>
      <span>Computer <img src="imgs/paper.jpg"/></span>
      `;
    } else if (computerMove === "rock") {
      result = "You Lose";
      moves.innerHTML = `
      <span>You <img src="imgs/scissors.jpg"/></span>
      <span>Computer <img src="imgs/rock.jpg"/></span>
      `;
    }
  }

  if (result === "You Win") {
    score.wins += 1;
  } else if (result === "You Lose") {
    score.losses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  resultEl.textContent = `${result}.`;
  scoreEl.innerHTML = `<span>Wins: ${score.wins}</span> -  <span>Loses: ${score.losses}</span> - <span>Ties: ${score.ties}</span>`;
};

resetBtn.addEventListener("click", () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  localStorage.removeItem("score");
  scoreEl.innerHTML = `<span>Wins: ${score.wins}</span> -  <span>Loses: ${score.losses}</span> - <span>Ties: ${score.ties}</span>`;
});
