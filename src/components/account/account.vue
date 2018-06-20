<template>
  <div class="container">
    <div class="username">{{value.UserName}}</div>
    <div class="operation">
      <div class="button" @click="handleEdit">edit</div>
      <div class="button" :class="{ [copyButtonClass]: true }" @click="handleCopy">copy</div>
    </div>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard';

export default {
  name: 'account',
  data() {
    return {
      copyHandler: null
    };
  },
  props: {
    value: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    copyButtonClass() {
      return `copy-password-${this.value.Id}`;
    }
  },
  mounted() {
    this.copyHandler = new ClipboardJS(`.${this.copyButtonClass}`, {
      text: () => {
        return this.value.Password;
      }
    });
    this.copyHandler.on('success', (e) => {
      console.info('Action:', e.action);
      console.info('Text:', e.text);
      console.info('Trigger:', e.trigger);

      this.$vToast.show({
        message: 'copied successfully!'
      });

      e.clearSelection();
    });

    this.copyHandler.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });
  },
  beforeDestroy() {
    this.copyHandler.destroy();
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
.username{
  height: 24px;
}
.operation{
  position: relative;
  height: 40px;
  display: flex;
}
.button{
  margin: 6px;
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
