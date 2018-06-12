<template>
  <o-layout>
    <input type="file" ref="inputUploadFile">
    <v-button class="restore-submit" @click="handleSubmit">submit</v-button>
  </o-layout>
</template>

<script>
import context from '../../common/context.js';
import oLayout from '../../components/layout/layout';
import uploader from '../../common/upload.js';

export default {
  name: 'restore',
  components: {
    oLayout
  },
  methods: {
    handleSubmit(e) {
      console.log(this.$refs.inputUploadFile.files);
      uploader.upload('/restore', this.$refs.inputUploadFile.files[0]).then(() => {}).catch(error => {});
      e.hideLoading();
    }
  }
};
</script>

<style>
.restore-submit{
  width: 128px;
  margin: 0 auto;
}
</style>
