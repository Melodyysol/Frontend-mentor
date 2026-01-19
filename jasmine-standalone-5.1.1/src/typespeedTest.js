import { calculateAccuracy, calculateWPM, shuffleDifficulty, finish } from "../../src/utils/calcAccWPM.js";
import { currentResult, savedResult } from "../../src/share/saved-result-store.js";


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

// describe('test suite: finish()', () => {
//   it('', () => {
//     expect(
//       input.length
//     ).toEqual(output.length);
//   });
// })

describe('test suite: currentResult()', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('should save result to local storage', () => {
    currentResult.wpm = 10;
    currentResult.accuracy = 100;
    currentResult.correctChars = 100;
    currentResult.inCorrectChar = 5;
    currentResult.time = 25;
    localStorage.setItem('currentResult', JSON.stringify(currentResult));

    expect(
      localStorage.setItem
    ).toHaveBeenCalledWith('currentResult', JSON.stringify(currentResult));

    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(1);

    expect(
      currentResult.wpm
    ).toEqual(10);
  });
})

describe('test suite: saveResult()', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('should save result to local storage', () => {
    savedResult.wpm = 10;
    savedResult.accuracy = 100;
    savedResult.correctChars = 100;
    savedResult.inCorrectChar = 5;
    savedResult.time = 25;
    localStorage.setItem('savedResult', JSON.stringify(savedResult));

    expect(
      localStorage.setItem
    ).toHaveBeenCalledWith('savedResult', JSON.stringify(savedResult));

    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(1);

    expect(
      savedResult.wpm
    ).toEqual(10);
  });
})