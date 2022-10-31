const test = require('ava').default;
const { moneyToThaiWord } = require('..');

test('Baht only', t => {
  t.is(moneyToThaiWord(0), 'ศูนย์บาท');
  t.is(moneyToThaiWord(7), 'เจ็ดบาทถ้วน');
  t.is(moneyToThaiWord(17), 'สิบเจ็ดบาทถ้วน');
  t.is(moneyToThaiWord(23), 'ยี่สิบสามบาทถ้วน');
  t.is(moneyToThaiWord(50), 'ห้าสิบบาทถ้วน');
  t.is(moneyToThaiWord(100), 'หนึ่งร้อยบาทถ้วน');
  t.is(moneyToThaiWord(101), 'หนึ่งร้อยหนึ่งบาทถ้วน');
  t.is(moneyToThaiWord(111), 'หนึ่งร้อยสิบเอ็ดบาทถ้วน');
  t.is(moneyToThaiWord(149), 'หนึ่งร้อยสี่สิบเก้าบาทถ้วน');
  t.is(moneyToThaiWord(200), 'สองร้อยบาทถ้วน');
  t.is(moneyToThaiWord(312), 'สามร้อยสิบสองบาทถ้วน');
  t.is(moneyToThaiWord(513), 'ห้าร้อยสิบสามบาทถ้วน');
});
