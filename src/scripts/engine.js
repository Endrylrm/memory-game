const state = {
  views: {
    game: document.querySelector("#game"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    emojis: ["👾", "🤠", "👻", "👹", "🤖", "😡", "🤡", "👽"],
    currentScore: 0,
    currentTime: 60,
    wonGame: false,
  },
  actions: {
    countDownTimer: setInterval(countDown, 1000),
  },
};

let openCards = [];

let shuffledEmojis = state.values.emojis
  // duplicar emojis na lista
  .flatMap((emoji) => [emoji, emoji])
  // randomizar a lista de emojis
  .sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let iterator = 0; iterator < shuffledEmojis.length; iterator++) {
  let box = document.createElement("div");
  box.className = "card";
  box.innerHTML = shuffledEmojis[iterator];
  box.onclick = handleClick;
  state.views.game.appendChild(box);
}

function countDown() {
  if (state.values.wonGame) {
    return;
  }
  state.values.currentTime--;
  state.views.timeLeft.innerHTML = state.values.currentTime;
  if (state.values.currentTime <= 0 && !state.values.wonGame) {
    GameOver(state.values.currentScore);
  }
}

function handleClick() {
  if (state.values.currentTime <= 0) {
    return;
  }

  if (openCards.length < 2) {
    this.classList.add("cardOpen");
    openCards.push(this);
  }

  if (openCards.length == 2) {
    setTimeout(checkMatch, 500);
  }
}

function addScore(score) {
  state.values.currentScore += score;
  state.views.score.innerHTML = state.values.currentScore;
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("cardMatch");
    openCards[1].classList.add("cardMatch");
    addScore(1);
  } else {
    openCards[0].classList.remove("cardOpen");
    openCards[1].classList.remove("cardOpen");
  }

  openCards = [];

  if (
    document.querySelectorAll(".cardMatch").length === shuffledEmojis.length
  ) {
    alert("Você venceu!!!");
    state.values.wonGame = true;
  }
}

function GameOver(score) {
  clearInterval(state.actions.countDownTimer);
  alert("Game Over! o seu resultado foi: " + score);
}
