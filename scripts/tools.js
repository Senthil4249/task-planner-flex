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

// Calculator Form Calculations
function calculatorDisplay(event) {
  let calcDisplayResult = document.querySelector("#calcDisplayResult");
  // switch staatement for all keys pressed
  console.log("inside function");
  let fisrtValue,
    lastValue = "";
  let calculateResult = 0;
  fisrtValue = calcDisplayResult.value[0];
  lastValue = calcDisplayResult.value[calcDisplayResult.value.length - 1];
  //
  switch (event.target.value) {
    case "C":
      calcDisplayResult.value = "0";
      console.log("inside C");
      break;
    case "0":
      if (calcDisplayResult.value === "0") {
        calcDisplayResult.value = event.target.value;
      } else {
        calcDisplayResult.value += event.target.value;
      }
      break;
    //
    case "+":
    case "-":
    case "*":
    case "/":
      //
      if (Number(fisrtValue) > 0 && Number(fisrtValue) <= 9) {
        if (
          !(
            lastValue == "+" ||
            lastValue == "-" ||
            lastValue == "*" ||
            lastValue == "/"
          )
        ) {
          calcDisplayResult.value += event.target.value;
        }
      }
      break;
    //
    case "=":
      calculateResult = eval(calcDisplayResult.value).toFixed(2);
      //
      console.log(calculateResult - Number(Math.floor(calculateResult)));
      //
      if (calculateResult - Number(Math.floor(calculateResult)) === 0.0) {
        calcDisplayResult.value = Math.floor(calculateResult);
      } else {
        calcDisplayResult.value = calculateResult;
      }
      break;
    //
    default:
      if (calcDisplayResult.value === "0") {
        calcDisplayResult.value = event.target.value;
      } else {
        calcDisplayResult.value += event.target.value;
      }
      break;
  }
} // function close brace
// ----------------------------

//-----------------------------
export { temperatureConverter, calculatorDisplay };
