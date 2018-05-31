<template>
  <div class="page">
    <header>
      <h1>One Passord</h1>
    </header>
    <div class="body">
      <div class="menu">
        <ul>
          <li><router-link :to="{ name: 'home' }">Home</router-link></li>
          <li v-for="lvl in levels" :key="lvl"><router-link :to="{ name: 'list', query: { level: lvl } }">Level-{{lvl}}</router-link></li>
          <li><a href="/backup.db">Backup</a></li>
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
      levels
    };
  }
};
</script>

<style>
/* *{
  margin: 0;
  padding: 0;
} */
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
  padding: 0;
}
.menu>ul>li{
  display: block;
}
.main{
  margin-left: 100px;
}
footer{
  position: absolute;
  width: 1180px;
  bottom: 0;
  text-align: center;
}
</style>
