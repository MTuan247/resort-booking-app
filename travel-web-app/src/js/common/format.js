/**
 * Hàm format giá trị tiền tệ
 * Author: NMTuan (05/07/2021)
 * @param {*} value 
 * @returns 
 */
export function formatMoney(value) {
  if (!value) return '';
  value = parseInt(value).toString()
  value = value.replaceAll('.','')
  value = value.replaceAll(',','')
  return Number(value).toLocaleString('it-IT');
  // return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}