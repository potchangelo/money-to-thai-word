const test = require('ava').default;
const { moneyToThaiWordLocaleEN } = require('..');

test('Baht only', t => {
  const moneys = [
    { n: 0, w: 'Zero baht' },
    { n: 7, w: 'Seven baht' },
    { n: 23, w: 'Twenty three baht' },
    { n: 50, w: 'Fifty baht' },
    { n: 100, w: 'One hundred baht' },
    { n: 311, w: 'Three hundred eleven baht' },
    { n: 6543, w: 'Six thousand five hundred forty three baht' },
    { n: 80808, w: 'Eighty thousand eight hundred eight baht' },
    { n: 414243, w: 'Four hundred fourteen thousand two hundred forty three baht' },
    { n: 7531246, w: 'Seven million five hundred thirty one thousand two hundred forty six baht' },
    { n: 27531246, w: 'Twenty seven million five hundred thirty one thousand two hundred forty six baht' },
    {
      n: 527531246,
      w: 'Five hundred twenty seven million five hundred thirty one thousand two hundred forty six baht',
    },
    { n: 9800000000, w: 'Nine billion eight hundred million baht' },
    { n: 3000000000000, w: 'Three trillion baht' },
    { n: 63000000000000, w: 'Sixty three trillion baht' },
    { n: 760000000000000, w: 'Seven hundred sixty trillion baht' },
    { n: 2700000000000000, w: 'Two quadrillion seven hundred trillion baht' },
    { n: 12000000000000000, w: 'Twelve quadrillion baht' },
    { n: 210000000000000000, w: 'Two hundred ten quadrillion baht' },
    { n: 999999000000000000, w: 'Nine hundred ninety nine quadrillion nine hundred ninety nine trillion baht' },
  ];
  moneys.forEach(m => {
    t.is(moneyToThaiWordLocaleEN(m.n), m.w);
  });
});

test('Baht and Satang', t => {
  const moneys = [
    { n: 0.03, w: 'Three satang' },
    { n: 0.75, w: 'Seventy five satang' },
    { n: 5.25, w: 'Five baht twenty five satang' },
    { n: 51.3, w: 'Fifty one baht thirty satang' },
    { n: 635.08, w: 'Six hundred thirty five baht eight satang' },
    { n: 9503.99, w: 'Nine thousand five hundred three baht ninety nine satang' },
    { n: 32123.11, w: 'Thirty two thousand one hundred twenty three baht eleven satang' },
    { n: 700000.5, w: 'Seven hundred thousand baht fifty satang' },
    { n: 2000000.0, w: 'Two million baht' },
  ];
  moneys.forEach(m => {
    t.is(moneyToThaiWordLocaleEN(m.n), m.w);
  });
});

test('Lowercase', t => {
  const moneys = [
    { n: 0.5, w: 'fifty satang' },
    { n: 8.25, w: 'eight baht twenty five satang' },
    { n: 19, w: 'nineteen baht' },
  ];
  moneys.forEach(m => {
    t.is(moneyToThaiWordLocaleEN(m.n, { textTransform: 'lowercase' }), m.w);
  });
});

test('Uppercase', t => {
  const moneys = [
    { n: 0.5, w: 'FIFTY SATANG' },
    { n: 8.25, w: 'EIGHT BAHT TWENTY FIVE SATANG' },
    { n: 19, w: 'NINETEEN BAHT' },
  ];
  moneys.forEach(m => {
    t.is(moneyToThaiWordLocaleEN(m.n, { textTransform: 'uppercase' }), m.w);
  });
});

test('Capitalize', t => {
  const moneys = [
    { n: 0.5, w: 'Fifty Satang' },
    { n: 8.25, w: 'Eight Baht Twenty Five Satang' },
    { n: 19, w: 'Nineteen Baht' },
  ];
  moneys.forEach(m => {
    t.is(moneyToThaiWordLocaleEN(m.n, { textTransform: 'capitalize' }), m.w);
  });
});

test('Baht and Satang edge cases', t => {
  const moneys = [
    { n: 0.001, w: 'Zero baht' },
    { n: 0.00499, w: 'Zero baht' },
    { n: 0.005, w: 'One satang' },
    { n: 0.99, w: 'Ninety nine satang' },
    { n: 0.99499, w: 'Ninety nine satang' },
    { n: 0.995, w: 'One baht' },
    { n: 20.00111, w: 'Twenty baht' },
    { n: 20.01111, w: 'Twenty baht one satang' },
    { n: 20.01999, w: 'Twenty baht two satang' },
    { n: 20.99111, w: 'Twenty baht ninety nine satang' },
    { n: 20.99499, w: 'Twenty baht ninety nine satang' },
    { n: 20.995, w: 'Twenty one baht' },
    { n: 20.99999, w: 'Twenty one baht' },
  ];
  moneys.forEach(m => {
    t.is(moneyToThaiWordLocaleEN(m.n), m.w);
  });
});

test('Invalid numbers', t => {
  const moneys = [-1, -0.25, -123.45, 1e18, 1000000000000000001];
  moneys.forEach(m => {
    t.falsy(moneyToThaiWordLocaleEN(m));
  });
});
