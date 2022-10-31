const test = require('ava').default;
const { moneyToThaiWordLocaleEN } = require('..');

test('Baht only', t => {
  t.is(moneyToThaiWordLocaleEN(0, 'en'), 'zero baht');
  t.is(moneyToThaiWordLocaleEN(7, 'en'), 'seven baht');
  t.is(moneyToThaiWordLocaleEN(17, 'en'), 'seventeen baht');
  t.is(moneyToThaiWordLocaleEN(23, 'en'), 'twenty three baht');
  t.is(moneyToThaiWordLocaleEN(50, 'en'), 'fifty baht');
  t.is(moneyToThaiWordLocaleEN(100, 'en'), 'one hundred baht');
  t.is(moneyToThaiWordLocaleEN(101, 'en'), 'one hundred one baht');
  t.is(moneyToThaiWordLocaleEN(111, 'en'), 'one hundred eleven baht');
  t.is(moneyToThaiWordLocaleEN(149, 'en'), 'one hundred forty nine baht');
  t.is(moneyToThaiWordLocaleEN(200, 'en'), 'two hundred baht');
  t.is(moneyToThaiWordLocaleEN(312, 'en'), 'three hundred twelve baht');
  t.is(moneyToThaiWordLocaleEN(513, 'en'), 'five hundred thirteen baht');
});
