import characterData from './data.js'
import Character from './Character.js'

const healthPotion = document.getElementById('health-button')
let monstersArray = ["orc", "goblin", "demon"]
let isWaiting = false
let potionUsed = false

function getNewMonster() {
    const newMonsterData = characterData[monstersArray.shift()]
    return newMonsterData ? new Character(newMonsterData) : {}
}

function attack() {
    if(!isWaiting) {
        wizard.setDiceRollHtml()
        monster.setDiceRollHtml()
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()
        
        if(wizard.isDead) {
            endGame()
            isWaiting = true
        } else if(monster.isDead) {
                isWaiting = true
            if(monstersArray.length > 0) {
                setTimeout(() => {
                    monster = getNewMonster()
                    render() 
                    isWaiting = false
                }, 1500)
            } else {
            endGame()
            isWaiting = true
            }
        } 
    } 
}

function heal() {
    if(!potionUsed) { 
        wizard.restoreHealth(monster)
        healthPotion.innerHTML = `🖤`
        healthPotion.classList.add('disabled-potion')
        potionUsed = true
        render()
    }
    if(wizard.health <= 0){
            endGame()
            isWaiting = true
    }
}

function endGame() {
    const endMessage = wizard.health === 0 && monster.health === 0 ?
        "No victors - all creatures are dead" :
        wizard.health > 0 ? "The Wizard Wins" :
            "The monsters are Victorious"

    const emoji = wizard.health > 0 ? "🧙‍♂️" : "💀"
    setTimeout(() => 
       document.body.innerHTML = `
            <div class="end-game">
                <h2>Game Over</h2> 
                <h3>${endMessage}</h3>
                <p class="end-emoji">${emoji}</p>
            </div>
    `, 1500)  
}

document.getElementById('attack-button').addEventListener('click', attack)
healthPotion.addEventListener('click', heal)
healthPotion.setAttribute("title", 
    "Potion of Fates - Replenishes 30% - 60% of health lost. Has 25% chance of failing and resulting in a loss of health or the enemy getting healed - Use at your own risk!")


function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

const wizard = new Character(characterData.hero)
let monster = getNewMonster()
render()