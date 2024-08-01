const { createApp } = Vue

function getRandomValue(max, min)
{
    return Math.floor(Math.random() * (max - min)) + min
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth : 100,
            monsterHealth : 100,
            currentRound: 0
        }
    },
    computed : {
        monsterBarStyle() {
            return {width: this.monsterHealth + '%' }
        },
        playerBarStyle() {
            return { width: this.playerHealth + '%' }
        },
        mayPlayerSpecialAttack() {
            return this.currentRound % 3 !== 0;
        },
        mayPlayerHeal()
        {
            return this.currentRound % 2 !== 0;
        }
    },
    methods : {
        attackMonster() {
            const attackValues = getRandomValue(12, 5);
            this.monsterHealth = this.monsterHealth - attackValues;
            this.currentRound++
            this.attackPlayer()
        },
        attackPlayer() {
            const attackMonsterValues = getRandomValue(12, 8)
            this.playerHealth -= attackMonsterValues
        },
        specialAttackMonster() {
            this.currentRound++
            const specialAttackMonster = getRandomValue(25, 10)
            this.monsterHealth -= specialAttackMonster
        },
        heal()
        {
            const healValue = getRandomValue(10, 5);
            
            if(this.playerHealth + healValue > 100) {
                this.playerHealth = 100
            } else {
                this.playerHealth += healValue;
            }
            this.attackPlayer();

            this.currentRound++
        }
    }
})

app.mount('#game')