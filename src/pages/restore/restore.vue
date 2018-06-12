<template>
  <o-layout>
    <ul>
      <li>
        <div class="select" @click="handleSelectFile">+Select backup file</div>
        <div class="filename">{{backupFileName}}</div>
        <input type="file" ref="inputUploadFile" v-show="false" @change="handleSelectedFile">
      </li>
    </ul>
    <div>
      <v-button class="button" @click="handleSubmit">submit</v-button>
    </div>
  </o-layout>
</template>

<script>
import context from '../../common/context.js';
import oLayout from '../../components/layout/layout';
import uploader from '../../common/upload.js';

export default {
  name: 'restore',
  data() {
    return {
      backupFile: null
    };
  },
  components: {
    oLayout
  },
  computed: {
    backupFileName() {
      if (this.backupFile) {
        return this.backupFile.name;
      }
      else {
        return '';
      }
    }
  },
  methods: {
    handleSelectFile() {
			let evt = document.createEvent('MouseEvents');
			evt.initEvent('click', true, true);
			this.$refs.inputUploadFile.dispatchEvent(evt);
    },
    handleSelectedFile(e) {
      let files = e.target.files;
      console.log(files);
      if (files.length > 0) {
        this.backupFile = files[0];
      }
      else {
        this.backupFile = null;
      }
    },
    handleSubmit(e) {
      if (!this.backupFile) {
        e.hideLoading();
        this.$vToast.show({
          message: 'please select a backup file'
        });
        return;
      }
      uploader.upload('/restore', this.backupFile).then(() => {
        e.hideLoading();
        this.$vToast.show({
          message: 'restore successfully!'
        });
      }).catch(error => {
        e.hideLoading();
        this.$vToast.show({
          message: 'restore failed!'
        });
      });
    }
  }
};
</script>

<style scoped>
ul>li{
  position: relative;
}
ul>li>div.select{
  position: relative;
  width: 180px;
  height: 40px;
  text-align: center;
  line-height: 38px;
  color: #b0a174;
  background: hsla(46,48%,71%,.4);
  border: 1px dashed #b0a174;
  cursor: pointer;
}
ul>li>div.filename{
  position: absolute;
  top: 0;
  left: 200px;
  width: 500px;
  height: 40px;
  text-align: left;
  line-height: 38px;
}
.button{
  width: 128px;
}
</style>
