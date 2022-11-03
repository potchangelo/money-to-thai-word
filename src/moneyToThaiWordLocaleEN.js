const { getBahtAndSatang } = require('./shared');

/**
 * Check is number between 10-19.
 * @param {number} n The number.
 */
function isUniqueTen(n) {
  return 10 <= n && n <= 19;
}

/**
 * Convert front number and its base number to word.
 * Use with number in range 1-999.
 * @param {number} front Number in range 1-19.
 * @param {10|100} [base] 10, 100, or nothing.
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
 * Convert 1000, 1000000, etc. to word.
 * Example : Order 2 is "1" + "000" x 3 = "1000000" = "million".
 * @param {1|2|3|4|5} order The three-zeros order. Example : 1 = 1000, 2 = 1000000.
 */
function thousandOrderToWord(order) {
  if (order === 5) return 'quadrillion';
  if (order === 4) return 'trillion';
  if (order === 3) return 'billion';
  if (order === 2) return 'million';
  if (order === 1) return 'thousand';
  return '';
}

/**
 * Convert baht to sub-bahts (ordered 3 digits number) array.
 * @param {number} baht Input baht.
 */
function bahtToSubBahts(baht) {
  // Empty array for zero baht
  if (baht === 0) return [];

  // Slice baht string to sub-bahts (3 digits) array
  // Example baht = 10,200,300 -> subBahts = [10, 200, 300]
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
 * @param {number[]} subBahts Array of ordered 3 digits number.
 */
function subBahtToWord(subBahts) {
  // Empty string for zero baht
  if (subBahts.length === 0) return '';

  // Convert each ordered sub-bahts to word
  // Example : [10, 200, 300] -> "ten million " + "two hundred thousand " + "three hundred"
  let word = '';
  subBahts.forEach((subBaht, i) => {
    let subBaht2 = subBaht;

    // TODO: Refactor duplicated code
    // Get number word in English
    // Example 1 : 12 -> "twelve"
    // Example 2 : 21 -> "twenty " + "one"
    for (let j = 2; j >= 0; j--) {
      const base = 10 ** j;
      const dividedMoney = subBaht2 / base;
      let moneyWord = '';
      if (isUniqueTen(subBaht2)) {
        moneyWord = frontAndBaseToWord(subBaht2);
        j = 0;
      } else if (dividedMoney >= 1) {
        const front = Math.floor(dividedMoney);
        moneyWord = frontAndBaseToWord(front, base);
        subBaht2 %= base;
      }
      if (!!moneyWord) word += `${moneyWord} `;
    }

    // Get thousand order word in English
    // Example 1 : order 0 -> ""
    // Example 2 : order 1 -> "thousand"
    const order = subBahts.length - 1 - i;
    const orderWord = thousandOrderToWord(order);
    if (!!orderWord && subBaht !== 0) word += `${orderWord} `;
  });
  return word + 'baht';
}

/**
 * Convert satang to word.
 * @param {number} satang Input satang.
 */
function satangToWord(satang) {
  // Empty string for zero satang
  if (satang === 0) return '';

  // TODO: Refactor duplicated code
  // Get number word in English
  // Example 1 : 12 -> "twelve"
  // Example 2 : 21 -> "twenty " + "one"
  let word = '';
  let satang2 = satang;
  for (let j = 1; j >= 0; j--) {
    const base = 10 ** j;
    const dividedMoney = satang2 / base;
    let moneyWord = '';
    if (isUniqueTen(satang2)) {
      moneyWord = frontAndBaseToWord(satang2);
      j = 0;
    } else if (dividedMoney >= 1) {
      const front = Math.floor(dividedMoney);
      moneyWord = frontAndBaseToWord(front, base);
      satang2 %= base;
    }
    if (!!moneyWord) word += `${moneyWord} `;
  }
  return word + 'satang';
}

/**
 * Transform word to any text-transform option.
 * @param {string} word Input word.
 * @param {'first-letter'|'lowercase'|'uppercase'|'capitalize'} textTransform Transform style.
 */
function wordTransform(word, textTransform) {
  if (textTransform === 'lowercase') {
    return word.toLowerCase();
  }
  else if (textTransform === 'uppercase') {
    return word.toUpperCase();
  }
  else if (textTransform === 'capitalize') {
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
  textTransform: 'first-letter'
};

/**
 * Convert money (number) to Thai word (string) in English locale.
 * @param {number} money Input money.
 * @param {ThaiWordLocaleENOptions} [options] Optional configurations.
 */
function moneyToThaiWordLocaleEN(money, options = {}) {
  let { textTransform } = { ...defaultOptions, ...options };

  // Less than or equals to zero cases
  if (money < 0) return '';
  let { baht, satang } = getBahtAndSatang(money);
  if (baht === 0 && satang === 0) {
    return wordTransform('zero baht', textTransform);
  }

  // Build baht and satang word
  let word = '';
  word += subBahtToWord(bahtToSubBahts(baht));
  word += satang > 0 && baht !== 0 ? ' ' : '';
  word += satangToWord(satang);

  return wordTransform(word, textTransform);
}

module.exports = moneyToThaiWordLocaleEN;
