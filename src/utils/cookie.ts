const DATE_MIN_VALUE = new Date(0);

function isIP(str: string) {
  return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/g.test(str);
}

export function getRootDomain(hostname: string = location.hostname) {
  try {
    const urlHost = hostname.toLowerCase();
    const urlHostArray = urlHost.split('.');
    if (urlHostArray.length < 3 || isIP(urlHost)) {
      return urlHost;
    }
    const urlHost2 = urlHost.substr(urlHost.indexOf('.') + 1);
    if (
      urlHost2.startsWith('com.') ||
      urlHost2.startsWith('net.') ||
      urlHost2.startsWith('org.') ||
      urlHost2.startsWith('gov.')
    ) {
      return urlHost;
    } else {
      return urlHost2;
    }
  } catch (e) {
    return '';
  }
}

export function getCookie(key: string): any {
  const arrCookie = document.cookie.split('; ');
  for (let i = 0; i < arrCookie.length; i++) {
    const arr = arrCookie[i].split('=');
    if (arr[0] === key) {
      return arr[1];
    }
  }
  return '';
}

export function setCookie(
  key: string,
  val: any,
  options: {
    expires?: Date;
    path?: string;
    domain?: string;
  } = {
    path: '/',
    domain: ''
  }
) {
  //获取当前时间
  const date = new Date();
  const originalVal = getCookie(key);
  if (originalVal !== null && originalVal !== '') {
    //将date设置为过去的时间
    date.setTime(date.getTime() - 10000);
    //将这个cookie删除
    document.cookie =
      key + '=' + originalVal + '; expires=' + date.toUTCString() + '; path=/';
  }

  let strCookie = key + '=' + val.toString();
  const { expires, path, domain } = options;
  if (expires && expires.getTime() > DATE_MIN_VALUE.getTime()) {
    strCookie += '; expires=' + expires.toUTCString();
  }
  if (!path) {
    strCookie += '; path=/';
  } else {
    strCookie += '; path=' + path;
  }
  if (domain && domain.toLowerCase() !== 'localhost') {
    strCookie += '; domain=' + domain;
  }
  document.cookie = strCookie;
}

export function removeCookie(key: string) {
  //获取当前时间
  const date = new Date();
  const originalVal = getCookie(key);
  if (originalVal !== null && originalVal !== '') {
    //将date设置为过去的时间
    date.setTime(date.getTime() - 10000);
    //将这个cookie删除
    document.cookie =
      key + '=' + originalVal + '; expires=' + date.toUTCString() + '; path=/';
  }
}
