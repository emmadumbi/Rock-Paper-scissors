const rockBtn = document.querySelector("#rockBtn");
const paperBtn = document.querySelector("#paperBtn");
const resetBtn = document.querySelector("#resetBtn");
const scissorsBtn = document.querySelector("#scissorsBtn");
const resultEl = document.querySelector("#resultEl");
const scoreEl = document.querySelector("#scoreEl");
const moves = document.querySelector(".moves");
const autoplayBtn = document.querySelector("#autoplay");

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

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

let isAutoPlaying = false;
let intervalId;

const autoPlay = () => {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = getComputerMove();
      compareMove(playerMove)
    }, 2000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  };
  autoplayBtn.textContent = isAutoPlaying ? "Auto Playing" : "Auto Play";
};
 
 autoplayBtn.addEventListener("click",autoPlay);
 
// function to determine computer's move
const getComputerMove = function() {
  let computerMove = "";
  const randomMove = Math.random();
  if (randomMove >= 0 && randomMove < 1 / 3) {
    computerMove = "rock";
  } else if (randomMove >= 1 / 3 && randomMove < 2 / 3) {
    computerMove = "paper";
  } else if (randomMove >= 2 / 3 && randomMove < 1) {
    computerMove = "scissors";
  }
  return computerMove;
};

//function to check player move vs computer move
const compareMove = function(playerMove) {
  let result = "";
  const computerMove = getComputerMove();
  
  // if both move are the same
  if (playerMove === "rock") {
    if (computerMove === "scissors") {
      result = "You win";
    }
    //if computer move is paper
    else if (computerMove === "paper") {
      result = "You Lose";
    }
    // if computer move is scissors
    else if (computerMove === "rock") {
      result = "Tie";
    }
  }
  // if both moves are the same
  else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win";
    }
    // if computer move is different
    else if (computerMove === "scissors") {
      result = "You Lose";
    } else if (computerMove === "paper") {
      result = "Tie";
    }
  }
  // if both moves are the same
  else if (playerMove === "scissors") {
    if (computerMove === "paper") {
      result = "You win";
    }
    // if computer move is different
    else if (computerMove === "scissors") {
      result = "Tie";
    } else if (computerMove === "rock") {
      result = "You Lose";
    }
  }
  
  if (result === "You win") {
    score.wins += 1;
  } else if (result === "You Lose") {
    score.losses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }
  
  localStorage.setItem("score", JSON.stringify(score));
  
  resultEl.textContent = result;
  moves.innerHTML = `You <img src="imgs/${playerMove}.png"/> 
  <img src="imgs/${computerMove}.png"/> Computer
  `
  scoreEl.innerHTML = `<span>Wins: ${score.wins}</span> -  <span>Loses: ${score.losses}</span> - <span>Ties: ${score.ties}</span>`;
};

resetBtn.addEventListener("click", () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  
  localStorage.removeItem("score");
  scoreEl.innerHTML = `<span>Wins: ${score.wins}</span> -  <span>Loses: ${score.losses}</span> - <span>Ties: ${score.ties}</span>`;
});