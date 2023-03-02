const row1 = document.getElementById("row1").children
const row2 = document.getElementById("row2").children
const row3 = document.getElementById("row3").children
const row4 = document.getElementById("row4").children
const row5 = document.getElementById("row5").children
const row6 = document.getElementById("row6").children

const wordle = document.getElementById("5")

let wordOfTheDay = ""

const rows = new Map(
    [
        [0, row1],
        [1, row2],
        [2, row3],
        [3, row4],
        [4, row5],
        [5, row6],
    ]
)

let win = false;
var seconds = 00;
var tens = 00;
var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")
var Interval;

let letterToKeys = {}
main()

async function main() {
	generateKeyboard()
	letterToKeys = createLetterToKeyDict()
    wordOfTheDay = await getNewWord()
    wordOfTheDay = wordOfTheDay.toUpperCase()
    initializeListenersPerCell()
    moveCursor(rows.get(0)[0])
}

async function getNewWord() {
    try {
        const response = await fetch( "https://random-word-api.herokuapp.com/word?length=5")
        const data = await response.json()
        return data[0]
    } catch (error) {
        console.error(error)
 }
}

function initializeListenersPerCell() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 5; col++) {
            rows.get(row)[col].addEventListener('keypress', playGame)
        }
    }
}

async function playGame(event) {
    var targetID = event.target.id
    var row = (targetID % 5) === 0 ? Math.floor(targetID / 5) - 1 : Math.floor(targetID / 5);
    var col = (targetID - 1) % 5

    const character = String.fromCharCode(event.charCode);
    if (rows.get(row)[col].innerText.length == 1) {
        event.preventDefault()
    }
    if (/[a-z]/i.test(character)) {
        if (col != 4) {
            // the character is a letter, so allow it
            moveCursor(rows.get(row)[col + 1])
        }

    } else if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault()
        startTurn(row)
        
        if(row + 1 < 6) {
			moveCursor(rows.get(row + 1)[0])
		}

    } else {
        // the character is not a letter, so prevent it from being entered
        event.preventDefault();
    }
}

function start() {
    clearInterval(Interval)
    Interval = setInterval(startTimer, 10);
}

function startTimer() {
    tens++;

    if (tens <= 9) {
        appendTens.innerHTML = "0" + tens
    }

    if (tens > 9) {
        appendTens.innerHTML = tens;

    }

    if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds
        tens = 0;
        appendTens.innerHTML = "0" + 0
    }

    if (seconds > 9) {
        appendSeconds.innerHTML = seconds
    }
}

function generateKeyboard() {
	let keys = "QWERTYUIOPASDFGHJKLZXCVBNM"
	
	for(let i = 0; i < keys.length; i++) {
		let tag = document.createElement("li")
		tag.innerText = keys[i]
		tag.style.width = "30 px"
		tag.style.backgroundColor = "black"
		tag.style.border = "solid whitesmoke 2px"
		tag.style.borderRadius = "6px" 
		tag.style.padding = "10px"
		tag.style.textAlign = "center"
		
		if(i < 10) {
			keyRow1.appendChild(tag)
		}
		else if(i < 19) {
			keyRow2.appendChild(tag)
		}
		else {
			keyRow3.appendChild(tag)
		}
	}
}

function moveCursor(input) {
	setTimeout(() => {
		input.focus();
	}, 2)
		
}

function startTurn(row) {
    if (row == 0) {
        start()
    }

    let guess = generateGuess(row)

    let colors = compareWords(guess, wordOfTheDay)

    changeBoardColors(row, colors)
    changeKeyColors(guess, colors)

    if (isGameOver(row, colors) === "win") {
        gameFinished(row, true)
    }
    else if (isGameOver(row, colors) === "lose") {
        gameFinished(row, false)
    }
}

function generateGuess(row) {
    let guess = ""
    // find each letter of input
    for (var i = 0; i < 5; i++) {
        guess += rows.get(row)[i].innerText
    }

    return guess
}

function compareWords(guess, wordOfTheDay) {
    let dictWOTD = wordToDict(wordOfTheDay)
    let guessDict = wordToDict(wordOfTheDay)
    let colors = ["grey", "grey", "grey", "grey", "grey"]

    if (guess.length < 5) {
        return
    }

    // find correct letters, correct place
    for (var i = 0; i < 5; i++) {
        if (guess[i] == wordOfTheDay[i]) {
            colors[i] = "green";
            dictWOTD[wordOfTheDay[i]] -= 1;
            guessDict[guess[i]] -= 1;
        }
    }

    // find correct letters, wrong place 
    for (var i = 0; i < 5; i++) {
        if (guess[i] in dictWOTD && dictWOTD[wordOfTheDay[i]] != 0
            && guessDict[guess[i]] != 0 && colors[i] != "green") {
            colors[i] = "yellow";
            dictWOTD[wordOfTheDay[i]] -= 1;
            guessDict[guess[i]] -= 1;
        }
    }

    return colors;
}

function wordToDict(word) {
    let dict = {}
    // convert word of the day to hashmap
    for (var i = 0; i < word.length; i++) {
        if (word[i] in dict) {
            dict[word[i]] += 1
        }
        else {
            dict[word[i]] = 1
        }
    }
    
    return dict
}

function changeBoardColors(row, colors) {
    // change colors according to correctness of user guess
    for (var i = 0; i < 5; i++) {
        rows.get(row)[i].style.backgroundColor = colors[i], "transparent"
    }
}

function changeKeyColors(guess, colors) {
	for(let i = 0; i < guess.length; i++) {
		let key = letterToKeys[guess[i]]
		
		if(colors[i] == "green") {
			key.style.backgroundColor = "green", "transparent"
		}
		else if(colors[i] == "grey" && (key.style.backgroundColor != "green" || key.style.backgroundColor != "yellow")) {
			key.style.backgroundColor = "#3a3a3c", "transparent"
		}
		else if(colors[i] == "yellow" && key.style.backgroundColor != "green"){
			key.style.backgroundColor = "yellow", "transparent"
		}
	}
}

function createLetterToKeyDict() {
	let keyRow1 = document.getElementById("keyRow1").children
	let keyRow2 = document.getElementById("keyRow2").children
	let keyRow3 = document.getElementById("keyRow3").children
	
	let letterToKey = {}
	
	for(let key1 of keyRow1) {
		letterToKey[key1.innerText] = key1
	}
	
	for(let key2 of keyRow2) {
		letterToKey[key2.innerText] = key2
	}
	
	for(let key3 of keyRow3) {
		letterToKey[key3.innerText] = key3
	}
	
	return letterToKey
}

function isGameOver(row, colors) {
    let winningArr = ["green", "green", "green", "green", "green"]
    if (colors.toString() === winningArr.toString()) {
        return "win"
    }
    if (row == 5) {
        return "lose"
    } else {
        return "continue"
    }
}

function gameFinished(row, result) {
    let attempts = row + 1
    let time = seconds + (tens / 100)
    clearInterval(Interval);
    
    let isVictoryText;

    if (result == true) {
        isVictoryText = document.createTextNode(`You Win!`)
		
    } else {
        isVictoryText = document.createTextNode(`You Lose!`)
        
    }

    let attemptsText = document.createTextNode(`Attempts: ${attempts}`)
    let timeText = document.createTextNode(`Time: ${time}`)
    let wordOfTheDayText = document.createTextNode("Word: " + wordOfTheDay)
    
    let results = document.getElementById("results")   
    let scoreInfo = results.children

    scoreInfo[0].appendChild(wordOfTheDayText)
    scoreInfo[0].style.paddingTop = "30px"
    
    scoreInfo[1].appendChild(isVictoryText)
    if(result) {
		scoreInfo[1].style.color = "green"
	} else {
		scoreInfo[1].style.color = "red"
	}
    scoreInfo[1].style.paddingTop = "30px"
    
    scoreInfo[2].appendChild(attemptsText)
    scoreInfo[2].style.paddingTop = "30px"
    
    scoreInfo[3].appendChild(timeText)
    scoreInfo[3].style.paddingBottom = "50px"
    
	setTimeout(() => {
  		results.style.visibility = "visible"
	}, "500")
    
    updateFormValues(result, time, attempts)
}

function updateFormValues(winOrLoss, time, attempts) {
    let result = document.getElementById("winOrLoss")
    let timer = document.getElementById("time")
    let tries = document.getElementById("attempts")
	
	if(result) {
		timer.value = time
    	result.value = winOrLoss
    	tries.value = attempts
	}
}