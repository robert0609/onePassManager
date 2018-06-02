<template>
  <div class="page">
    <header>
      <h1>One Password</h1>
    </header>
    <div class="body">
      <div class="menu">
        <ul>
          <li><router-link :to="{ name: 'home' }">Home</router-link></li>
          <li v-for="lvl in levels" :key="lvl"><router-link :to="{ name: 'list', query: { level: lvl } }">Level-{{lvl}}</router-link></li>
          <li><a :href="backupUrl">Backup</a></li>
        </ul>
      </div>
      <div class="main">
        <slot></slot>
      </div>
    </div>
    <footer>footer</footer>
  </div>
</template>

<script>
const levels = [1, 2, 3];

export default {
  name: 'layout',
  data() {
    return {
      levels,
      backupUrl: '/backup.db'
    };
  }
};
</script>

<style>
ul{
  padding: 0;
}
ul>li{
  display: block;
}
</style>

<style scoped>
.page{
  width: 1180px;
  margin: 0 auto;
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
