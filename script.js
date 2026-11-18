// Step 1. Create basic math operations

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return null;
  }
  return num1 / num2;
}

// Step 2. Create three variables => one number, one operator and another number
// Add a flag to check if a first calculation was made or not
// to avoid using "AC" to reset the calculator and just select a new number and start over

let num1 = "";
let operator = "";
let num2 = "";
let calculationProcessed = false;

// Step 3. Create a function that takes an operator and two numbers and then uses one of the above functions on the numbers

function operate(operator, num1, num2) {
  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else if (operator === "/") {
    return divide(num1, num2);
  } else {
    return "ERROR";
  }
}
// Create function to clear the display
const display = document.querySelector("#display");
const clearBtn = document.querySelector(".clear");

function resetCalculator() {
  display.textContent = "";
  display.classList.remove("error-message");

  num1 = "";
  num2 = "";
  operator = "";
  calculationProcessed = false;
}

function setUpACButton() {
  clearBtn.addEventListener("click", resetCalculator);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") resetCalculator();
  });
}

const digitButtons = document.querySelectorAll(".digit");

function setUpDigitButtons() {
  digitButtons.forEach((digitButton) => {
    digitButton.addEventListener("click", (e) => {
      if (!operator) {
        if (calculationProcessed) {
          calculationProcessed = false;
          num1 = e.target.textContent;
        } else {
          num1 += e.target.textContent;
        }
        displayOnScreen(num1);
      } else {
        num2 += e.target.textContent;
        displayOnScreen(num2);
      }
    });
  });
}
setUpDigitButtons();

const operatorButtons = document.querySelectorAll(".operator");

function setUpOperatorButtons() {
  operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", (e) => {
      if (!num2) {
        operator = e.target.textContent;
      } else {
        const result = calculateCurrentOperation();
        if (result === null) {
          return;
        }
        operator = e.target.textContent;
        displayResult(result);
      }
    });
  });
}
setUpOperatorButtons();

const equalsButton = document.querySelector(".equals");

function setUpEqualsButton() {
  equalsButton.addEventListener("click", () => {
    if (!num2) {
      return;
    }
    const result = calculateCurrentOperation();
    if (result === null) {
      return;
    }
    displayResult(result);
    operator = "";
    calculationProcessed = true;
  });
}
setUpEqualsButton();
setUpACButton();

function calculateCurrentOperation() {
  const result = operate(operator, +num1, +num2);

  if (result === null) {
    display.textContent = "Div by zero impossible";
    display.classList.add("error-message");
    num1 = "";
    num2 = "";
    operator = "";
    calculationProcessed = true;

    return null;
  }

  num1 = String(result);
  num2 = "";

  return result;
}

function displayOnScreen(value) {
  display.classList.remove("error-message");
  display.textContent = value;
}

function displayResult(value) {
  const roundedValue = Math.round((value + Number.EPSILON) * 100) / 100;
  displayOnScreen(roundedValue);
}

const decimalBtn = document.querySelector(".decimal");

function setUpDecimalButton() {
  decimalBtn.addEventListener("click", (e) => {
    if (!operator) {
      if (calculationProcessed) {
        calculationProcessed = false;
        num1 = "";
      }
      if (num1.includes(".")) {
        return;
      }
      if (!num1) {
        num1 += "0";
      }
      num1 += e.target.textContent;
      displayOnScreen(num1);
    } else {
      if (num2.includes(".")) {
        return;
      }
      if (!num2) {
        num2 += "0";
      }
      num2 += e.target.textContent;
      displayOnScreen(num2);
    }
  });
}
setUpDecimalButton();
