import { getType, VariableType } from 'roy-type-assert';

export function upload(url: string, file: File) {
  return new Promise<void>((resolve, reject) => {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('post', url, true);
    xmlhttp.onload = (e) => {
      console.log('load');
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          let resp = null;
          if (getType(xmlhttp.response) === VariableType.bUndefined) {
            resp = xmlhttp.responseText;
          } else {
            resp = xmlhttp.response;
          }
          const data = JSON.parse(resp, dateReviver);
          if (data.isSuccess) {
            resolve();
          } else {
            console.log('business error');
            reject();
          }
        } else {
          console.log('failed');
          reject();
        }
      }
    };
    xmlhttp.onerror = (e) => {
      console.log('error');
      reject();
    };
    xmlhttp.onabort = (e) => {
      console.log('abort');
      reject();
    };
    xmlhttp.ontimeout = (e) => {
      console.log('timeout');
      reject();
    };
    const formData = new FormData();
    formData.append('backup', file);
    xmlhttp.send(formData);
  });
}

function dateReviver(key: string, value: any) {
  let a;
  if (typeof value === 'string') {
    a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)/.exec(
      value
    );
    if (a) {
      const utc = new Date(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]);
      const offset = new Date().getTimezoneOffset();
      const localMinute = utc.getMinutes() - offset;
      utc.setMinutes(localMinute);
      return utc;
    }
  }
  return value;
}
