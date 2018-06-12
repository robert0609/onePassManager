import $ from 'v-utility';

function upload(url, file) {
  return new Promise((resolve, reject) => {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('post', url, true);
    xmlhttp.onload = e => {
      console.log('load');
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          let resp = null;
          if ($.checkType(xmlhttp.response) === $.enumType.eUndefined) {
            resp = xmlhttp.responseText;
          }
          else {
            resp = xmlhttp.response;
          }
          let data = JSON.parse(resp, dateReviver);
          if (data.isSuccess) {
            resolve();
          }
          else {
            console.log('business error');
            reject();
          }
        }
        else {
          console.log('failed');
          reject();
        }
      }
    };
    xmlhttp.onerror = e => {
      console.log('error');
      reject();
    };
    xmlhttp.onabort = e => {
      console.log('abort');
      reject();
    };
    xmlhttp.ontimeout = e => {
      console.log('timeout');
      reject();
    };
    let formData = new FormData();
    formData.append('backup', file);
    xmlhttp.send(formData);
  });
}

function dateReviver(key, value) {
	let a;
	if (typeof value === 'string') {
		a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)/.exec(value);
		if (a) {
			let utc = new Date(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]);
			let offset = (new Date()).getTimezoneOffset();
			let localMinute = utc.getMinutes() - offset;
			utc.setMinutes(localMinute);
			return utc;
		}
	}
	return value;
}

export default {
  upload
};
