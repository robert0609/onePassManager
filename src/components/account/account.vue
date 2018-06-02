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
  color: #fff;
  background: #67babb;
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
  background: #b0a174;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
.button:hover{
  border-color: #d8c790;
  background: #d8c790;
}
</style>
