const displayPara = document.querySelector('.calc-display');
const digitBtns = document.querySelectorAll('.digit');
const operatorBtns = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('.clear');
const equalBtn = document.querySelector('.equal');
const eraseBtn = document.querySelector('.erase');
let operand1 = '', operand2 = '', operator = '';

digitBtns.forEach((btn) => btn.addEventListener('click', onDigitClicked));
operatorBtns.forEach((btn) => btn.addEventListener('click', onOperatorClicked));
clearBtn.addEventListener('click', onClearClicked);
equalBtn.addEventListener('click', () => {
    if (!operand1 || !operand2 || !operator) {
        setCleanState();
        return;
    }
    const result = operate(operator, operand1, operand2);
    setCleanState();
    displayPara.textContent = result.toString();
});
eraseBtn.addEventListener('click', onEraseClicked);

setCleanState();

function operate(operator, operand1, operand2) {
    switch (operator) {
        case '+':
            return +operand1 + +operand2;
        case '-':
            return +operand1 - (+operand2);
        case '*':
            return +operand1 * +operand2;
        case '/':
            if (operand2 === 0) {
                console.error("ERROR: can't divide by zero");
                return;
            }
            return +operand1 / +operand2;
        default:
            console.error("ERROR: unknown operator provided");
            break;
    }
}

function onDigitClicked(e) {
    const digit = e.target.textContent;
    if (!operand1 && digit === '0') return;
    if (!operand1 || !operator) {
        operand1 += digit;
        displayPara.textContent = operand1;
        return;
    }
    operand2 += digit;
    displayPara.textContent += digit;
}

function onOperatorClicked(e) {
    if (!operand1 || operand2) return; // Maybe call operate if operand2 exists.

    const op = e.target.textContent;
    if (operator) {
        displayPara.textContent = removeLast(displayPara.textContent);
    }
    operator = op;
    displayPara.textContent += op;
}

function setCleanState(){
    displayPara.textContent = '0';
    operand1 = '';
    operand2 = '';
    operator = '';
}

function onClearClicked() {
    setCleanState();
}

function onEraseClicked(e) {
    if (!operand1) {
        setCleanState();
        return;
    }
    
    displayPara.textContent = removeLast(displayPara.textContent);
    if (operand2) {
        operand2 = removeLast(operand2);
    } else if (operator) {
        operator = '';
    } else {
        operand1 = removeLast(operand1);
    }
}

function removeLast(string) {
    const current = string.split('');
    current.pop();
    return current.join('');
}