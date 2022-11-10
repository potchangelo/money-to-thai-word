# money-to-thai-word

Convert money, in currency Baht and Satang, to Thai word (Thai or English locale).


## Install

```
npm install @potchangelo/money-to-thai-word
```


## Examples

### CommonJS

```
const { moneyToThaiWord, moneyToThaiWordLocaleEN } = require('@potchangelo/money-to-thai-word');

moneyToThaiWord(6543);
// หกพันห้าร้อยสี่สิบสามบาทถ้วน

moneyToThaiWordLocaleEN(635.08);
// Six hundred thirty five baht eight satang
```

### ES Module

```
const { moneyToThaiWord, moneyToThaiWordLocaleEN } = require('@potchangelo/money-to-thai-word');

moneyToThaiWord(5.25);
// ห้าบาทยี่สิบห้าสตางค์

moneyToThaiWordLocaleEN(80808);
// Eighty thousand eight hundred eight baht
```
