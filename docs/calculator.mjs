import { deliverySeconds, measuredWpm, wordBudget } from "./timing.mjs";

const number = new Intl.NumberFormat("en", { maximumFractionDigits: 2 });

function bindCalculator(id, calculate) {
  const form = document.getElementById(id);
  const output = form.querySelector("output");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = (name) => form.elements.namedItem(name).valueAsNumber;
    try {
      output.textContent = calculate(value);
    } catch (error) {
      output.textContent = error.message;
    }
  });

  form.addEventListener("input", () => {
    output.textContent = "";
  });
}

bindCalculator("budget", (value) => {
  const slot = value("slot");
  const reserved = value("reserved");
  if (reserved >= slot) return "No speaking time remains in this slot.";
  const words = wordBudget(slot, value("pace"), reserved);
  return number.format(words) + " words";
});

bindCalculator("delivery", (value) => {
  const total = Math.round(deliverySeconds(value("words"), value("pace"), value("reserved")));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return number.format(minutes) + " min " + seconds + " sec";
});

bindCalculator("pace", (value) => {
  return number.format(measuredWpm(value("words"), value("elapsed"))) + " WPM";
});
