import $ from 'v-utility';

function upload(url, file) {
  return new Promise((resolve, reject) => {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('post', url, true);
    xmlhttp.onload = e => {
      console.log('load');
      console.log(xmlhttp);
      resolve();
    };
    xmlhttp.onerror = e => {
      console.log('error');
      console.log(xmlhttp);
      reject(e);
    };
    xmlhttp.onabort = e => {
      console.log('abort');
      console.log(xmlhttp);
      reject(e);
    };
    xmlhttp.ontimeout = e => {
      console.log('timeout');
      console.log(xmlhttp);
      reject(e);
    };
    let formData = new FormData();
    formData.append('backup', file);
    xmlhttp.send(formData);
  });
}

export default {
  upload
};
