let app = Vue.createApp({
  data() {
    return {
      people: [
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
      ],

      availablePeople: [],
      failedPeople: [],
      currentPerson: {},
      correctGuessesTotal: 0,
      wrongGuessesTotal: 0,
      streak: 0,

      triesLeft: 3,

      showResponse: false,
      showTriesLeft: false,
      correctLabel: "✅ Correct",

      inputValue: "",
      gameIsActive: true,
    };
  },
  methods: {
    resetGame() {
      this.availablePeople = [...this.people];
      this.failedPeople = [];
      this.correctGuessesTotal = 0;
      this.wrongGuessesTotal = 0;

      this.setupGame();
    },

    retryGame() {
      if (this.failedPeople.length === 0) {
        alert("no");
        return;
      }

      this.availablePeople = [...this.failedPeople];
      this.failedPeople = [];
      this.showResponse = false;
      this.showTriesLeft = false;

      this.gameIsActive = true;

      this.setupGame();
    },

    setupGame() {
      this.inputValue = "";
      this.triesLeft = 3;
      if (this.availablePeople.length === 0) {
        this.gameIsActive = false;
        return;
      }

      this.currentPerson = this.randomizePerson();
    },
    randomizePerson() {
      let randomIndex = Math.round(
        Math.random() * (this.availablePeople.length - 1)
      );
      return this.availablePeople[randomIndex];
    },
    submitAnswer(e) {
      e.preventDefault();

      this.showResponse = true;
      if (
        this.inputValue.toLowerCase() === this.currentPerson.name.toLowerCase()
      ) {
        this.correctLabel = "✅ Correct";
        this.showTriesLeft = false;

        this.correctGuessesTotal++;
        this.availablePeople.splice(
          this.availablePeople.indexOf(this.currentPerson),
          1
        );
        this.streak++;
        this.setupGame();
      } else {
        this.triesLeft--;
        this.wrongGuessesTotal++;
        this.streak = 0;

        this.correctLabel = "❌ Incorrect";
        this.showTriesLeft = true;

        if (this.triesLeft === 0) {
          this.failedPeople = this.failedPeople.concat(
            this.availablePeople.splice(
              this.availablePeople.indexOf(this.currentPerson),
              1
            )
          );
          this.setupGame();
        }
      }
    },
  },

  computed: {
    currentPersonPath() {
      return this.currentPerson.path;
    },
    triesLeftLabel() {
      if (this.triesLeft === 3) {
        return "Failed";
      } else {
        return "Tries left: " + this.triesLeft;
      }
    },
    accuracyLabel() {
      Math.round(
        100 *
          (this.correctGuessesTotal /
            (this.wrongGuessesTotal + this.correctGuessesTotal))
      );
    },
  },

  mounted() {
    this.resetGame();
  },
});

app.mount("#app");
