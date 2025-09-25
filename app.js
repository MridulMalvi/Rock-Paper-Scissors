// ---------------- Dark Mode ----------------
let modebtn = document.querySelector("#mode");
let currmode = "light";
let msg = document.querySelector(".msg");

modebtn.addEventListener("click", () => {
  if (currmode === "light") {
    currmode = "dark";
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    msg.style.backgroundColor = "white";
    msg.style.color = "black";
    modebtn.innerText = "Light Mode";
  } else {
    currmode = "light";
    document.body.style.backgroundColor = "#1dc5f4eb";
    document.body.style.color = "black";
    msg.style.backgroundColor = "black";
    msg.style.color = "white";
    modebtn.innerText = "Dark Mode";
  }
});

// ---------------- Game ----------------
let userscore = 0;
let botscore = 0;

const choices = document.querySelectorAll(".choice");
const userScoreBoard = document.querySelector("#user");
const botScoreBoard = document.querySelector("#computer");
const replayBtn = document.querySelector("#replay");

// Function to get random bot choice
const getbotchoice = () => {
  const option = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return option[randomIndex];
};

// Tie case
const gameDraw = () => {
  msg.innerText = "It's a Tie! 🤝";
  msg.style.backgroundColor = "gray";
};

// User win case
const userWin = (userchoice, botchoice) => {
  userscore++;
  userScoreBoard.innerText = userscore;
  msg.innerText = `You Win! 🎉 ${userchoice} beats ${botchoice}`;
  msg.style.backgroundColor = "green";
  checkWinner();
};

// Bot win case
const botWin = (userchoice, botchoice) => {
  botscore++;
  botScoreBoard.innerText = botscore;
  msg.innerText = `You Lose! 😢 ${botchoice} beats ${userchoice}`;
  msg.style.backgroundColor = "red";
  checkWinner();
};

// Check if someone reached 10
const checkWinner = () => {
  if (userscore === 10 || botscore === 10) {
    choices.forEach((choice) => (choice.style.pointerEvents = "none")); // disable choices

    if (userscore === 10) {
      msg.innerText = "🎉 You are the Champion! 🏆";
      msg.style.backgroundColor = "green";
    } else {
      msg.innerText = "😢 Bot Wins the Game!";
      msg.style.backgroundColor = "red";
    }

    replayBtn.style.display = "inline-block"; // show replay button
  }
};

// Main game logic
const playgame = (userchoice) => {
  const botchoice = getbotchoice();

  if (userchoice === botchoice) {
    gameDraw();
  } else {
    let userWins = true;

    if (userchoice === "rock") {
      userWins = botchoice === "scissors";
    } else if (userchoice === "paper") {
      userWins = botchoice === "rock";
    } else if (userchoice === "scissors") {
      userWins = botchoice === "paper";
    }

    userWins ? userWin(userchoice, botchoice) : botWin(userchoice, botchoice);
  }
};

// Event listeners for choices
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userchoice = choice.getAttribute("id");
    playgame(userchoice);
  });
});

// Replay button click
replayBtn.addEventListener("click", () => {
  userscore = 0;
  botscore = 0;
  userScoreBoard.innerText = userscore;
  botScoreBoard.innerText = botscore;
  msg.innerText = "Play your move!";
  msg.style.backgroundColor = "black";
  msg.style.color = "white";
  replayBtn.style.display = "none";
  choices.forEach((choice) => (choice.style.pointerEvents = "auto")); // enable choices again
});
