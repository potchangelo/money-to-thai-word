const test = require('ava').default;
const { moneyToThaiWord } = require('..');

test('Baht only', t => {
  const moneys = [
    { n: 0, w: 'ศูนย์บาทถ้วน' },
    { n: 7, w: 'เจ็ดบาทถ้วน' },
    { n: 23, w: 'ยี่สิบสามบาทถ้วน' },
    { n: 50, w: 'ห้าสิบบาทถ้วน' },
    { n: 100, w: 'หนึ่งร้อยบาทถ้วน' },
    { n: 311, w: 'สามร้อยสิบเอ็ดบาทถ้วน' },
    { n: 6543, w: 'หกพันห้าร้อยสี่สิบสามบาทถ้วน' },
    { n: 80808, w: 'แปดหมื่นแปดร้อยแปดบาทถ้วน' },
    { n: 414243, w: 'สี่แสนหนึ่งหมื่นสี่พันสองร้อยสี่สิบสามบาทถ้วน' },
    { n: 7531246, w: 'เจ็ดล้านห้าแสนสามหมื่นหนึ่งพันสองร้อยสี่สิบหกบาทถ้วน' },
    { n: 27531246, w: 'ยี่สิบเจ็ดล้านห้าแสนสามหมื่นหนึ่งพันสองร้อยสี่สิบหกบาทถ้วน' },
    { n: 527531246, w: 'ห้าร้อยยี่สิบเจ็ดล้านห้าแสนสามหมื่นหนึ่งพันสองร้อยสี่สิบหกบาทถ้วน' },
    { n: 9800000000, w: 'เก้าพันแปดร้อยล้านบาทถ้วน' },
    { n: 3000000000000, w: 'สามล้านล้านบาทถ้วน' },
    { n: 63000000000000, w: 'หกสิบสามล้านล้านบาทถ้วน' },
    { n: 760000000000000, w: 'เจ็ดร้อยหกสิบล้านล้านบาทถ้วน' },
    { n: 2700000000000000, w: 'สองพันเจ็ดร้อยล้านล้านบาทถ้วน' },
    { n: 12000000000000000, w: 'หนึ่งหมื่นสองพันล้านล้านบาทถ้วน' },
    { n: 210000000000000000, w: 'สองแสนหนึ่งหมื่นล้านล้านบาทถ้วน' },
    { n: 999999000000000000, w: 'เก้าแสนเก้าหมื่นเก้าพันเก้าร้อยเก้าสิบเก้าล้านล้านบาทถ้วน' },
    { n: 9000000000000000000, w: 'เก้าล้านล้านล้านบาทถ้วน' },
  ];
  moneys.forEach(m => {
    t.is(moneyToThaiWord(m.n), m.w);
  });
});

test('Baht without actual word (ถ้วน)', t => {
  const moneys = [
    { n: 0, w: 'ศูนย์บาท' },
    { n: 5, w: 'ห้าบาท' },
    { n: 66, w: 'หกสิบหกบาท' },
    { n: 123, w: 'หนึ่งร้อยยี่สิบสามบาท' },
    { n: 4215, w: 'สี่พันสองร้อยสิบห้าบาท' },
  ];
  moneys.forEach(m => {
    t.is(moneyToThaiWord(m.n, { showActual: false }), m.w);
  });
});

test('Baht and Satang', t => {
  const moneys = [
    { n: 0.75, w: 'เจ็ดสิบห้าสตางค์' },
    { n: 5.25, w: 'ห้าบาทยี่สิบห้าสตางค์' },
    { n: 51.30, w: 'ห้าสิบเอ็ดบาทสามสิบสตางค์' },
    { n: 635.08, w: 'หกร้อยสามสิบห้าบาทแปดสตางค์' },
    { n: 9503.99, w: 'เก้าพันห้าร้อยสามบาทเก้าสิบเก้าสตางค์' },
    { n: 32123.11, w: 'สามหมื่นสองพันหนึ่งร้อยยี่สิบสามบาทสิบเอ็ดสตางค์' },
    { n: 700000.50, w: 'เจ็ดแสนบาทห้าสิบสตางค์' },
    { n: 2000000.00, w: 'สองล้านบาทถ้วน' },
  ];
  moneys.forEach(m => {
    t.is(moneyToThaiWord(m.n), m.w);
  });
});

test('Baht and Satang edge cases', t => {
  const moneys = [
    { n: 0.001, w: 'ศูนย์บาทถ้วน' },
    { n: 0.00499, w: 'ศูนย์บาทถ้วน' },
    { n: 0.005, w: 'หนึ่งสตางค์' },
    { n: 0.99, w: 'เก้าสิบเก้าสตางค์' },
    { n: 0.99499, w: 'เก้าสิบเก้าสตางค์' },
    { n: 0.995, w: 'หนึ่งบาทถ้วน' },
    { n: 20.00111, w: 'ยี่สิบบาทถ้วน' },
    { n: 20.01111, w: 'ยี่สิบบาทหนึ่งสตางค์' },
    { n: 20.01999, w: 'ยี่สิบบาทสองสตางค์' },
    { n: 20.99111, w: 'ยี่สิบบาทเก้าสิบเก้าสตางค์' },
    { n: 20.99499, w: 'ยี่สิบบาทเก้าสิบเก้าสตางค์' },
    { n: 20.995, w: 'ยี่สิบเอ็ดบาทถ้วน' },
    { n: 20.99999, w: 'ยี่สิบเอ็ดบาทถ้วน' },
  ];
  moneys.forEach(m => {
    t.is(moneyToThaiWord(m.n), m.w);
  });
});

test('Invalid numbers', t => {
  const moneys = [-1, -0.25, -123.45];
  moneys.forEach(m => {
    t.falsy(moneyToThaiWord(m));
  });
});
