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

console.log(operate("+", "3", "5"));
console.log(operate("-", "3", "5"));
console.log(operate("*", "3", "5"));
console.log(operate("/", "3", "5"));
console.log(operate("+", 3, "5"));
console.log(operate("+", 3, 5));