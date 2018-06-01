<template>
  <o-layout>
    <ul>
      <li>
        <span>username</span>
        <v-input ref="inputUsername" v-model="username" name="username" :rule="'required|max:50'" placeholder=""></v-input>
      </li>
      <li>
        <span>password</span>
        <v-input ref="inputPassword" v-model="password" name="password" :rule="'required'" placeholder=""></v-input>
        <v-button @click="handleSubmit">generate</v-button>
      </li>
    </ul>
    <div>
      <v-button @click="handleSubmit">submit</v-button>
    </div>
  </o-layout>
</template>

<script>
import { request } from 'v-utility';
import context from '../../common/context.js';
import oLayout from '../../components/layout/layout';

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
  mounted() {
    if (this.$route.query.id) {
      this.id = Number(this.$route.query.id);
      request.getPromise(context.apiUrl('/webapi/account/fetch'), { id: this.id }).then(data => {
        if (data.length === 0) {
          this.$vToast.show({
            message: `不存在id为${this.id}的账号信息`
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
  methods: {
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
        console.log(data);
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

</style>
