function randomInteger(min, max) {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new TypeError('min and max must be integers');
  }

  if (min > max) {
    throw new RangeError('min must be less than or equal to max');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = randomInteger;