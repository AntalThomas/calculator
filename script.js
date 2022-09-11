console.log("hello");
const currentEquation = document.getElementById("current-equation");
const previousEquation = document.getElementById("previous-equation");
const buttons = Array.from(document.getElementsByClassName("button"));
console.log(buttons)

// Returns an anonymous function of the finalSum
// e.g.     let finalSum = "1+1"
// becomes  Function("return " + finalSum)();
//              function anonymous() { return 1+1 }
// Learnt from https://www.educative.io/answers/eval-vs-function-in-javascript
function finalResult(finalSum) {
    let result = Function("return " + finalSum)();
    return Math.round(result * 10) / 10;
}

buttons.map(button => {
    button.addEventListener("click", (buttonPress) => {
        switch(buttonPress.target.innerText) {
            case "AC":
                // Clears both text fields
                currentEquation.innerText = "";
                previousEquation.innerText = "";
                break;

            case "DEL":
                // Removes last character from the text
                currentEquation.innerText = currentEquation.innerHTML.slice(0, -1);
                break;

            case ".":
                // Checks to make sure only a single "." is in place
                if (currentEquation.innerText == "") currentEquation.innerText += "0.";
                if (currentEquation.innerText.includes(".")) return;
                currentEquation.innerText += buttonPress.target.innerText;
                break;

            case "/":
            case "-":
            case "+":
            case "*":
                // Adds operands into string
                previousEquation.innerText += currentEquation.innerText + buttonPress.target.innerText;
                currentEquation.innerText = "";
                break;

            case "=":
                // Checks if values have been input if not does nothing
                if (previousEquation.innerText == "" && currentEquation.innerText == "") return;

                // Checks if previous values have been input and if nothing is currently
                // entered then will display the finished equation of previous entries
                if (currentEquation.innerText == "" && previousEquation.innerText !== "") {
                    currentEquation.innerText = previousEquation.innerText.slice(0, -1);
                    previousEquation.innerText = "";
                    currentEquation.innerText = finalResult(currentEquation.innerText);
                }

                previousEquation.innerText += currentEquation.innerText

                currentEquation.innerText = finalResult(previousEquation.innerText);
                previousEquation.innerText = "";
                break;
            
            // Appends clicked buttons text to the current equation if none of the other cases
            default:
                currentEquation.innerText += buttonPress.target.innerText;
                break;
        }
    });
});