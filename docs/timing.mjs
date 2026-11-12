function validateNonnegative(value, name) {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(name + " must be a finite nonnegative number.");
  }
}

function validatePositive(value, name) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(name + " must be a finite positive number.");
  }
}

function validateWords(words) {
  if (!Number.isSafeInteger(words) || words < 0) {
    throw new RangeError("Word count must be a nonnegative whole number.");
  }
}

export function deliverySeconds(words, wpm, reservedSeconds = 0) {
  validateWords(words);
  validatePositive(wpm, "Pace");
  validateNonnegative(reservedSeconds, "Reserved time");
  return (words / wpm) * 60 + reservedSeconds;
}

export function wordBudget(slotSeconds, wpm, reservedSeconds = 0) {
  validateNonnegative(slotSeconds, "Slot length");
  validatePositive(wpm, "Pace");
  validateNonnegative(reservedSeconds, "Reserved time");
  return Math.floor((Math.max(0, slotSeconds - reservedSeconds) * wpm) / 60);
}

export function measuredWpm(words, elapsedSeconds) {
  validateWords(words);
  validatePositive(elapsedSeconds, "Elapsed time");
  return (words * 60) / elapsedSeconds;
}
