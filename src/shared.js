/**
 * @param {number} money
 */
function getBahtAndSatang(money) {
  let baht = money,
    satang = 0;
  if (money < 0 || money === 0) return { baht: 0, satang };
  if (money % 1 !== 0) {
    baht = Math.floor(money);
    satang = Math.round((money - baht) * 100);
    if (satang >= 100) {
      baht += 1;
      satang = 0;
    }
  }
  return { baht, satang };
}

module.exports = { getBahtAndSatang };