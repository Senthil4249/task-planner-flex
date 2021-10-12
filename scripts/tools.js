// Om Murugan Thunai

/* When the input field receives input, convert the value from fahrenheit to celsius */
function temperatureConverter(event) {
  let valNum;
  let inputFahrenheit = document.getElementById("inputFahrenheit");
  let inputCelcius = document.getElementById("inputCelcius");
  let inputKelvin = document.getElementById("inputKelvin");

  if (event.target.id === "inputFahrenheit") {
    valNum = inputFahrenheit.value;
    valNum = parseFloat(valNum);
    inputCelcius.value = ((valNum - 32) / 1.8).toFixed(2);
    inputKelvin.value = ((valNum - 32) / 1.8 + 273.15).toFixed(2);
  }
  if (event.target.id === "inputCelcius") {
    valNum = inputCelcius.value;
    valNum = parseFloat(valNum);
    inputFahrenheit.value = (valNum * 1.8 + 32).toFixed(2);
    inputKelvin.value = (valNum + 273.15).toFixed(2);
  }
  if (event.target.id == "inputKelvin") {
    valNum = inputKelvin.value;
    valNum = parseFloat(valNum);
    inputFahrenheit.value = ((valNum - 273.15) * 1.8 + 32).toFixed(2);
    inputCelcius.value = (valNum - 273.15).toFixed(2);
  }
}

export { temperatureConverter };
