function countWords(value) {
  if (typeof value !== 'string') {
    throw new TypeError('value must be a string');
  }

  const trimmedValue = value.trim();
  return trimmedValue === '' ? 0 : trimmedValue.split(/\s+/u).length;
}

module.exports = countWords;