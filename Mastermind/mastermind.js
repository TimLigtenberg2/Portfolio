const currentLang = localStorage.getItem("preferredLanguage") || "en";

let currentRow = $("#row0");
let currentRowFeedback = $("#row0feedback");
let currentBlock = $("#row0block0");
let currentGuess = [null, null, null, null];
let code = [];

$(function() {
    $(window).on('beforeunload', function(){
        if (code.length > 0) {
            return translations[currentLang].leaveGameWarning;
        }
    });

    initialize();
});

function initialize() {
    currentRow = $("#row0");
    currentRowFeedback = $("#row0feedback");
    currentBlock = $("#row0block0");
    currentGuess = [null, null, null, null];
    code = [];

    generateCode();
    clearBoard();
}

function generateCode() {
    for (let i = 0; i < 4; i++) {
        code.push(Math.floor(Math.random() * 12));
    }
}

function clearBoard() {
    for (let row = 0; row < 10; row++) {
        for (let block = 0; block < 4; block++) {
            $(`#row${row}block${block}`).css("background-image", "none");
            $(`#row${row}feedbackblock${block}`).css("background-image", "none");
        }
        $(`#row${row}`).css("background-image", "none");
        $(`#row${row}feedback`).css("background-image", "none");
    }
}

function pinClicked(pinNumber) {
    var guessIndex = currentGuess.indexOf(null);
    currentGuess[guessIndex] = pinNumber;
    $(currentBlock).css({
        'background-image': `url('../assets/mastermind/MastermindPin${getColorName(pinNumber)}.png')`,
        'cursor': 'pointer'
    });
    $(currentBlock).on('click', function() {
        removePin(this, guessIndex);
    });

    if (currentGuess.length == 4 && currentGuess.every(int => int != null)) {
        checkGuess();
    } else {
        currentBlock = getNewBlockElement();
    }
}

function removePin(block, guessIndex) {
    currentGuess[guessIndex] = null;
    $(block).css({
        "background-image": "none",
        "cursor": "default"
    });
    $(block).off('click');
    currentBlock = getNewBlockElement();
}

function getNewBlockElement() {
    return $(`#${currentRow.attr("id")}block${currentGuess.indexOf(null)}`);
}

function checkGuess() {
    if (currentGuess.length < 4 || currentGuess.some(number => number == null)) {
        return;
    }

    showFeedbackPins();

    if (arraysAreEqual(currentGuess, code)) {
        alert(translations[currentLang].youWon);
        initialize();
        return;
    }

    let nextRowIndex = parseInt(currentRow.attr("id").replace("row", "")) + 1;
    if (nextRowIndex <= 9) {
        makeRowNotInteractive(nextRowIndex - 1);
        currentRow = $("#row" + nextRowIndex);
        currentRowFeedback = $("#row" + nextRowIndex + "feedback");
        currentBlock = $("#row" + nextRowIndex + "block0");
        currentGuess = [null, null, null, null];
    } else {
        alert(
            `Game over. ${translations[currentLang].correctCode}: 
            ${code.map(num => getColorNameTranslated(num)).join(", ")}`
        );
        initialize();
    }
}

function makeRowNotInteractive(rowIndex) {
    for (let i = 0; i < 4; i++) {
        let block = $(`#row${rowIndex}block${i}`);
        $(block).css("cursor", 'default');
        $(block).off('click');
    }
}

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

function showFeedbackPins() {
    // Copy arrays to avoid mutating originals
    let guessCopy = [...currentGuess];
    let codeCopy = [...code];
    let feedback = [];

    // First pass: check for correct color and position (black pins)
    for (let i = 0; i < 4; i++) {
        if (guessCopy[i] === codeCopy[i]) {
            feedback.push('green');
            guessCopy[i] = codeCopy[i] = null; // Mark as matched
        }
    }

    // Second pass: check for correct color, wrong position (white pins)
    for (let i = 0; i < 4; i++) {
        if (guessCopy[i] !== null) {
            let idx = codeCopy.indexOf(guessCopy[i]);
            if (idx !== -1) {
                feedback.push('yellow');
                codeCopy[idx] = null; // Mark as matched
            }
        }
    }

    // Display feedback pins in the feedback row
    for (let i = 0; i < 4; i++) {
        let pinType = feedback[i];
        let feedbackBlock = $(`#${currentRowFeedback.attr("id")}block${i}`);
        let imgSrc = '';
        if (pinType === 'green') {
            imgSrc = "../assets/mastermind/MastermindGroenVinkje.png";
        } else if (pinType === 'yellow') {
            imgSrc = "../assets/mastermind/MastermindGeleWaarschuwing.png";
        } else {
            imgSrc = "../assets/mastermind/MastermindRoodKruis.png";
        }
        feedbackBlock.css("background-image", imgSrc ? `url('${imgSrc}')` : "none");
    }
}

function getColorName(pinNumber) {
    switch (pinNumber) {
        case 0:
            return "Bruin";
        case 1:
            return "Cyaan";
        case 2:
            return "DonkerBlauw";
        case 3:
            return "DonkerGroen";
        case 4:
            return "Geel";
        case 5:
            return "LichtBlauw";
        case 6:
            return "LichtGroen";
        case 7:
            return "Oranje";
        case 8:
            return "Paars";
        case 9:
            return "Rood";
        case 10:
            return "Roze";
        case 11:
            return "Wit";
        default:
            return "";
    }
}

function getColorNameTranslated(pinNumber) {
    switch (pinNumber) {
        case 0:
            return currentLang == "en" ? "Brown" : "Bruin";
        case 1:
            return currentLang == "en" ? "Cyan" : "Cyaan";
        case 2:
            return currentLang == "en" ? "Dark blue" : "Donkerblauw";
        case 3:
            return currentLang == "en" ? "Dark green" : "Donkergroen";
        case 4:
            return currentLang == "en" ? "Yellow" : "Geel";
        case 5:
            return currentLang == "en" ? "Light blue" : "Lichtblauw";
        case 6:
            return currentLang == "en" ? "Light green" : "Lichtgroen";
        case 7:
            return currentLang == "en" ? "Orange" : "Oranje";
        case 8:
            return currentLang == "en" ? "Purple" : "Paars";
        case 9:
            return currentLang == "en" ? "Red" : "Rood";
        case 10:
            return currentLang == "en" ? "Pink" : "Roze";
        case 11:
            return currentLang == "en" ? "White" : "Wit";
        default:
            return "";
    }
}