function calculator() {
    return {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,

        inputDigit(digit) {
            this.displayValue = this.waitingForSecondOperand ? (this.waitingForSecondOperand = false, digit) :
                (this.displayValue === '0' ? digit : this.displayValue + digit);
        },

        inputDecimal(dot) {
            if (this.waitingForSecondOperand) {
                this.displayValue = '0.';
                this.waitingForSecondOperand = false;
            } else if (!this.displayValue.includes(dot)) {
                this.displayValue += dot;
            }
        },

        handleOperator(nextOperator) {
            const inputValue = parseFloat(this.displayValue);

            if (this.operator && this.waitingForSecondOperand) return this.operator = nextOperator;

            this.firstOperand = this.firstOperand ?? inputValue;

            if (this.operator) {
                const result = this.calculate(this.firstOperand, inputValue, this.operator);
                this.displayValue = `${+result.toFixed(7)}`;
                this.firstOperand = result;
            }

            this.waitingForSecondOperand = true;
            this.operator = nextOperator;
        },

        calculate(a, b, operator) {
            return ({
                '+': a + b,
                '-': a - b,
                '*': a * b,
                '/': a / b
            }[operator]) ?? b;
        },

        resetCalculator() {
            Object.assign(this, {
                displayValue: '0',
                firstOperand: null,
                waitingForSecondOperand: false,
                operator: null
            });
        }
    };
}
