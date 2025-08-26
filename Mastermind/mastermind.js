const currentLang = localStorage.getItem("preferredLanguage") || "en";

let currentRow = $("#row0");
let currentRowFeedback = $("#row0feedback");
let currentBlock = $("#row0block0");
let currentGuess = [];
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
    currentGuess = [];
    code = [];

    generateCode();
}

function generateCode() {
    for (let i = 0; i < 4; i++) {
        code.push(Math.floor(Math.random() * 12));
    }
    console.log(code);
}

function pinClicked(pinNumber) {
    currentGuess.push(pinNumber);
    currentBlock.css("background-image", `url('../assets/mastermind/MastermindPin${getColorName(pinNumber)}.png')`);

    if (currentGuess.length == 4) {
        checkGuess();
    } else {
        let currentBlockId = currentBlock.attr("id");
        currentBlock = $(`#${currentRow.attr("id")}block${parseInt(currentBlockId.charAt(currentBlockId.length - 1)) + 1}`);
    }
}

// TODO:
function removePin() {
    if (currentGuess.length == 0) {
        return;
    }

    currentGuess.pop();
    // TODO: remove image from previous block
}

function checkGuess() {
    if (currentGuess.length < 4) {
        return;
    }

    console.log("User's guess:", currentGuess);

    if (currentGuess === code) {
        alert("You won.");
        return
    }

    showFeedbackPins();

    let nextRowIndex = parseInt(currentRow.attr("id").replace("row", "")) + 1;
    if (nextRowIndex <= 9) {
        currentRow = $("#row" + nextRowIndex);
        currentRowFeedback = $("#row" + nextRowIndex + "feedback");
        currentBlock = $("#row" + nextRowIndex + "block0");
        currentGuess = [];
    } else {
        alert("Game over.");
    }
}

function showFeedbackPins() {
    // Copy arrays to avoid mutating originals
    let guessCopy = [...currentGuess];
    let codeCopy = [...code];
    let feedback = [];

    // First pass: check for correct color and position (black pins)
    for (let i = 0; i < 4; i++) {
        if (guessCopy[i] === codeCopy[i]) {
            feedback.push('black');
            guessCopy[i] = codeCopy[i] = null; // Mark as matched
        }
    }

    // Second pass: check for correct color, wrong position (white pins)
    for (let i = 0; i < 4; i++) {
        if (guessCopy[i] !== null) {
            let idx = codeCopy.indexOf(guessCopy[i]);
            if (idx !== -1) {
                feedback.push('white');
                codeCopy[idx] = null; // Mark as matched
            }
        }
    }

    // Display feedback pins in the feedback row
    for (let i = 0; i < 4; i++) {
        let pinType = feedback[i];
        let feedbackBlock = $(`#${currentRowFeedback.attr("id")}block${i}`);
        let imgSrc = '';
        if (pinType === 'black') {
            imgSrc = "../assets/mastermind/MastermindCorrect2Pin.png";
        } else if (pinType === 'white') {
            imgSrc = "../assets/mastermind/MastermindCorrect1Pin.png";
        } else {
            imgSrc = ""; // No image for empty
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