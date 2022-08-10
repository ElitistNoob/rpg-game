import {getPlaceholderDiceHtml, getDiceRollArray, getPercentage, randomPercent, randomNumber} from './utils.js'

class Character {
    constructor(data) {
        Object.assign(this, data)
        this.maxHealth = this.health
        this.diceHtml = getPlaceholderDiceHtml(this.diceCount)
    }
    
    setDiceRollHtml() {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceHtml = this.currentDiceScore.map((num) =>
            `<div class="dice">${num}</div>`).join('')
    }
    
    takeDamage(attackArray) {
        this.totalAttackScore = attackArray.reduce((total, num) => total + num) 
        this.health -= this.totalAttackScore
        if(this.health <= 0) {
            this.isDead = true
            this.health = 0
        }
    }
    
    restoreHealth(enemy) {
        const percentage = randomPercent(30, 60)
        const failRate = randomNumber()
        const fateDecider = randomNumber()

        this.lostHealthRestore = Math.floor((this.maxHealth - this.health) * percentage);
        
        if(failRate < 26) {
            if(fateDecider <= 50) {
                enemy.health += this.lostHealthRestore
                if(enemy.health > enemy.maxHealth) {
                    enemy.health = enemy.maxHealth
                } 
            } else {
                this.health -= this.lostHealthRestore 
            }
            if(this.health <= 0) {
                this.health = 0
            }
        } else {
            this.health += this.lostHealthRestore
            if(this.lostHealthRestore < 1 && this.health != this.maxHealth) {
                this.health += 1
            }
        }
    }
    
    getHealthBarHtml() {
        const percent = getPercentage(this.health, this.maxHealth)
        return `
            <div class="health-bar-outer">
                <div class="health-bar-inner ${percent < 26 ? "danger" : ""}" 
                    style="width:${percent}%;">
                </div>
            </div>
        `
    }
    
    getCharacterHtml() {
        const { name, avatar, health, diceCount, diceHtml } = this
        const healthBar = this.getHealthBarHtml()
        return `
            <div class="character-card">
                <h4 class="name">${name}</h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b>${health}</b></div>
                    ${healthBar}
                <div class="dice-container">
                    ${diceHtml}
                </div>
            </div>
        `
    }
}

export default Character