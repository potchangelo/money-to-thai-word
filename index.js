const moneyToThaiWordLocaleEN = require('./src/moneyToThaiWordLocaleEN');
const moneyToThaiWordLocaleTH = require('./src/moneyToThaiWordLocaleTH');

/**
 * @param {number} money
 * @param {'th'|'en'} [locale='th']
 * @returns {string} Money word
 */
function moneyToThaiWord(money, locale='th') {
  if (locale === 'en') {
    // TODO: Options lowercase, uppercase, capitalize
    return moneyToThaiWordLocaleEN(money);
  }
  // TODO: Options คำว่า ถ้วน
  return moneyToThaiWordLocaleTH(money);
}

module.exports = moneyToThaiWord;
