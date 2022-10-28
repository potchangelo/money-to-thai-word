const test = require('ava').default;
const moneyToThaiWord = require('../');

test('Baht only', t => {
  t.is(moneyToThaiWord(0, 'en'), 'zero baht');
  t.is(moneyToThaiWord(7, 'en'), 'seven baht');
  t.is(moneyToThaiWord(17, 'en'), 'seventeen baht');
  t.is(moneyToThaiWord(23, 'en'), 'twenty three baht');
  t.is(moneyToThaiWord(50, 'en'), 'fifty baht');
  t.is(moneyToThaiWord(100, 'en'), 'one hundred baht');
  t.is(moneyToThaiWord(101, 'en'), 'one hundred one baht');
  t.is(moneyToThaiWord(111, 'en'), 'one hundred eleven baht');
  t.is(moneyToThaiWord(149, 'en'), 'one hundred forty nine baht');
  t.is(moneyToThaiWord(200, 'en'), 'two hundred baht');
  t.is(moneyToThaiWord(312, 'en'), 'three hundred twelve baht');
  t.is(moneyToThaiWord(513, 'en'), 'five hundred thirteen baht');
});
