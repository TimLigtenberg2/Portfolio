const translations = {
  en: {
    myProjects: "My projects",
    difficulty: "Difficulty",
    theme: "Theme",
    scoreboard: "Scoreboard",
    show: "Show",
    gamesWon: "games won",
    minesLeft: "Mines left",
    showRules: "Show rules",
    yourLuckyNumber: "Your lucky number",
    generate: "Generate",
    close: "Close",
    playCombination: "Play combination",
    drawAcard: "Draw a card",
    sortByNumber: "Sort by number",
    sortByType: "Sort by type",
    leaveGameWarning: "Are you sure you want to leave this page? Your current game will not be saved",
    youWonMinesweeper: "You won! Time: ",
    newPR: "It's a new personal record!",
    clickOkToRestart: "Click OK to restart.",
    time: "Time",
    on: "On",
    noGamesWonYet: "No games won yet.",
    easy: "Easy",
    normal: "Normal",
    hard: "Hard",
    oldSchool: "Old School",
    space: "Space",
    binary: "Binary",
    yourTurn: "It's your turn.",
    notYourTurn: "It's not your turn.",
    drawCard: "Draw card",
    yourLuckyNumber: "Your lucky number",
    noMoreCardsToDraw: "There are no more cards to draw.",
    cantPlayCard: "You can't play this card.",
    draw: "Draw",
    cards: "cards",
    jokerError1: "You can't use more than one joker in a combination",
    invalidCombinationError: "This is not a valid combination.",
    bot1Turn: "It's bot Marco's turn",
    bot2Turn: "It's bot Willard's turn",
    startNewGame: "Click here to start a new game",
    youWon: "You won!",
    bot1Won: "Bot Marco won!",
    bot2Won: "Bot Willard won!",
    correctCode: "The correct code was",
  },
  nl: {
    myProjects: "Mijn projecten",
    difficulty: "Moeilijkheid",
    theme: "Thema",
    scoreboard: "Scorebord",
    show: "Tonen",
    gamesWon: "games gewonnen",
    minesLeft: "Mijnen over",
    showRules: "Toon regels",
    yourLuckyNumber: "Jouw geluksnummer",
    generate: "Genereer",
    close: "Sluiten",
    playCombination: "Speel combinatie",
    drawAcard: "Pak een kaart",
    sortByNumber: "Sorteer op nummer",
    sortByType: "Sorteer op type",
    leaveGameWarning: "Weet je zeker dat je deze pagina wilt verlaten? Je huidige spel wordt niet opgeslagen",
    youWonMinesweeper: "Je hebt gewonnen! Tijd: ",
    newPR: "Dat is een nieuw persoonlijk record!",
    clickOkToRestart: "Klik op OK om opnieuw te starten.",
    time: "Tijd",
    on: "Op",
    noGamesWonYet: "Nog geen games gewonnen.",
    easy: "Makkelijk",
    normal: "Normaal",
    hard: "Moeilijk",
    oldSchool: "Normaal",
    space: "Ruimte",
    binary: "Binair",
    yourTurn: "Jij bent aan de beurt.",
    notYourTurn: "Jij bent niet aan de beurt.",
    drawCard: "Pak kaart",
    yourLuckyNumber: "Jouw geluksnummer",
    noMoreCardsToDraw: "Er zijn geen kaarten meer om te pakken.",
    cantPlayCard: "Je kunt deze kaart niet spelen.",
    draw: "Pak",
    cards: "kaarten",
    jokerError1: "Je kunt niet meer dan één joker in een combinatie gebruiken",
    invalidCombinationError: "Dit is geen geldige combinatie.",
    bot1Turn: "Bot Marco is aan de beurt",
    bot2Turn: "Bot Willard is aan de beurt",
    startNewGame: "Klik hier om een nieuw spel te starten",
    youWon: "Je hebt gewonnen!",
    bot1Won: "Bot Marco heeft gewonnen!",
    bot2Won: "Bot Willard heeft gewonnen!",
    correctCode: "De juiste code was",
  }
};

function setLanguage(lang = "en") {
  localStorage.setItem("preferredLanguage", lang);

  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    const translation = translations[lang][key];
    if (translation) {
      el.textContent = translation;
    }
  });

  setLinkToCombinaceRulesFile(lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("preferredLanguage") || "en";
  setLanguage(savedLang);
});

function setLinkToCombinaceRulesFile(lang) {
  const rulesLink = document.getElementById("show-rules");
  if (rulesLink) {
    rulesLink.href = lang === "nl" ? "regels.txt" : "rules.txt";
  }
}