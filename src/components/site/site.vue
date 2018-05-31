<template>
  <div>
    <h3>{{value.Name}}</h3>
    <a href="value.Url" target="_blank">{{value.Url}}</a>
    <div @click="handleEdit">edit</div>
  </div>
</template>

<script>
export default {
  name: 'site',
  props: {
    value: {
      type: Object,
      default: () => null
    }
  },
  methods: {
    handleEdit() {
      //TODO:
    }
  }
};
</script>

<style scoped>

</style>
