<template>
  <o-layout @pageload="handleLoad">
    <ul>
      <li>
        <div class="title">username</div>
        <v-input class="input" ref="inputUsername" v-model="username" name="username" :rule="'required|max:50'" placeholder=""></v-input>
      </li>
      <li>
        <div class="title">password</div>
        <v-input class="input" ref="inputPassword" v-model="password" name="password" :rule="'required'" placeholder=""></v-input>
        <v-button class="generate_button" @click="handleGenerate">generate</v-button>
      </li>
    </ul>
    <div>
      <v-button class="button" @click="handleSubmit">submit</v-button>
    </div>
  </o-layout>
</template>

<script>
import { request } from 'v-utility';
import context from '../../common/context.js';
import oLayout from '../../components/layout/layout';

const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#'.split('');
function randomPassword(n) {
  let result = [];
  let max = chars.length;
  for (let i = 0; i < n; ++i) {
    let idx = Math.floor((Math.random()*max));
    result.push(chars[idx]);
  }
  return result.join('');
}

export default {
  name: 'editSite',
  data() {
    return {
      id: 0,
      siteId: 0,
      username: '',
      password: ''
    };
  },
  components: {
    oLayout
  },
  methods: {
    handleLoad() {
      if (this.$route.query.id) {
        this.id = Number(this.$route.query.id);
        request.getPromise(context.apiUrl('/webapi/account/fetch'), { id: this.id }).then(data => {
          if (data.length === 0) {
            this.$vToast.show({
              message: `there is not any account that id is ${this.id}!`
            });
          }
          else {
            let account = data[0];
            this.siteId = account.SiteId;
            this.username = account.UserName;
            this.password = account.Password;
          }
        }).catch(error => {
          this.$vToast.show({
            message: error.message
          });
        });
      }
      else if (this.$route.query.siteid) {
        this.siteId = Number(this.$route.query.siteid);
      }
      else {
        this.$vToast.show({
          message: 'siteId can not be zero!'
        });
      }
    },
    handleGenerate(e) {
      this.password = randomPassword(10);
    },
    handleSubmit(e) {
      this.checkInput().catch(error => {
        return Promise.reject();
      }).then(() => {
        return new Promise((resolve, reject) => {
          if (this.siteId === 0) {
            reject(new Error('siteId can not be zero!'));
          }
          else {
            resolve();
          }
        });
      }).then(() => {
        return request.postPromise(context.apiUrl('/webapi/account/save'), {
          account: JSON.stringify({
            Id: this.id,
            SiteId: this.siteId,
            UserName: encodeURIComponent(this.username),
            Password: this.password
          })
        });
      }).then(data => {
        this.$router.back();
      }).catch(error => {
        if (!error) {
          return;
        }
        this.$vToast.show({
          message: error.message
        });
      });
    },
    async checkInput() {
      await this.$refs.inputUsername.getValidResult();
      await this.$refs.inputPassword.getValidResult();
    }
  }
};
</script>

<style scoped>
ul>li{
  position: relative;
  height: 60px;
}
ul>li>.title{
  position: absolute;
  width: 120px;
  height: 100%;
  text-align: center;
  line-height: 36px;
}
ul>li>.input{
  position: absolute;
  top: 0;
  left: 130px;
  width: 500px;
}
ul>li>.generate_button{
  position: absolute;
  top: 0;
  left: 630px;
  margin-left: 10px;
  width: 128px;
}
.button{
  float: left;
  margin-left: 10px;
  width: 128px;
}
</style>
