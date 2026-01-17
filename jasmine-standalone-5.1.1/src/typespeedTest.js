import { renderTypeGrid } from "../../src/type-speed.js";
import { data } from "../../src/data/data.js";
import { currentResult, savedResult, updatePersonalBest, resultHistory } from "../../src/share/saved-result-store.js";

describe('test suite: renderTypeGrid', () => {
  beforeEach(() => {
    // renderTypeGrid()
  })
  afterEach(() => {
    document.querySelector('header').innerHTML = '';
    document.querySelector('main').innerHTML = ''
  })

  it('display typedText', () => {
    document.querySelector('.js-medium-mode').click()

    expect(
      document.querySelector('.js-medium-mode').classList.contains('active')
    ).toEqual(true);
    expect(
      document.querySelector('.js-easy-mode').classList.contains('active')
    ).toEqual(false);
    expect(
      document.querySelector('.js-hard-mode').classList.contains('active')
    ).toEqual(false);

    // expect(
    //   document.querySelector('.text-to-type').contains(data.medium[0].text)
    // ).toEqual(true)
  })
})

describe('test suite: renderTypeGrid', () => {
  beforeEach(() => {
    // renderTypeGrid()
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify({
        wpm: 0,
        accuracy: 0,
        correctChars: 0,
        incorrectChars: 0,
        time: 0,
      })
    })
  })
  afterEach(() => {
    document.querySelector('header').innerHTML = '';
    document.querySelector('main').innerHTML = ''
  })

  it('Current result', () => {
    const timeEl = document.querySelector(".time-value");
    expect(
      localStorage.getItem
    ).toHaveBeenCalledTimes(0)
  })
})