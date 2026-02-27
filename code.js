const displayPara = document.querySelector('.calc-display');
const digitBtns = document.querySelectorAll('.digit');
const operatorBtns = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('.clear');
const equalBtn = document.querySelector('.equal');
const eraseBtn = document.querySelector('.erase');
const dotBtn = document.querySelector(".dot");
let operand1 = '', operand2 = '', operator = '';
let justCalculated = false;

digitBtns.forEach((btn) => btn.addEventListener('click', onDigitClicked));
operatorBtns.forEach((btn) => btn.addEventListener('click', onOperatorClicked));
clearBtn.addEventListener('click', onClearClicked);
equalBtn.addEventListener('click', onEqualClicked);
eraseBtn.addEventListener('click', onEraseClicked);
dotBtn.addEventListener('click', onDotClicked);

setCleanState();
updateDisplayText();

function onDigitClicked(e) {
    const digit = e.target.textContent;
    processOperand(digit);
    updateDisplayText();
}

function onOperatorClicked(e) {
    if (!operand1) return;
    if (operand2) {
        equalBtn.dispatchEvent(new MouseEvent('click'));
    }

    justCalculated = false;
    operator = e.target.textContent;
    updateDisplayText();
}

function onEraseClicked(e) {
    if (!operand1 || justCalculated) {
        setCleanState();
        updateDisplayText();
        return;
    }

    if (operand2) {
        operand2 = removeLast(operand2);
    } else if (operator) {
        operator = '';
    } else {
        operand1 = removeLast(operand1);
    }
    updateDisplayText();
}

function onEqualClicked() {
    if (!operand1 || !operand2 || !operator) {
        setCleanState();
        return;
    }
    const result = operate(operator, operand1, operand2);
    setCleanState();
    justCalculated = true;
    if (result === null) {
        displayPara.textContent = "ERROR";
        return;
    }
    displayPara.textContent = result.toString();
    operand1 = result.toString();
    updateDisplayText();
}

function onClearClicked() {
    setCleanState();
    updateDisplayText();
}

function onDotClicked(e) {
    processOperand(e.target.textContent);
    updateDisplayText();
}

function operate(operator, operand1, operand2) {
    switch (operator) {
        case '+':
            return +operand1 + +operand2;
        case '-':
            return +operand1 - (+operand2);
        case '*':
            return +operand1 * +operand2;
        case '/':
            if (+operand2 === 0) {
                console.error("ERROR: can't divide by zero");
                return null;
            }
            return Math.round((+operand1 / +operand2) * 1000) / 1000;
        default:
            console.error("ERROR: unknown operator provided");
            return null;
    }
}

function processOperand(digit) {
    const isDot = digit === '.';
    if (justCalculated) {
        operand1 = isDot ? "0." : digit;
        justCalculated = false;
        return;
    }
    if (!operand1 && digit === '0') return;
    if (!operand1 || !operator) {
        if (operand1.includes(".") && isDot) return;

        operand1 += isDot && !operand1 ? "0." : digit;
        return;
    }
    if (operand2.includes(".") && isDot) return;
    operand2 += isDot && !operand2 ? "0." : digit;
}

function setCleanState() {
    justCalculated = false;
    operand1 = '';
    operand2 = '';
    operator = '';
}

function removeLast(string) {
    return string.substring(0, string.length - 1);
}

function updateDisplayText() {
    displayPara.textContent = '';
    if (!operand1) {
        displayPara.textContent = '0';
        return;
    }
    displayPara.textContent += operand1;
    if (!operator) return;
    displayPara.textContent += operator;
    if (!operand2) return;
    displayPara.textContent += operand2;
}