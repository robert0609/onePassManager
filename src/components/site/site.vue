<template>
  <div class="container" :class="{ 'active': active }">
    <h4 class="title">{{value.Name}}</h4>
    <a v-if="isUrl" :href="value.Url" target="_blank">{{value.Url}}</a>
    <div class="button" @click.stop="handleEdit">edit</div>
  </div>
</template>

<script>
const noUrl = 'none';

export default {
  name: 'site',
  props: {
    value: {
      type: Object,
      default: () => null
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isUrl() {
      return this.value.Url !== noUrl;
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
  height: 40px;
  color: #fff;
  background: #67babb;
  border: 3px solid #ffffff;
  padding: 5px;
}
.container.active{
  border: 3px solid #d8c790;
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
