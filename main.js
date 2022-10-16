let temperatureInput = document.getElementById("temp-input");
let temperatureLabel = document.getElementById("temp-label");

let buttonIDs = [
    "jetPatternButton",
    "showerPatternButton",
    "sprayPatternButton",
    "mistPatternButton",
    "pulsePatternButton",
];

let pageIds = [
    "main-page",
    "music-page",
    "faucet-page",
    "profiles-page",
    "music-page",
];

let profiles = [
    {
        name: "Ethan",
        temperature: 85,
        pressure: 50,
        sprayPattern: "shower",
        totalLength: 630,
    },
    {
        name: "Fidler",
        temperature: 90,
        pressure: 100,
        sprayPattern: "mist",
        totalLength: 900,
    },
    {
        name: "Other",
        temperature: 60,
        pressure: 30,
        sprayPattern: "shower",
        totalLength: 300,
    },
    {
        name: "Presentation",
        temperature: 99,
        pressure: 45,
        sprayPattern: "jet",
        totalLength: 120,
    },
    {
        name: "Simulation",
        temperature: 85,
        pressure: 50,
        sprayPattern: "shower",
        totalLength: 120,
    },
];

// MAIN DATA

let ticker = 0; // flips between 0 and 1 every second
let running = false;
let alertShown = false;

let timedShower = true;
let musicPlaying = false;

let temperatureValue = 85;
let pressureValue = 50;
let sprayPatternValue = "shower";
let activeProfile = "User";
let timeRemaining = 32;
let initialTime = timeRemaining;
let progress = 0;

let waterUsed = 0;

// Main loop to update the main bar

window.setInterval(function () {
    // RUN THE UPDATE TIME FUNCTION HERE
    if (running) {
        timerSecond();

        waterUsed += 132 * (pressureValue / 100);
    }

    // update values
    document.getElementById(
        "temperatureTopDisp"
    ).innerText = `${temperatureValue}°`;

    document.getElementById("pressureTopDisp").innerText = `${pressureValue}%`;

    document.getElementById("currentProfileTopDisp").innerText = activeProfile;

    // update clock
    let time = new Date();
    time = time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    document.getElementById("realTimeTopDisp").innerText = time;

    // update timer
    let mins = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining - mins * 60;

    let timeString = `-${mins}:${seconds}`;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    timeString = `-${mins}:${seconds}`;

    if (ticker) {
        timeString = `-${mins} ${seconds}`;
    }
    ticker = 1 - ticker;

    document.getElementById("timeRemainingTopDisp").innerText = timeString;

    // update progress bar
    progressBar();

    // update music time

    if (musicPlaying) {
        let audio = document.getElementById("musicPlayer");
        document.getElementById("musicTime").innerHTML = `${s_to_mmss(
            audio.currentTime
        )}/${s_to_mmss(audio.duration)}`;
        musicProgressBar();
    }
}, 1000); // every second

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

    temperatureValue = this.value;
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

function inputQuickOutput(el, unit) {
    el.nextElementSibling.value = el.value + unit;
}

// Handling the loading and updating of profiles

function load() {
    temperatureInput.dispatchEvent(new Event("input"));
    document.getElementById("musicPlayer").volume = 0.5;

    waterUsed = 0;

    // profileNameInput
    console.log("loading profiles...");
    profiles.forEach((profile) => {
        addProfileButton(profile);
        console.log(`loaded ${profile.name}`);
    });
}

function addProfileButton(profileData) {
    const el = document.createElement("button");
    el.innerText = profileData.name;
    el.onclick = function () {
        setActiveProfile(profileData.name); //`setActiveProfile(${profile.name})`;
    };
    el.classList.add("generic-button", "profile-select-button");
    document.getElementById("profilesList").appendChild(el);
}

function setActiveProfile(profileName) {
    let profileData = profiles.find((profile) => profile.name == profileName);

    console.log(`Setting profile to: ${profileData}`);
    setInputValues(profileData);
}

function getInputValues() {
    // take in all of the values from the inputs and return an object
    let name = document.getElementById("profileNameInput").value;

    let temperature = document.getElementById("profileTemperatureInput").value;

    let pressure = document.getElementById("profilePressureInput").value;

    let sprayPattern = document.getElementById("selectSprayPattern").value;

    let mins = document.getElementById("timeMinutesInput").value;
    let seconds = document.getElementById("timeSecondsInput").value;
    console.log(mins);
    console.log(seconds);
    let timeTemp = Number(mins) * 60 + Number(seconds);
    console.log(timeTemp);

    return {
        name: name,
        temperature: temperature,
        pressure: pressure,
        sprayPattern: sprayPattern,
        totalLength: timeTemp,
    };
}

function setInputValues(profileObject) {
    // replace all of the values in the inputs with values from an object
    document.getElementById("profileNameInput").value = profileObject.name;

    let tempInput = document.getElementById("profileTemperatureInput");
    tempInput.value = profileObject.temperature;
    inputQuickOutput(tempInput, "°");

    let pressInput = document.getElementById("profilePressureInput");
    pressInput.value = profileObject.pressure;
    inputQuickOutput(pressInput, "%");

    document.getElementById("selectSprayPattern").value =
        profileObject.sprayPattern;

    let mins = Math.floor(profileObject.totalLength / 60);
    let seconds = profileObject.totalLength - mins * 60;
    console.log(`${mins}:${seconds}`);
    document.getElementById("timeMinutesInput").value = mins;
    document.getElementById("timeSecondsInput").value = seconds;
}

function setGlobalValues(profileData) {
    activeProfile = profileData.name;
    console.log(profileData);
    timeRemaining = profileData.totalLength;
    initialTime = timeRemaining;
    progress = 0;
    progressBar();
    waterUsed = 0;
    temperatureValue = profileData.temperature;
    pressureValue = profileData.pressure;
    sprayPatternValue = profileData.sprayPattern;

    updateValues();
}

function updateValues() {
    // then update all meters
    let tempInput = document.getElementById("temp-input");

    tempInput.value = temperatureValue;
    tempInput.dispatchEvent(new Event("input"));

    document.getElementById("pressure-input").value = pressureValue;
    updatePressure(pressureValue);

    setSprayPattern(
        document.getElementById(`${sprayPatternValue}PatternButton`)
    );
}

function newProfile() {
    setInputValues({
        name: "",
        temperature: 85,
        pressure: 50,
        sprayPattern: "shower",
        totalLength: 0,
    });
}

function saveProfile() {
    newData = getInputValues();

    let isExistingIndex = profiles.findIndex(
        (element) => element.name == newData.name
    );

    if (isExistingIndex != -1) {
        profiles[isExistingIndex] = newData;
    } else {
        profiles.push(newData);
        addProfileButton(newData);
    }
}

// functions for the timer

function pausePlayWater(button = None) {
    running = !running;

    if (button) {
        button.innerText = running ? "⏸️" : "▶️";
    }
}

function timerSecond() {
    if (timeRemaining > 0) {
        timeRemaining -= 1;
        console.log(timeRemaining);
    }

    if (timeRemaining <= 0) {
        if (timedShower) {
            pausePlayWater(document.getElementById("showerToggleButton"));
            showWaterUseAlert();
            clearAlert("thirtySecAlert");
        }
    }

    if (timeRemaining == 30) {
        showThirtySecAlert();
    }
}

function showThirtySecAlert() {
    let alert = document.getElementById("thirtySecAlert");
    alert.classList.add("show");
}

function showWaterUseAlert() {
    let alert = document.getElementById("waterUseAlert");
    let used = Math.round(waterUsed / 10) / 100;
    document.getElementById(
        "waterUseText"
    ).innerText = `You used ${used}L of water`;
    alert.classList.add("show");
    waterUsed = 0;
}

function clearAlert(id) {
    let alert = document.getElementById(id);
    alert.classList.remove("show");
}

function addThirtyButton() {
    initialTime += 30;
    timeRemaining += 30;
    clearAlert();
}

function progressBar() {
    progress = 1 - timeRemaining / initialTime;
    let bar = document.getElementById("progressTracking");
    bar.style.width = `${progress * 100}%`;
}

function musicProgressBar() {
    let musicProgress = document.getElementById("playerProgressBar");
    let audio = document.getElementById("musicPlayer");
    let percentage = audio.currentTime / audio.duration;
    musicProgress.style.width = `${percentage * 100}%`;
}

// music player

function playPauseMusic() {
    let button = document.getElementById("playPauseMusicButton");
    let player = document.getElementById("musicPlayer");
    let cover = document.getElementById("musicCover");

    if (musicPlaying) {
        player.pause();
        button.innerText = "▶️";
        cover.classList.remove("playing");
    } else {
        player.play();
        button.innerText = "⏸️";
        cover.classList.add("playing");
    }
    musicPlaying = !musicPlaying;
}

function s_to_mmss(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds - mins * 60);
    if (secs < 10) {
        secs = `0${secs}`;
    }

    return `${mins}:${secs}`;
}

function musicBack() {
    let player = document.getElementById("musicPlayer");
    let button = document.getElementById("playPauseMusicButton");
    player.currentTime = 0;
    if (musicPlaying) {
        player.pause();
        button.innerText = "▶️";
        cover.classList.remove("playing");
    }
}

// run simulation

function runSim() {
    document.getElementById("runSimButton").innerText = "Running...";

    Promise.resolve()
        .then(() => showPage("main-page"))
        .then(() => delay(1000))
        .then(() => pressButtonAction("showProfilesPageButton")) // open the profiles page
        .then(() => delay(2500))
        .then(() => selectProfileAction()) // select the profile
        .then(() => delay(1000))
        .then(() => pressButtonAction("activateProfileButton")) // set the profile active
        .then(() => delay(1000))
        .then(() => showPage("main-page"))
        .then(() => delay(1000))
        .then(() => pressButtonAction("showerToggleButton")) // turn on shower
        .then(() => delay(2000))
        .then(() => changeTemperatureAction(95)) // change the temperature
        .then(() => delay(1000))
        .then(() => pressButtonAction("showMusicPageButton")) // open the music page
        .then(() => delay(2000))
        .then(() => pressButtonAction("playPauseMusicButton"))
        .then(() => delay(5000))
        .then(() => showPage("main-page"))
        .then(() => delay(30000)) // 30000
        .then(() => pressButtonAction("showFaucetPageButton")) // open the faucet page
        .then(() => delay(5000))
        .then(() => pressButtonAction("mistPatternButton"))
        .then(() => delay(5000))
        .then(() => showPage("main-page"))
        .then(() => delay(45000))
        .then(() => pressButtonAction("thirtySecAlertClearButton"))
        .then(() => delay(28000))
        .then(() => pressButtonAction("waterUseAlertClearButton"))
        .then(() => delay(2000))
        .then(() => pressButtonAction("showMusicPageButton")) // open the music page
        .then(() => delay(2000))
        .then(() => pressButtonAction("playPauseMusicButton"))
        .then(() => delay(2000))
        .then(() => showPage("main-page"))
        .then(() => resetRunButton());
}

function delay(duration) {
    // retrived from https://stackoverflow.com/a/62034951/12470778
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

function pressButtonAction(id) {
    button = document.getElementById(id);
    button.focus();

    setTimeout(() => {
        button.click();
    }, 1000);
}

function pressButtonElementAction(el) {
    el.focus();
    setTimeout(() => {
        el.click();
    }, 1000);
}

function changeTemperatureAction(temperature) {
    let tempInput = document.getElementById("temp-input");

    tempInput.value = temperature;
    tempInput.dispatchEvent(new Event("input"));
}

function selectProfileAction() {
    let buttons = document.getElementById("profilesList").children;

    console.log(buttons);
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].innerText == "Simulation") {
            console.log("foundButton");
            pressButtonElementAction(buttons[i]);
        }
    }
}

function resetRunButton() {
    document.getElementById("runSimButton").innerText = "Run simulation";
}
