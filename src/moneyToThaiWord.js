const { getBahtAndSatang } = require('./shared');

/**
 * Convert base 10, 100, 1000, 10000, 100000 to word.
 *
 * @param {10|100|1000|10000|100000} base Number in 1, 10, 100, 1000, 10000, 100000.
 */
function baseToWord(base) {
  if (base === 1e5) return 'แสน';
  if (base === 1e4) return 'หมื่น';
  if (base === 1e3) return 'พัน';
  if (base === 1e2) return 'ร้อย';
  if (base === 1e1) return 'สิบ';
  return '';
}

/**
 * Convert front number and its base number to word (Thai style).
 *
 * Example 1 : front 2, base 10 -> "ยี่" + "สิบ".
 *
 * Example 2 : front 7, base 100 -> "เจ็ด" + "ร้อย".
 *
 * Example 3 : front 5 -> "ห้า".
 *
 * @param {number} front Number in range 1-9.
 * @param {1|10|100|1000|10000|100000} base Number in 1, 10, 100, 1000, 10000, 100000.
 * @param {boolean} [hasTen=false] Is x (this front number) behind ten-order number like 1x, 2x
 */
function frontAndBaseToWord(front, base, hasTen = false) {
  let frontWord = '';
  if (base === 1e1 && front === 2) {
    frontWord = 'ยี่';
  } else if (base === 1e1 && front === 1) {
    frontWord = '';
  } else if (base === 1 && front === 1 && hasTen) {
    frontWord = 'เอ็ด';
  } else {
    if (front === 9) frontWord = 'เก้า';
    if (front === 8) frontWord = 'แปด';
    if (front === 7) frontWord = 'เจ็ด';
    if (front === 6) frontWord = 'หก';
    if (front === 5) frontWord = 'ห้า';
    if (front === 4) frontWord = 'สี่';
    if (front === 3) frontWord = 'สาม';
    if (front === 2) frontWord = 'สอง';
    if (front === 1) frontWord = 'หนึ่ง';
  }
  return frontWord + baseToWord(base);
}

/**
 * Convert baht to ordered sub-bahts (Array of numbers between 0-999999).
 *
 * Example : 10,200,300 -> [10, 200300].
 *
 * @param {number} baht Integer baht value.
 */
function bahtToSubBahts(baht) {
  // Empty array for zero baht
  if (baht === 0) return [];

  // Slice baht string to sub-bahts (6 digits) array
  const bahtString = `${baht}`;
  const subBahts = [];
  const subBathsCount = Math.ceil(bahtString.length / 6);
  for (let i = 1; i <= Math.min(subBathsCount, 6); i++) {
    let subBaht = '';
    if (i === 1) {
      subBaht = bahtString.slice(-6 * i);
    } else {
      subBaht = bahtString.slice(-6 * i, -6 * (i - 1));
    }
    if (subBaht === '') break;
    subBahts.unshift(+subBaht);
  }
  return subBahts;
}

/**
 * Convert sub-bahts to word.
 *
 * Example : [10, 200300] -> "สิบล้าน" + "สอนแสนสามร้อย" + "บาท"
 *
 * @param {number[]} subBahts Array of numbers between 0-999999.
 */
function subBahtToWord(subBahts) {
  // Empty string for zero baht
  if (subBahts.length === 0) return '';

  // Convert each ordered sub-bahts to word
  const word = subBahts.reduce((prevWord, subBaht, index) => {
    let currentWord = '';
    let hasTen = false;
    for (let j = 5; j >= 0; j--) {
      const base = 10 ** j;
      const dividedMoney = subBaht / base;
      if (dividedMoney >= 1) {
        const front = Math.floor(dividedMoney);
        const moneyWord = frontAndBaseToWord(front, base, hasTen);
        currentWord += moneyWord;
        subBaht %= base;
        hasTen = base === 1e1;
      }
    }
    if (index !== subBahts.length - 1) {
      currentWord += 'ล้าน';
    }

    return prevWord + currentWord;
  }, '');
  return word + 'บาท';
}

/**
 * @typedef {object} ThaiWordOptions
 * @property {boolean} showActual
 */

/**
 * @type ThaiWordOptions
 */
const defaultOptions = {
  showActual: true
};

/**
 * Convert money (number) to Thai word (string).
 * @param {number} money Input money.
 * @param {ThaiWordOptions} [options] Optional configurations.
 */
function moneyToThaiWord(money, options = {}) {
  let { showActual } = { ...defaultOptions, ...options };

  // Lt. zero or mte. quintillion cases
  if (money < 0 || money >= 1e18) return '';

  let { baht, satang } = getBahtAndSatang(money);

  // Zero case
  if (baht === 0 && satang === 0) return `ศูนย์บาท${showActual ? 'ถ้วน': ''}`;

  let word = subBahtToWord(bahtToSubBahts(baht));

  // - Satang
  if (satang !== 0) {
    let hasTen = false;
    for (let i = 1; i >= 0; i--) {
      const base = 10 ** i;
      const dividedMoney = satang / base;
      if (dividedMoney >= 1) {
        const front = Math.floor(dividedMoney);
        const moneyWord = frontAndBaseToWord(front, base, hasTen);
        word += moneyWord;
        satang %= base;
        hasTen = base === 1e1;
      }
    }
    word += 'สตางค์';
  } else if (showActual) {
    word += 'ถ้วน';
  }

  return word;
}

module.exports = moneyToThaiWord;
