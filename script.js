const vm = new Vue({
  el: '#app',
  data: {
    gameStarted: false,
    gameLog: [],
    playerHealth: 100,
    monsterHealth: 100,
  },
  methods: {
    startGame() {
      this.gameStarted = true;
      this.gameLog = [];
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    endGame() {
      this.gameStarted = false;
    },
    finishGame(message) {
      if (confirm(message + ' Start New Game?')) {
        this.startGame();
      } else {
        this.endGame();
      }
    },
    attack() {
      const damage = 5 + Math.round(5 * Math.random());
      this.monsterHealth -= damage;
      this.log(`PLAYER HITS MONSTER FOR ${damage}`);
      this.attackPlayer();
    },
    specialAttack() {
      const damage = 10 + Math.round(5 * Math.random());
      this.monsterHealth -= damage;
      this.log(`PLAYER HITS MONSTER HARD FOR ${damage}`);
      this.attackPlayer();
    },
    heal() {
      this.playerHealth =
        this.playerHealth >= 80 ? 100 : this.playerHealth + 20;
      this.log(`PLAYER HEALS HIMSELF FOR 20`);
      this.attackPlayer();
    },
    attackPlayer() {
      if (this.monsterHealth <= 0) {
        this.finishGame('You Won!');
      } else {
        const damage = 8 + Math.round(7 * Math.random());
        this.playerHealth -= damage;
        this.log(`MONSTER HITS PLAYER FOR ${damage}`);
        if (this.playerHealth <= 0) {
          this.finishGame('You Lost!');
        }
      }
    },
    log(message) {
      this.gameLog.unshift(message);
    },
  },
  computed: {
    playerWidth() {
      return `width: ${this.playerHealth}%;`;
    },
    monsterWidth() {
      return `width: ${this.monsterHealth}%;`;
    },
  },
});