// Hämtar elementet där timern ska visas
const display = document.getElementById("display");

// Hämtar knapparna för start, stopp och återställning
const startTimerBtn = document.getElementById("startTimerBtn");
const stopTimerBtn = document.getElementById("stopTimerBtn");
const resetTimerBtn = document.getElementById("resetTimerBtn");

// Initialiserar variabler
let timer = null;          // För att hålla intervallet för uppdatering
let startTime = 0;         // Starttid för timern
let elapsedTime = 0;       // Förfluten tid sedan starten
let isRunning = false;     // Håller koll på om timern är igång eller inte

// Funktion för att starta timern
function start() {
    // Starta bara om timern inte redan är igång
    if (!isRunning) {
        // Ställ in starttiden och ta hänsyn till eventuell förfluten tid
        startTime = Date.now() - elapsedTime;
        // Startar uppdateringen av displayen varje 10:e millisekund
        timer = setInterval(update, 10);
        // Sätter timern till igång
        isRunning = true;
    }
}

// Funktion för att stoppa timern
function stop() {
    // Stoppa bara om timern är igång
    if (isRunning) {
        // Stoppar uppdateringen av displayen
        clearInterval(timer);
        // Uppdaterar förfluten tid fram till stoppet
        elapsedTime = Date.now() - startTime;
        // Sätter timern till stoppad
        isRunning = false;
    }
}

// Funktion för att återställa timern
function reset() {
    // Stoppar eventuell pågående timer
    clearInterval(timer);
    // Nollställer starttid och förfluten tid
    startTime = 0;
    elapsedTime = 0;
    // Sätter timern till stoppad
    isRunning = false;
    // Återställer displayen till nolltid
    display.textContent = "00:00:00:00";
}

// Funktion som uppdaterar timerdisplayen varje 10:e millisekund
function update() {
    // Beräknar aktuell tid och förfluten tid
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    // Omvandlar förfluten tid till timmar, minuter, sekunder och millisekunder
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60)); // timmar
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60); // minuter
    let seconds = Math.floor(elapsedTime / 1000 % 60); // sekunder
    let milliSeconds = Math.floor(elapsedTime % 1000 / 10); // millisekunder

    // Formaterar tiden så att den alltid visas med två siffror
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliSeconds = String(milliSeconds).padStart(2, "0");

    // Uppdaterar displayen med den formaterade tiden
    display.textContent = `${hours}:${minutes}:${seconds}:${milliSeconds}`;
}

// Lägger till händelselyssnare på knapparna för att starta, stoppa och återställa timern
startTimerBtn.addEventListener("click", function () {
    console.log("start start"); // Visar i konsolen att timern startar
    start();
});

stopTimerBtn.addEventListener("click", function () {
    stop(); // Stoppar timern när knappen klickas
});

resetTimerBtn.addEventListener("click", function () {
    reset(); // Återställer timern när knappen klickas
});