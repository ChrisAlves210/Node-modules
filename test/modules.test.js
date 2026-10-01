const test = require('node:test');
const assert = require('node:assert/strict');
const { randomInteger, spacesToDashes, countWords } = require('..');

test('randomInteger returns an integer within inclusive bounds', () => {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const value = randomInteger(2, 5);
    assert.ok(Number.isInteger(value));
    assert.ok(value >= 2 && value <= 5);
  }

  assert.equal(randomInteger(3, 3), 3);
});

test('randomInteger rejects invalid bounds', () => {
  assert.throws(() => randomInteger(1.5, 3), TypeError);
  assert.throws(() => randomInteger(4, 2), RangeError);
});

test('spacesToDashes trims and replaces whitespace runs', () => {
  assert.equal(spacesToDashes('  hello   world  '), 'hello-world');
  assert.equal(spacesToDashes('one\ttwo\nthree'), 'one-two-three');
});

test('spacesToDashes requires a string', () => {
  assert.throws(() => spacesToDashes(42), TypeError);
});

test('countWords counts words separated by whitespace', () => {
  assert.equal(countWords(' one   two\nthree '), 3);
  assert.equal(countWords('   '), 0);
});

test('countWords requires a string', () => {
  assert.throws(() => countWords(null), TypeError);
});