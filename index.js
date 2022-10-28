const moneyToThaiWordLocaleEN = require('./src/moneyToThaiWordLocaleEN');
const moneyToThaiWordLocaleTH = require('./src/moneyToThaiWordLocaleTH');

function moneyToThaiWord(locale='th') {
  if (locale === 'en') {
    console.log('en');
  }
  else {
    console.log('th');
  }
}

module.exports = moneyToThaiWord;
