const { getBahtAndSatang } = require('./shared');

/**
 * @param {number} base
 */
function baseToThaiWord(base) {
  if (base === 1e5) return 'แสน';
  if (base === 1e4) return 'หมื่น';
  if (base === 1e3) return 'พัน';
  if (base === 1e2) return 'ร้อย';
  if (base === 1e1) return 'สิบ';
  return '';
}

/**
 * @param {number} front
 * @param {number} base
 * @param {boolean} [hasTen=false]
 */
function frontBaseToThaiWord(front, base, hasTen = false) {
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
  return `${frontWord}${baseToThaiWord(base)}`;
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
 * @param {number} money
 * @param {ThaiWordOptions} [options]
 */
function moneyToThaiWord(money, options = {}) {
  let { showActual } = { ...defaultOptions, ...options };
  if (money < 0) return '';
  let { baht, satang } = getBahtAndSatang(money);
  if (baht === 0 && satang === 0) return `ศูนย์บาท${showActual ? 'ถ้วน': ''}`;
  let word = '';

  // - Baht
  if (baht !== 0) {
    // - Separate each sub baht (6 digits of baht) to array
    // - Sort by larger sub baht come first
    const bahtString = `${baht}`;
    const subBathsCount = Math.ceil(bahtString.length / 6);
    const subBahts = [];
    for (let i = 1; i <= subBathsCount; i++) {
      let subBaht = '';
      if (i === 1) {
        subBaht = bahtString.slice(-6 * i);
      } else {
        subBaht = bahtString.slice(-6 * i, -6 * (i - 1));
      }
      if (subBaht === '') break;
      subBahts.unshift(+subBaht);
    }

    // - Convert each sub baht to word,
    // - Last element is one-digit unit
    // - Other elements are million-digit unit, hav to inserted the word 'ล้าน'
    subBahts.forEach((subBaht, i) => {
      let hasTen = false;
      for (let j = 7; j >= 0; j--) {
        const base = 10 ** j;
        const dividedMoney = subBaht / base;
        if (dividedMoney >= 1) {
          const front = Math.floor(dividedMoney);
          const moneyWord = frontBaseToThaiWord(front, base, hasTen);
          word += moneyWord;
          subBaht %= base;
          hasTen = base === 1e1;
        }
      }
      if (i !== subBahts.length - 1) {
        word += 'ล้าน';
      }
    });
    word += 'บาท';
  }

  // - Satang
  if (satang !== 0) {
    let hasTen = false;
    for (let i = 1; i >= 0; i--) {
      const base = 10 ** i;
      const dividedMoney = satang / base;
      if (dividedMoney >= 1) {
        const front = Math.floor(dividedMoney);
        const moneyWord = frontBaseToThaiWord(front, base, hasTen);
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
