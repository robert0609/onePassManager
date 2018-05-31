<template>
  <div>
    <div>{{value.UserName}}</div>
    <div @click="handleEdit">edit</div>
    <div @click="handleCopy">copy</div>
  </div>
</template>

<script>
export default {
  name: 'account',
  props: {
    value: {
      type: Object,
      default: () => null
    }
  },
  methods: {
    handleEdit() {},
    handleCopy() {}
  }
};
</script>

<style scoped>

</style>
