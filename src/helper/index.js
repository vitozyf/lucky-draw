export function setData(key, value) {
  if (typeof value === 'string') {
    return localStorage.setItem(key, value);
  }
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    return err;
  }
}

export function getData(key) {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (err) {
    return value;
  }
}

export function removeData(key) {
  return localStorage.removeItem(key);
}

export function clearData() {
  return localStorage.clear();
}

export function getDomData(element, dataName) {
  if (!element || !dataName || !element.getAttribute) {
    return;
  }
  return element.getAttribute('data-' + dataName);
}

export const configField = 'config'; // 配置数据
export const resultField = 'result'; // 抽奖结果
export const newLotteryField = 'newLottery'; // 新增奖项
export const listField = 'list'; // 名单
export function conversionCategoryName(key) {
  let name = '';
  switch (key) {
    case 'firstPrize':
      name = '一等奖';
      break;
    default:
      break;
  }
  const newLottery = getData(newLotteryField) || [];
  const findres = newLottery.find(item => item.key === key);
  if (findres) {
    name = findres.name;
  }
  return name;
}
