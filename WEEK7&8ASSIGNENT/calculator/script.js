const calculator = document.querySelector('.calculator');
const currentValue = document.querySelector('#currentValue');
const previousValue = document.querySelector('#previousValue');

let currentNumber = '0';
let storedNumber = null;
let selectedOperation = null;
let shouldResetScreen = false;

function updateScreen() {
    currentValue.textContent = currentNumber === '0' && storedNumber === null ? '' : currentNumber;
    previousValue.textContent = storedNumber !== null && selectedOperation
        ? `${storedNumber} ${getOperationSymbol(selectedOperation)}`
        : '';
}
function getOperationSymbol(operation) {
    return { add: '+', subtract: '-', multiply: '*', divide: '/' }[operation];
}
function enterNumber(number) {
    if (shouldResetScreen) {
        currentNumber = '0';
        shouldResetScreen = false;
    }
    if (number === 'decimal') {
        if (!currentNumber.includes('.')) {
            currentNumber += '.';
        }
    } else if (currentNumber === '0') {
        currentNumber = number;
    } else {
        currentNumber += number;
    }
    updateScreen();
}
function chooseOperation(operation) {
    if (selectedOperation && !shouldResetScreen) {
        calculate();
    }

    storedNumber = currentNumber;
    selectedOperation = operation;
    shouldResetScreen = true;
    updateScreen();
}

function calculate() {
    if (storedNumber === null || selectedOperation === null) {
        return;
    }
    const firstNumber = Number(storedNumber);
    const secondNumber = Number(currentNumber);
    let result;

    if (selectedOperation === 'add') result = firstNumber + secondNumber;
    if (selectedOperation === 'subtract') result = firstNumber - secondNumber;
    if (selectedOperation === 'multiply') result = firstNumber * secondNumber;
    if (selectedOperation === 'divide') result = secondNumber === 0 ? 'Error' : firstNumber / secondNumber;

    currentNumber = result === 'Error' ? result : String(Number(result.toFixed(10)));
    storedNumber = null;
    selectedOperation = null;
    shouldResetScreen = true;
    updateScreen();
}
function clearCalculator() {
    currentNumber = '0';
    storedNumber = null;
    selectedOperation = null;
    shouldResetScreen = false;
    updateScreen();
}

function deleteNumber() {
    if (shouldResetScreen || currentNumber === 'Error') {
        clearCalculator();
        return;
    }

    currentNumber = currentNumber.length > 1 ? currentNumber.slice(0, -1) : '0';
    updateScreen();
}

calculator.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    if (button.dataset.number) enterNumber(button.dataset.number);
    if (button.dataset.operation) chooseOperation(button.dataset.operation);
    if (button.dataset.action === 'equals') calculate();
    if (button.dataset.action === 'clear') clearCalculator();
    if (button.dataset.action === 'delete') deleteNumber();
});

document.addEventListener('keydown', (event) => {
    if (/^[0-9.]$/.test(event.key)) enterNumber(event.key === '.' ? 'decimal' : event.key);
    if (event.key === 'Enter' || event.key === '=') calculate();
    if (event.key === 'Escape') clearCalculator();
    if (event.key === 'Backspace') deleteNumber();
    if (event.key === '+') chooseOperation('add');
    if (event.key === '-') chooseOperation('subtract');
    if (event.key === '*') chooseOperation('multiply');
    if (event.key === '/') chooseOperation('divide');
});