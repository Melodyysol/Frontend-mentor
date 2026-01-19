import { calculateAccuracy, calculateWPM, shuffleDifficulty } from "../../src/utils/calcAccWPM.js";

describe('test suite: calculateAccuracy', () => {
  const correctChars = 100;
  const totalChars = 200;
  it('calculate accuracy', () => {
    expect(
      calculateAccuracy(correctChars, totalChars)
    ).toEqual(50);
  });
});

describe('test suite: calculateWPM', () => {
  const correctChars = 100;
  it('calculte wpm', () => {
    const secondsElapsed = 60;
    expect(
      calculateWPM(correctChars, secondsElapsed)
    ).toEqual(20);
  });
  it('less than 5s elaosed', () => {
    const secondsElapsed = 4;
    expect(
      calculateWPM(correctChars, secondsElapsed)
    ).toEqual(0);
  });
  it('extremly fast typing', () => {
    const secondsElapsed = 10;
    expect(
      calculateWPM(correctChars, secondsElapsed)
    ).toEqual(120);
  });
});

describe('test suite: shuffleDifficulties', () => {
  const input = [1, 2, 3, 4,5]
  const output = shuffleDifficulty(input)
  it('keeps the same length', () => {
    expect(
      input.length
    ).toEqual(output.length);
  });

  it('Contains all original items', () => {
    input.forEach(item => {
      expect(output).toContain(item)
    });
  });

  it('does not duplicate items', () => {
    const unique = new Set(output)
    expect(unique.size).toBe(input.length);
  });
  it('does not mutate the original array', () => {
    const copy = [...input];
    shuffleDifficulty(input);
    expect(input).toEqual(copy);
  });
})

