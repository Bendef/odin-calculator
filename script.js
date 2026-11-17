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
  num1 = "";
  num2 = "";
  operator = "";
  calculationProcessed = false;
}

function setUpACButton() {
  clearBtn.addEventListener("click", resetCalculator);
}

const digitButtons = document.querySelectorAll(".digit");

function setUpDigitButtons() {
  digitButtons.forEach((digitButton) => {
    digitButton.addEventListener("click", (e) => {
      console.log({ num1, operator, num2 });
      if (!operator) {
        if (calculationProcessed) {
          calculationProcessed = false;
          num1 = e.target.textContent;
        } else {
          num1 += e.target.textContent;
        }
        display.textContent = num1;
      } else {
        num2 += e.target.textContent;
        display.textContent = num2;
      }
    });
  });
}
setUpDigitButtons();

const operatorButtons = document.querySelectorAll(".operator");

function setUpOperatorButtons() {
  operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", (e) => {
      console.log({ num1, operator, num2 });
      if (!num2) {
        operator = e.target.textContent;
      } else {
        num1 = String(operate(operator, +num1, +num2));
        num2 = "";
        operator = e.target.textContent;
        display.textContent = num1;
      }
    });
  });
}
setUpOperatorButtons();

const equalsButton = document.querySelector(".equals");

function setUpEqualsButton() {
  equalsButton.addEventListener("click", () => {
    console.log({ num1, operator, num2 });
    if (!num2) {
      return;
    }
    let result = operate(operator, +num1, +num2);
    display.textContent = Math.round((result + Number.EPSILON) * 100) / 100;
    num1 = String(result);
    num2 = "";
    operator = "";
    calculationProcessed = true;
  });
}
setUpEqualsButton();
setUpACButton();

function evaluate() {}
