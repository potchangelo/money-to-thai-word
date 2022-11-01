const test = require('ava').default;
const { moneyToThaiWordLocaleEN } = require('..');

test('Baht only', t => {
  const moneys = [
    { n: 0, w: 'zero baht' },
    { n: 7, w: 'seven baht' },
    { n: 23, w: 'twenty three baht' },
    { n: 50, w: 'fifty baht' },
    { n: 100, w: 'one hundred baht' },
    { n: 311, w: 'three hundred eleven baht' },
    { n: 6543, w: 'six thousand five hundred forty three baht' },
    { n: 80808, w: 'eighty thousand eight hundred eight baht' },
    { n: 414243, w: 'four hundred fourteen thousand two hundred forty three baht' },
    { n: 7531246, w: 'seven million five hundred thirty one thousand two hundred forty six baht' },
    { n: 27531246, w: 'twenty seven million five hundred thirty one thousand two hundred forty six baht' },
    { n: 527531246, w: 'five hundred twenty seven million five hundred thirty one thousand two hundred forty six baht' },
    { n: 9800000000, w: 'nine billion eight hundred million baht' },
    { n: 3000000000000, w: 'three trillion baht' },
    { n: 63000000000000, w: 'sixty three trillion baht' },
    { n: 760000000000000, w: 'seven hundred sixty trillion baht' },
    { n: 2700000000000000, w: 'two quadrillion seven hundred trillion baht' },
    { n: 12000000000000000, w: 'twelve quadrillion baht' },
    { n: 210000000000000000, w: 'two hundred ten quadrillion baht' },
    { n: 999999000000000000, w: 'nine hundred ninety nine quadrillion nine hundred ninety nine trillion baht' },
  ];
  moneys.forEach(m => {
    t.is(moneyToThaiWordLocaleEN(m.n), m.w);
  });
});
