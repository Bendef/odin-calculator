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

  // document.addEventListener("keydown", (e) => {
  //   if (e.key === "Escape") resetCalculator();
  // });
}
setUpACButton();

const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");

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
const backspaceBtn = document.querySelector(".backspace");

function useDigits(digit) {
  if (!operator) {
    if (calculationProcessed) {
      calculationProcessed = false;
      num1 = digit;
    } else {
      num1 += digit;
    }
    displayOnScreen(num1);
  } else {
    num2 += digit;
    displayOnScreen(num2);
  }
}

function getDigitButton() {
  digitButtons.forEach((digitBtn) => {
    digitBtn.addEventListener("click", () => useDigits(digitBtn.textContent));
  });
}
getDigitButton();

function useOperator(operatorBtn) {
  if (!num2) {
    operator = operatorBtn;
  } else {
    const result = calculateCurrentOperation();
    if (result === null) {
      return;
    }
    operator = operatorBtn;
    displayResult(result);
  }
}

function getOperator() {
  operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () =>
      useOperator(operatorButton.textContent),
    );
  });
}
getOperator();

function useDecimal() {
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
    num1 += ".";
    displayOnScreen(num1);
  } else {
    if (num2.includes(".")) {
      return;
    }
    if (!num2) {
      num2 += "0";
    }
    num2 += ".";
    displayOnScreen(num2);
  }
}

function getDecimal() {
  decimalBtn.addEventListener("click", useDecimal);
}
getDecimal();

function useEquals() {
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
}

function getEquals() {
  equalsButton.addEventListener("click", useEquals);
}
getEquals();

function useBackspace() {
  if (operator) {
    if (!num2) {
      return;
    }

    num2 = num2.slice(0, -1);
    displayOnScreen(num2);
    return;
  }
  if (calculationProcessed) {
    return;
  }

  if (!num1) {
    return;
  }
  num1 = num1.slice(0, -1);
  displayOnScreen(num1);
}

function getBackspace() {
  backspaceBtn.addEventListener("click", useBackspace);
}
getBackspace();

function setUpKeyboard() {
  const allowedDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const allowedOperators = ["+", "-", "*", "/"];
  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey) {
      return;
    }
    if (allowedDigits.includes(e.key)) {
      useDigits(e.key);
    } else if (allowedOperators.includes(e.key)) {
      useOperator(e.key);
    } else if (e.key === "Escape") {
      resetCalculator();
    } else if (e.key === "Backspace") {
      useBackspace();
    } else if (e.key === "Enter") {
      e.preventDefault();
      useEquals();
    } else if (e.key === "=") {
      useEquals();
    } else if (e.key === "," || e.key === ".") {
      useDecimal();
    }
  });
}
setUpKeyboard();
