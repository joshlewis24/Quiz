import { input, toggleBtn, updateResult, syncUIWithState } from "./src/dom.js";
import { getDirection, toggleDirection } from "./src/questions.js";
import { cToF, fToC } from "./src/convert.js";

syncUIWithState();

toggleBtn.addEventListener("click", () => {
  toggleDirection();
  syncUIWithState();
});

input.addEventListener("input", handleInput);

function handleInput(e) {
  const value = e.target.value;


  const hasMultipleDots = value.split(".").length > 2;
  const hasMultipleNegatives = value.split("-").length > 2;
  const negativeNotAtStart = value.includes("-") && value.indexOf("-") !== 0;

  if (hasMultipleDots || hasMultipleNegatives || negativeNotAtStart) {
    updateResult("Invalid input");
    return;
  }


  const num = Number(value);
  if (isNaN(num)) {
    updateResult("Invalid input");
    return;
  }

 
  if (getDirection() === "C_TO_F") {
    updateResult(cToF(num).toFixed(2) + " °F");
  } else {
    updateResult(fToC(num).toFixed(2) + " °C");
  }
}
