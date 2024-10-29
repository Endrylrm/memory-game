const emojis = [
  "👾",
  "👾",
  "🤠",
  "🤠",
  "👻",
  "👻",
  "👹",
  "👹",
  "🤖",
  "🤖",
  "😡",
  "😡",
  "🤡",
  "🤡",
  "👽",
  "👽",
];

let openCards = [];

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let iterator = 0; iterator < shuffleEmojis.length; iterator++) {
  let box = document.createElement("div");
  box.className = "card";
  box.innerHTML = shuffleEmojis[iterator];
  box.onclick = handleClick;
  document.querySelector(".game").appendChild(box);
}

function handleClick() {
  if (openCards.length < 2) {
    this.classList.add("cardOpen");
    openCards.push(this);
  }

  if (openCards.length == 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("cardMatch");
    openCards[1].classList.add("cardMatch");
  } else {
    openCards[0].classList.remove("cardOpen");
    openCards[1].classList.remove("cardOpen");
  }

  openCards = [];

  if (document.querySelectorAll(".cardMatch").length === emojis.length) {
    alert("Você venceu!!!");
  }
}
