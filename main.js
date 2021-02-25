{
    class Calculator {
        constructor(prevSolutionTextElement, currSolutionTextElement) {
            this.prevSolutionTextElement = prevSolutionTextElement;
            this.currSolutionTextElement = currSolutionTextElement;
            this.clear();
        }
        clear() {
            this.currentSolution = '';
            this.previousSolution = '';
            this.operator = undefined
        }

        //DEL button function
        // delete() {
        //     this.currentSolution = this.currentSolution.toString().slice(0, -1);
        // }

        addNumber(number) {
            if (number === '.' && this.currentSolution.includes('.')) return
            this.currentSolution = this.currentSolution.toString() + number.toString();
        }

        chooseOperator(operator) {
            if(this.currentSolution === '') return
            if (this.previousSolution !== ''){
                this.solute()
            }
            this.operator = operator;
            this.previousSolution = this.currentSolution;
            this.currentSolution = '';
        }

        solute() {
            let workings;
            const prev = parseFloat(this.previousSolution);
            const curr = parseFloat(this.currentSolution);
            if(isNaN(prev) || isNaN(curr)) return;
            switch (this.operator){
                case '+':
                    workings = prev + curr
                    break;
                case '-':
                    workings = prev - curr
                    break;
                case '*':
                    workings = prev * curr
                    break;
                case '/':
                    workings = prev / curr
                    break;
                case '%':
                    workings = (prev/100) * curr
                    break;
                default:
                    return;
            }

            this.currentSolution = workings;
            this.operator = undefined;
            this.previousSolution = '';
        }

        getDisplay(number){
            const stringNumber = number.toString();
            const intDigits = parseFloat(stringNumber.split('.')[0]);
            const decimal = stringNumber.split('.')[1];
            let intDisplay;
            if (isNaN(intDigits)){
                intDisplay = '';
            } else {
                intDisplay = intDigits.toLocaleString('en', {
                    maximumFractionDigits: 0
                })
            }
            if (decimal != null){
                return `${intDisplay}.${decimal}`
            } else {
                return intDisplay;
            }
        }

        update() {
            this.currSolutionTextElement.innerText = this.getDisplay(this.currentSolution);
            if(this.operator != null){
                this.prevSolutionTextElement.innerText = 
                `${this.getDisplay(this.previousSolution)} ${this.operator}`
            } else {
                this.prevSolutionTextElement.innerText = '';
            }
            
        }
    }

    const numbers = document.querySelectorAll('[data-number]');
    const operators = document.querySelectorAll('[data-operation]');
    const equals = document.querySelector('[data-equals]');
    const del = document.querySelector('[data-delete]');
    const AC = document.querySelector('[data-all-clear]');
    const prevSolutionTextElement = document.querySelector('[data-prev-solution]');
    const currSolutionTextElement = document.querySelector('[data-curr-solution]');

    const calculator = new Calculator(prevSolutionTextElement, currSolutionTextElement);

    numbers.forEach(button => {
        button.addEventListener('click', () =>{
            calculator.addNumber(button.innerText)
            calculator.update()
        })
    })

    operators.forEach(button => {
        button.addEventListener('click', () =>{
            calculator.chooseOperator(button.innerText)
            calculator.update()
        })
    })

    equals.addEventListener('click', button =>{
        calculator.solute();
        calculator.update();
    })

    AC.addEventListener('click', button =>{
        calculator.clear();
        calculator.update();
    })

    del.addEventListener('click', button =>{
        calculator.delete();
        calculator.update();
    })
}
