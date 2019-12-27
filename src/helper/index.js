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

export function conversionCategoryName(key) {
  let name = '';
  switch (key) {
    case 'specialAward':
      name = '特等奖';
      break;
    case 'firstPrize':
      name = '一等奖';
      break;
    case 'secondPrize':
      name = '二等奖';
      break;
    case 'thirdPrize':
      name = '三等奖';
      break;
    case 'fourthPrize':
      name = '四等奖';
      break;
    case 'fifthPrize':
      name = '五等奖';
      break;
    case 'additionalPrize1':
      name = '追加奖(1)';
      break;
    case 'additionalPrize2':
      name = '追加奖(2)';
      break;
    case 'additionalPrize3':
      name = '追加奖(3)';
      break;
    case 'additionalPrize4':
      name = '追加奖(4)';
      break;
    case 'additionalPrize5':
      name = '追加奖(5)';
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
