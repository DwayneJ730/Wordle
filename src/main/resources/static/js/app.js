const row1 = document.getElementById("row1").children
const row2 = document.getElementById("row2").children
const row3 = document.getElementById("row3").children
const row4 = document.getElementById("row4").children
const row5 = document.getElementById("row5").children
const row6 = document.getElementById("row6").children

const wordle = document.getElementById("5")
const wordOfTheDay = "APPLE"

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


function start() {
    clearInterval(Interval)
    Interval = setInterval(startTimer, 10);
}

function startTimer() {
    tens++;

    if (tens <= 9) {
        appendTens.innerHTML = "0" + tens;
    }

    if (tens > 9) {
        appendTens.innerHTML = tens;

    }

    if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }

    if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }
}

for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 5; col++) {
        rows.get(row)[col].addEventListener('keypress', (event) => {
            const character = String.fromCharCode(event.charCode);
            if (rows.get(row)[col].innerText.length == 1) {
                event.preventDefault();
            }
            if (/[a-z]/i.test(character)) {
                if (col != 4) {
                    // the character is a letter, so allow it
                    moveCursor(rows.get(row)[col + 1])
                }

            } else if (event.key === "Enter") {
                // Cancel the default action, if needed
                event.preventDefault();
                startTurn(row)
                moveCursor(rows.get(row + 1)[0])

            } else {
                // the character is not a letter, so prevent it from being entered
                event.preventDefault();
            }
        })
    }
    moveCursor(rows.get(0)[0])

    function moveCursor(input) {
        setTimeout(function () { input.focus(); }, 1);
    }

    function startTurn(row) {
        if (row == 0) {
            start()
        }

        let guess = generateGuess(row)
        let colors = compareWords(guess, wordOfTheDay)

        changeColors(row, colors)

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

    function changeColors(row, colors) {
        // change colors according to correctness of user guess
        for (var i = 0; i < 5; i++) {
            rows.get(row)[i].style.backgroundColor = colors[i], "transparent"
        }

        guess = "";
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

        let results = document.getElementById("results")
        let scoreCate = results.children
        scoreCate[0].appendChild(isVictoryText)
        scoreCate[1].appendChild(attemptsText)
        scoreCate[2].appendChild(timeText)

        results.style.visibility = "visible";
        updateFormValues(result, time, attempts)
    }

    function updateFormValues(winOrLoss, time, attempts) {
        let result = document.getElementById("winOrLoss")
        let timer = document.getElementById("time")
        let tries = document.getElementById("attempts")

        timer.value = time
        result.value = winOrLoss
        tries.value = attempts
    }