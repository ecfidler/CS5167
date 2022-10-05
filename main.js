let temperatureInput = document.getElementById("temp-input");
let temperatureLabel = document.getElementById("temp-label");

let temperatureValue = 85;
let pressureValue = 50;

// move gradient
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

function updatePressure(val) {
    let value = `${val}%`;
    document.getElementById("pressure-label").innerHTML = value;
    pressureValue = val;
}
