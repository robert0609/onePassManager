<template>
  <div class="page">
    <header>
      <img class="logo" src="../../static/logo.png">
      <h1 class="title">One Password</h1>
    </header>
    <div class="body">
      <div class="menu">
        <ul>
          <li><router-link :to="{ name: 'home' }">Home</router-link></li>
          <li v-for="lvl in levels" :key="lvl"><router-link :to="{ name: 'list', query: { level: lvl } }">Level-{{lvl}}</router-link></li>
          <li><a :href="backupUrl">Backup</a></li>
          <li><router-link :to="{ name: 'restore' }">Restore</router-link></li>
        </ul>
      </div>
      <div class="main">
        <slot></slot>
      </div>
    </div>
    <footer></footer>
  </div>
</template>

<script>
import { request, browser } from 'v-utility';
import context from '../../common/context.js';

const levels = ['1', '2', '3'];

export default {
  name: 'layout',
  data() {
    return {
      levels,
      backupUrl: '/backup'
    };
  },
  mounted() {
    this.init(this.$route.query);
  },
  methods: {
    init(query) {
      request.getPromise(context.apiUrl('/login')).then(() => {
        this.$emit('pageload', query);
      }).catch(error => {
        if (error.errorCode === 1) {
          this.$router.load(browser.location.addParameter({ source: location.href }, '/unlock'), { replace: true });
        }
        else {
          this.$vToast.show({
            message: error.message
          });
        }
      });
    }
  }
};
</script>

<style src="../../common/common.css">

</style>

<style scoped>
.page{
  width: 1180px;
  margin: 0 auto;
}
header .logo{
  width: 50px;
  height: 50px;
  float: left;
}
header .title{
  margin-left: 100px;
  padding-top: 6px;
}
.menu{
  float: left;
}
.menu>ul{
  margin: 0;
}
.menu>ul>li{
  margin-bottom: 5px;
}
.main{
  margin-left: 100px;
  position: relative;
}
footer{
  position: absolute;
  width: 1180px;
  bottom: 0;
  text-align: center;
}
</style>
