/* eslint-disable */

import noDataPng from '../assets/tup.svg';

export default function matchErrorImg (content) {
  if (!content) {
    return '';
  }
  const reg = /<img\b.*?(?:\>|\/>)/gi
  content = content.replace(reg, function (data) {
    // const errorStr = 'onerror=' + replaceImgUrl;
    // const errorStr = 'onerror=javascript:this.src="' + noDataPng + '";';
    const relStr= 'referrerpolicy="no-referrer"';
    const errorStr = `onerror="javascript:this.src='${noDataPng}'"`;
    const arr = data.split(' ');
    // console.log('arr', arr);
    // 测试用
    // arr[1] = 'src="xxxx.png"';
    // 判断 onerror 是否存在 img 的属性中
    let judgeErrorExist = false;
    arr.map(item => {
      if (item.indexOf('onerror=') === 0) {
        item = errorStr;
        judgeErrorExist = true;
      }
      return true;
    });
    if (!judgeErrorExist) {
      arr.splice(1, 0, errorStr, relStr);
    }
    data = arr.join(' ');
    // data = '<img onerror=javascript:this.src="' + noDataPng + '"; src="xxxx">'
    return data;
  });
  return content;
}
