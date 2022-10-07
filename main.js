let temperatureInput = document.getElementById("temp-input");
let temperatureLabel = document.getElementById("temp-label");

let buttonIDs = [
    "jetPatternButton",
    "showerPatternButton",
    "sprayPatternButton",
    "mistPatternButton",
    "pulsePatternButton",
];

let pageIds = ["main-page", "music-page", "faucet-page", "profiles-page"];

// MAIN DATA (will be refactored into a data structure)

let temperatureValue = 85;
let pressureValue = 50;
let sprayPatternValue = "shower";
let activeProfile = "Ethan Fidler";
let timeRemaining = "0";

// move gradient on main page slider
temperatureInput.addEventListener("input", function () {
    //Change slide thumb color on way up 17.5 intervals
    if (this.value > 68) {
        temperatureInput.classList.add("ltpurple");
        temperatureLabel.classList.add("ltpurple");
    }
    if (this.value > 85) {
        temperatureInput.classList.add("purple");
        temperatureLabel.classList.add("purple");
    }
    if (this.value > 103) {
        temperatureInput.classList.add("pink");
        temperatureLabel.classList.add("pink");
    }

    //Change slide thumb color on way down
    if (this.value < 68) {
        temperatureInput.classList.remove("ltpurple");
        temperatureLabel.classList.remove("ltpurple");
    }
    if (this.value < 85) {
        temperatureInput.classList.remove("purple");
        temperatureLabel.classList.remove("purple");
    }
    if (this.value < 103) {
        temperatureInput.classList.remove("pink");
        temperatureLabel.classList.remove("pink");
    }

    // update
    document.getElementById("temp-label").innerHTML = `${this.value}°`;
    temperature = this.value;
});

function showPage(pageId) {
    pageIds.forEach((page) => {
        document.getElementById(page).classList.add("page-hidden");
    });
    document.getElementById(pageId).classList.remove("page-hidden");
}

function updatePressure(val) {
    let value = `${val}%`;
    document.getElementById("pressure-label").innerHTML = value;
    pressureValue = val;
}

function setSprayPattern(button) {
    buttonIDs.forEach((bid) => {
        document
            .getElementById(bid)
            .classList.remove("spray-select-button-active");
    });

    button.classList.add("spray-select-button-active");

    // let icon = document.getElementById("spray-pattern-icon");
    // icon.src = `/assets/spray-patterns/${button.value}.png`;

    const icons = document.getElementsByClassName("spray-disp");
    for (let i = 0; i < icons.length; i++) {
        icons[i].src = `/assets/spray-patterns/${button.value}.png`;
    }
}
