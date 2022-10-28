const test = require('ava').default;
const moneyToThaiWord = require('../');

test('test 1', t => {
  t.is(moneyToThaiWord(200), 'สองร้อยบาทถ้วน');
});
