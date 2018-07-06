<template>
  <div class="unlock-container">
    <div class="logo-container">
      <img class="logo" src="../../static/logo.png">
    </div>
    <ul>
      <li>
        <div class="unlock-key-title">unlock key</div>
        <v-input class="unlock-key-input" ref="inputKey" v-model="key" name="unlock key" :rule="'required|max:20'" placeholder="" @keyup.native.enter="handleSubmit"></v-input>
      </li>
    </ul>
    <div>
      <v-button class="unlock-key-submit" @click="handleSubmit">submit</v-button>
    </div>
  </div>
</template>

<script>
import $, { cookie, request } from 'v-utility';
import context from '../../common/context.js';

export default {
  name: 'login',
  data() {
    return {
      key: ''
    };
  },
  mounted() {

  },
  methods: {
    handleSubmit(e) {
      this.checkInput().catch(error => {
        return Promise.reject();
      }).then(() => {
        return request.postPromise(context.apiUrl('/login'), {
          authority: this.key
        });
      }).then(() => {
        cookie.set('authority', this.key);
        this.$emit('success');
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
      await this.$refs.inputKey.getValidResult();
    }
  }
};
</script>

<style src="../../common/common.css">

</style>

<style scoped>
.unlock-container{
  width: 600px;
  margin: 0 auto;
}
.unlock-container .logo-container{
  text-align: center;
}
.unlock-container .logo-container .logo{
  width: 50px;
  height: 50px;
}
ul>li{
  position: relative;
  height: 60px;
}
ul>li>div{
  position: absolute;
  width: 120px;
  height: 100%;
  text-align: center;
  line-height: 36px;
}
.unlock-key-title{
}
.unlock-key-input{
  position: absolute;
  top: 0;
  left: 130px;
  width: 450px;
}
.unlock-key-submit{
  width: 128px;
  margin: 0 auto;
}
</style>
