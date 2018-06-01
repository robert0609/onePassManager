<template>
  <div class="container">
    <h4 class="title">{{value.Name}}</h4>
    <a href="value.Url" target="_blank">{{value.Url}}</a>
    <div class="button" @click.stop="handleEdit">edit</div>
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
      if (this.value) {
        this.$router.push({ name: 'editSite', query: { id: this.value.Id } });
      }
    }
  }
};
</script>

<style scoped>
.container{
  position: relative;
  width: 100%;
  border:1px solid;
  padding: 5px;
}
.title{
  margin: 0;
}
.button{
  position: absolute;
  top: 5px;
  right: 5px;
  margin-left: 10px;
  width: 96px;
  font-size: 14px;
  line-height: 28px;
  border: 1px solid #b0a174;
  color: #b0a174;
  text-align: center;
  cursor: pointer;
}
</style>
