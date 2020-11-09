/* eslint-disable */

import noDataPng from '../assets/tup.svg';

export default function matchErrorVideo (content) {
  if (!content) {
    return '';
  }
  const reg = /<video\b.*?(?:\>|\/>)/gi
  content = content.replace(reg, function (data) {
    // const errorStr = 'onerror=' + replaceImgUrl;
    // const errorStr = 'onerror=javascript:this.src="' + noDataPng + '";';
    const relStr= 'referrerpolicy="no-referrer"';
    const errorStr = `width='100%'`;
    const errorStr2 = `height='auto'`;
    const arr = data.split(' ');
    // console.log('arr', arr);
    // 测试用
    // arr[1] = 'src="xxxx.png"';
    // 判断 onerror 是否存在 img 的属性中
    arr.forEach((item, idx) => {
      if (item.indexOf('width=') === 0) {
        arr[idx] = errorStr;
      }
      if(item.indexOf('height=') === 0){
        arr[idx] = errorStr2;
      }
    });
    data = arr.join(' ');
    return data;
  });
  return content;
}
