const { getBahtAndSatang } = require('./shared');

/**
 * @param {number} num
 */
function isUniqueTen(num) {
  return 10 <= num && num <= 19;
}

/**
 * @param {number} front
 * @param {number} [base]
 */
function frontBasetoEngWord(front, base) {
  let frontWord = '',
    baseWord = '';
  if (base === 1e1) {
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
  if (base === 1e2) baseWord = ' hundred';
  return `${frontWord}${baseWord}`;
}

/**
 * @param {number} order
 */
function thousandOrderToEngWord(order) {
  if (order === 5) return 'quadrillion';
  if (order === 4) return 'trillion';
  if (order === 3) return 'billion';
  if (order === 2) return 'million';
  if (order === 1) return 'thousand';
  return '';
}

// TODO: Options lowercase, uppercase, capitalize
/**
 * @param {number} money
 */
function moneyToThaiWordLocaleEN(money) {
  if (money < 0) return '';
  if (money === 0) return 'zero baht';

  let word = '';
  let { baht, satang } = getBahtAndSatang(money);

  // - Baht
  if (baht !== 0) {
    // - Separate each sub baht (6 digits of baht) to array
    // - Sort by larger sub baht come first
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

    subBahts.forEach((subBaht, i) => {
      let subBaht2 = subBaht;

      // - Get thousand order index (0 is unit, 1 is thousand, 2 is million)
      const order = subBahts.length - 1 - i;
      const orderWord = thousandOrderToEngWord(order);

      // - Convert each sub baht to word
      // - Numbers 10 - 19 are unique words
      // - Other numbers are general words
      for (let j = 2; j >= 0; j--) {
        const base = 10 ** j;
        const dividedMoney = subBaht2 / base;
        let moneyWord = '';
        if (isUniqueTen(subBaht2)) {
          moneyWord = frontBasetoEngWord(subBaht2);
          j = 0;
        } else if (dividedMoney >= 1) {
          const front = Math.floor(dividedMoney);
          moneyWord = frontBasetoEngWord(front, base);
          subBaht2 %= base;
        }
        if (!!moneyWord) word += `${moneyWord} `;
      }

      if (!!orderWord && subBaht !== 0) word += `${orderWord} `;
    });
    word += 'baht';
  }

  if (!!satang) {
    if (baht !== 0) word += ' ';
    let satang2 = satang;
    for (let j = 1; j >= 0; j--) {
      const base = 10 ** j;
      const dividedMoney = satang2 / base;
      let moneyWord = '';
      if (isUniqueTen(satang2)) {
        moneyWord = frontBasetoEngWord(satang2);
        j = 0;
      } else if (dividedMoney >= 1) {
        const front = Math.floor(dividedMoney);
        moneyWord = frontBasetoEngWord(front, base);
        satang2 %= base;
      }
      if (!!moneyWord) word += `${moneyWord} `;
    }
    word += 'satang';
  }

  return word;
}

module.exports = moneyToThaiWordLocaleEN;
