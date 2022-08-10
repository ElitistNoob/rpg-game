import Character from './Character.js'

const getDiceRollArray = (diceCount) => 
    new Array(diceCount).fill(0).map(() => 
        Math.floor(Math.random() * 6 ) + 1
    )
 
const getPercentage = (remainingHealth, maxHealth) => 
    (100 * remainingHealth) / maxHealth
    
const getPlaceholderDiceHtml = (diceCount) => 
    new Array(diceCount).fill(0).map(() =>
       `<div class="placeholder-dice"></div>`
    ).join('')

const randomPercent = (min, max) =>
     (Math.floor(Math.random() * (max - min + 1)) + min) / 100
     
const randomNumber = () => {
    return Math.floor(Math.random() * 100) + 1
}

export {getPlaceholderDiceHtml, getDiceRollArray, getPercentage, randomPercent, randomNumber} 