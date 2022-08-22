let form = document.querySelector("form");
let input = document.querySelector("input");
let faceImage = document.querySelector(".face-image");
let correct = document.querySelector(".correct");
let gameContainer = document.querySelector(".game-container");
let resultContainer = document.querySelector(".result-container");
let resultsCorrect = document.querySelector(".results-correct");
let resultsWrong = document.querySelector(".results-wrong");
let resultsAccuracy = document.querySelector(".results-accuracy");
let resetButton = document.querySelector(".reset-button");
let triesLeftLabel = document.querySelector(".tries-left");
let retryButton = document.querySelector(".retry-button");
let streakLabel = document.querySelector(".streak-label");

let people = [
  {
    name: "Amir Ismail",
    path: "./img/IMG_1329.jpeg",
  },
  {
    name: "Markus Piotrowski",
    path: "./img/IMG_1320.jpeg",
  },
  {
    name: "Robin Barwari",
    path: "./img/IMG_1321.jpeg",
  },
  {
    name: "Samuel Broman",
    path: "./img/IMG_1322.jpeg",
  },
  {
    name: "Charlie Nylund",
    path: "./img/IMG_1323.jpeg",
  },
  {
    name: "Mathias Åhlander",
    path: "./img/IMG_1324.jpeg",
  },
  {
    name: "Albin Norback",
    path: "./img/IMG_1325.jpeg",
  },
  {
    name: "Hugo Lindfors",
    path: "./img/IMG_1326.jpeg",
  },
];

let availablePeople;
let failedPeople;
let currentPerson;
let correctGuessesTotal;
let wrongGuessesTotal;
let streak = 0;

let triesLeft;

let randomizePerson = () => {
  let randomIndex = Math.round(Math.random() * (availablePeople.length - 1));
  return availablePeople[randomIndex];
};

let showResult = () => {
  gameContainer.classList.add("disabled");
  resultContainer.classList.remove("disabled");

  resultsCorrect.innerHTML = correctGuessesTotal;
  resultsWrong.innerHTML = wrongGuessesTotal;
  resultsAccuracy.innerHTML = Math.round(
    100 * (correctGuessesTotal / (wrongGuessesTotal + correctGuessesTotal))
  );
};

let setupGame = () => {
  input.value = "";
  triesLeft = 3;
  if (availablePeople.length === 0) {
    showResult();
    return;
  }

  streakLabel.innerHTML = streak;
  currentPerson = randomizePerson();
  faceImage.setAttribute("src", currentPerson.path);
  console.log(currentPerson);
};

let resetGame = () => {
  availablePeople = [...people];
  failedPeople = [];
  correctGuessesTotal = 0;
  wrongGuessesTotal = 0;
  correct.classList.add("hidden");
  triesLeftLabel.classList.add("hidden");
  gameContainer.classList.remove("disabled");
  resultContainer.classList.add("disabled");

  setupGame();
};

let retryGame = () => {
  if (failedPeople.length === 0) {
    alert("no");
    return;
  }

  availablePeople = [...failedPeople];
  failedPeople = [];
  correct.classList.add("hidden");
  triesLeftLabel.classList.add("hidden");

  gameContainer.classList.remove("disabled");
  resultContainer.classList.add("disabled");

  setupGame();
};

resetGame();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(form);

  if (input.value.toLowerCase() == currentPerson.name.toLowerCase()) {
    correct.classList.remove("hidden");
    correct.innerHTML = "✅ Correct";
    triesLeftLabel.classList.add("hidden");

    correctGuessesTotal++;
    availablePeople.splice(availablePeople.indexOf(currentPerson), 1);
    streak++;
    streakLabel.innerHTML = streak;
    setupGame();
  } else {
    triesLeft--;
    wrongGuessesTotal++;
    streak = 0;
    streakLabel.innerHTML = streak;
    correct.classList.remove("hidden");
    correct.innerHTML = "❌ Incorrect";
    triesLeftLabel.classList.remove("hidden");

    if (triesLeft === 0) {
      triesLeftLabel.innerHTML = "Failed";
      failedPeople = failedPeople.concat(
        availablePeople.splice(availablePeople.indexOf(currentPerson), 1)
      );
      setupGame();
    } else {
      triesLeftLabel.innerHTML = "Tries left: " + triesLeft;
    }
  }
});

resetButton.addEventListener("click", resetGame);

retryButton.addEventListener("click", retryGame);
