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

test('Baht and Satang', t => {
  const moneys = [
    { n: 0.03, w: 'three satang' },
    { n: 0.75, w: 'seventy five satang' },
    { n: 5.25, w: 'five baht twenty five satang' },
    { n: 51.30, w: 'fifty one baht thirty satang' },
    { n: 635.08, w: 'six hundred thirty five baht eight satang' },
    { n: 9503.99, w: 'nine thousand five hundred three baht ninety nine satang' },
    { n: 32123.11, w: 'thirty two thousand one hundred twenty three baht eleven satang' },
    { n: 700000.50, w: 'seven hundred thousand baht fifty satang' },
    { n: 2000000.00, w: 'two million baht' },
  ];
  moneys.forEach(m => {
    t.is(moneyToThaiWordLocaleEN(m.n), m.w);
  });
});

test('Baht and Satang edge cases', t => {
  const moneys = [
    { n: 0.001, w: 'zero baht' },
    { n: 0.00499, w: 'zero baht' },
    { n: 0.005, w: 'one satang' },
    { n: 0.99, w: 'ninety nine satang' },
    { n: 0.99499, w: 'ninety nine satang' },
    { n: 0.995, w: 'one baht' },
    { n: 20.00111, w: 'twenty baht' },
    { n: 20.01111, w: 'twenty baht one satang' },
    { n: 20.01999, w: 'twenty baht two satang' },
    { n: 20.99111, w: 'twenty baht ninety nine satang' },
    { n: 20.99499, w: 'twenty baht ninety nine satang' },
    { n: 20.995, w: 'twenty one baht' },
    { n: 20.99999, w: 'twenty one baht' },
  ];
  moneys.forEach(m => {
    t.is(moneyToThaiWordLocaleEN(m.n), m.w);
  });
});

test('Invalid numbers', t => {
  const moneys = [-1, -0.25, -123.45];
  moneys.forEach(m => {
    t.falsy(moneyToThaiWordLocaleEN(m));
  });
});

