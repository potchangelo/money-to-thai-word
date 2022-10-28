const test = require('ava').default;
const moneyToThaiWord = require('../');

test('test en 1', t => {
  t.is(moneyToThaiWord(200, 'en'), 'two hundred baht');
});
