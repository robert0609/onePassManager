<template>
  <div>
    <div>
      <ul>
        <li><router-link :to="{ name: 'home' }">Home</router-link></li>
        <li v-for="lvl in levels" :key="lvl"><router-link :to="{ name: 'list', query: { level: lvl } }">Level-{{lvl}}</router-link></li>
        <li><a href="/backup.db">Backup</a></li>
      </ul>
    </div>
    <div>
      <slot></slot>
    </div>
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

</style>
