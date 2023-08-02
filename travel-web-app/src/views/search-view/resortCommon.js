import { formatMoney } from '@/js/common/format'

export const genMoneyText = (model) => {
  let from_cost = (model.from_cost && model.from_cost > 0) ? model.from_cost : 0;
  let to_cost = (model.to_cost && model.to_cost > 0) ? model.to_cost : 0;
  let result = '0đ';
  if (from_cost && to_cost) {
    result = `${formatMoney(from_cost)}đ - ${formatMoney(to_cost)}đ`
  } else if (from_cost || to_cost) {
    result = `${formatMoney(from_cost || to_cost)}đ`
  }
  return result;
}