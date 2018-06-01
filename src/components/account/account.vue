<template>
  <div class="container">
    <div>{{value.UserName}}</div>
    <div class="operation">
      <div class="button" @click="handleEdit">edit</div>
      <div class="button" @click="handleCopy">copy</div>
    </div>
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
    handleEdit() {
      if (this.value) {
        this.$router.push({ name: 'editAccount', query: { id: this.value.Id } });
      }
    },
    handleCopy() {
      //TODO:
    }
  }
};
</script>

<style scoped>
.container{
  width: 200px;
  border:1px solid;
  padding: 5px;
}
.operation{
  position: relative;
  height: 40px;
  display: flex;
}
.button{
  margin: 6px;
  width: 50px;
  font-size: 14px;
  line-height: 28px;
  border: 1px solid #b0a174;
  color: #b0a174;
  text-align: center;
  cursor: pointer;
}
</style>
