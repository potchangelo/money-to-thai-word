const { getBahtAndSatang } = require('./shared');

/**
 * Check is number between 10-19.
 * @param {number} n Input number.
 */
function isUniqueTen(n) {
  return 10 <= n && n <= 19;
}

/**
 * Convert front number and its base number to word.
 * @param {number} front Integer number between 1-19.
 * @param {10|100} [base] 10, 100, or nothing.
 * @example
 * frontAndBaseToWord(11)
 * // "eleven"
 * @example
 * frontAndBaseToWord(4, 10)
 * // "forty"
 * @example
 * frontAndBaseToWord(7, 100)
 * // "seven hundred"
 */
function frontAndBaseToWord(front, base) {
  let frontWord = '';
  let baseWord = '';
  if (base === 10) {
    if (front === 9) frontWord = 'ninety';
    else if (front === 8) frontWord = 'eighty';
    else if (front === 7) frontWord = 'seventy';
    else if (front === 6) frontWord = 'sixty';
    else if (front === 5) frontWord = 'fifty';
    else if (front === 4) frontWord = 'forty';
    else if (front === 3) frontWord = 'thirty';
    else if (front === 2) frontWord = 'twenty';
  } else if (isUniqueTen(front)) {
    if (front === 19) frontWord = 'nineteen';
    else if (front === 18) frontWord = 'eighteen';
    else if (front === 17) frontWord = 'seventeen';
    else if (front === 16) frontWord = 'sixteen';
    else if (front === 15) frontWord = 'fifteen';
    else if (front === 14) frontWord = 'fourteen';
    else if (front === 13) frontWord = 'thirteen';
    else if (front === 12) frontWord = 'twelve';
    else if (front === 11) frontWord = 'eleven';
    else if (front === 10) frontWord = 'ten';
  } else {
    if (front === 9) frontWord = 'nine';
    else if (front === 8) frontWord = 'eight';
    else if (front === 7) frontWord = 'seven';
    else if (front === 6) frontWord = 'six';
    else if (front === 5) frontWord = 'five';
    else if (front === 4) frontWord = 'four';
    else if (front === 3) frontWord = 'three';
    else if (front === 2) frontWord = 'two';
    else if (front === 1) frontWord = 'one';
  }
  if (base === 100) baseWord = ' hundred';
  return `${frontWord}${baseWord}`;
}

/**
 * Convert number (1-999) to word (with trailing space).
 * @param {number} n Integer number between 1-999.
 * @example
 * numberToWord(357)
 * // "three thousand fifty seven "
 * @example
 * numberToWord(512)
 * // "five hundred twelve "
 */
function numberToWord(n) {
  if (n < 1 || n > 999) return '';

  let word = '';
  let nClone = n;
  for (let j = `${n}`.length - 1; j >= 0; j--) {
    const base = 10 ** j;
    const dividedMoney = nClone / base;
    let moneyWord = '';
    if (isUniqueTen(nClone)) {
      moneyWord = frontAndBaseToWord(nClone);
      j = 0;
    } else if (dividedMoney >= 1) {
      const front = Math.floor(dividedMoney);
      moneyWord = frontAndBaseToWord(front, base);
      nClone %= base;
    }
    if (!!moneyWord) word += `${moneyWord} `;
  }
  return word;
}

// FIXME: Change order from power number (1, 2, 3) to 1000, 1000000, 1eX
/**
 * Convert 1000, 1000000, etc. to word (with trailing space).
 * @param {1|2|3|4|5} order The three-zeros order. Example : 1 = 1000, 2 = 1000000.
 * @example
 * thousandOrderToWord(1)
 * // "thousand"
 * @example
 * thousandOrderToWord(2)
 * // "million"
 */
function thousandOrderToWord(order) {
  let word = '';
  if (order === 5) word = 'quadrillion';
  if (order === 4) word = 'trillion';
  if (order === 3) word = 'billion';
  if (order === 2) word = 'million';
  if (order === 1) word = 'thousand';
  return word !== '' ? `${word} ` : '';
}

/**
 * Convert baht to ordered sub-bahts (Array of integer numbers between 0-999).
 * @param {number} baht Integer baht value.
 * @example
 * bahtToSubBahts(10200300)
 * // [10, 200, 300].
 */
function bahtToSubBahts(baht) {
  // Empty array for zero baht
  if (baht === 0) return [];

  // Slice baht string to sub-bahts (3 digits) array
  const bahtString = `${baht}`;
  const subBahts = [];
  const subBathsCount = Math.ceil(bahtString.length / 3);
  for (let i = 1; i <= Math.min(subBathsCount, 6); i++) {
    let subBaht = '';
    if (i === 1) {
      subBaht = bahtString.slice(-3 * i);
    } else {
      subBaht = bahtString.slice(-3 * i, -3 * (i - 1));
    }
    if (subBaht === '') break;
    subBahts.unshift(+subBaht);
  }
  return subBahts;
}

/**
 * Convert sub-bahts to word.
 * @param {number[]} subBahts Array of integer numbers between 0-999.
 * @example
 * subBahtToWord([10, 200, 300])
 * // "ten million " + "two hundred thousand " + "three hundred " + "bath"
 */
function subBahtToWord(subBahts) {
  // Empty string for zero baht
  if (subBahts.length === 0) return '';

  // Convert each ordered sub-bahts to word
  const word = subBahts.reduce((prevWord, subBaht, index) => {
    // Number word
    let currentWord = numberToWord(subBaht);

    // Thousand order word
    const order = subBahts.length - 1 - index;
    const orderWord = thousandOrderToWord(order);
    if (!!orderWord && subBaht !== 0) currentWord += orderWord;

    return prevWord + currentWord;
  }, '');
  return word + 'baht';
}

/**
 * Convert satang to word.
 * @param {number} satang Integer satang value between 1-99.
 * @example
 * satangToWord(75)
 * // "seventy five " + "satang"
 */
function satangToWord(satang) {
  return satang > 0 ? numberToWord(satang) + 'satang' : '';
}

/**
 * Transform word to any text-transform option.
 * @param {string} word Original word.
 * @param {'first-letter'|'lowercase'|'uppercase'|'capitalize'} textTransform Transform style.
 */
function wordTransform(word, textTransform) {
  if (textTransform === 'lowercase') {
    return word.toLowerCase();
  } else if (textTransform === 'uppercase') {
    return word.toUpperCase();
  } else if (textTransform === 'capitalize') {
    return word.split(' ').reduce((prev, current, index) => {
      const firstLetter = current.charAt(0).toUpperCase();
      const remains = current.substring(1);
      if (index === 0) return `${firstLetter}${remains}`;
      return `${prev} ${firstLetter}${remains}`;
    }, '');
  }

  const firstLetter = word.charAt(0).toUpperCase();
  const remains = word.substring(1);
  return `${firstLetter}${remains}`;
}

/**
 * @typedef {object} ThaiWordLocaleENOptions
 * @property {'first-letter'|'lowercase'|'uppercase'|'capitalize'} textTransform
 */

/**
 * @type ThaiWordLocaleENOptions
 */
const defaultOptions = {
  textTransform: 'first-letter',
};

/**
 * Convert money (number) to Thai word (string) in English locale.
 * @param {number} money Input money.
 * @param {ThaiWordLocaleENOptions} [options] Optional configurations.
 */
function moneyToThaiWordLocaleEN(money, options = {}) {
  let { textTransform } = { ...defaultOptions, ...options };

  // Lt. zero or mte. quintillion cases
  if (money < 0 || money >= 1e18) return '';

  let { baht, satang } = getBahtAndSatang(money);

  // Zero case
  if (baht === 0 && satang === 0) {
    return wordTransform('zero baht', textTransform);
  }

  // Build baht and satang word
  let word = subBahtToWord(bahtToSubBahts(baht));
  word += satang > 0 && baht !== 0 ? ' ' : '';
  word += satangToWord(satang);

  return wordTransform(word, textTransform);
}

module.exports = moneyToThaiWordLocaleEN;
