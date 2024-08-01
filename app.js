const { createApp } = Vue;

function getRandomValue(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        };
    },
    computed: {
        monsterBarStyle() {
            return { width: this.monsterHealth + '%' };
        },
        playerBarStyle() {
            return { width: this.playerHealth + '%' };
        },
        mayPlayerSpecialAttack() {
            return this.currentRound % 3 !== 0;
        },
        mayPlayerHeal() {
            return this.currentRound % 2 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'player';
            }
        }
    },
    methods: {
        attackMonster() {
            const attackValue = getRandomValue(12, 5);
            this.monsterHealth = Math.max(this.monsterHealth - attackValue, 0);
            this.currentRound++;
            this.addLogMessage('player', 'attack', attackValue);
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(15, 8);
            this.playerHealth = Math.max(this.playerHealth - attackValue, 0);
            this.addLogMessage('monster', 'attack', attackValue);
        },
        specialAttackMonster() {
            const attackValue = getRandomValue(25, 10);
            this.monsterHealth = Math.max(this.monsterHealth - attackValue, 0);
            this.currentRound++;
            this.addLogMessage('player', 'special-attack', attackValue);
            this.attackPlayer();
        },
        heal() {
            const healValue = getRandomValue(20, 8);
            this.playerHealth = Math.min(this.playerHealth + healValue, 100);
            this.currentRound++;
            this.addLogMessage('player', 'heal', healValue);
            this.attackPlayer();
        },
        surrender() {
            this.winner = 'monster';
            this.addLogMessage('player', 'surrender', 0);
        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
});

app.mount('#game');
