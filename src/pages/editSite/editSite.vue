<template>
  <div>
    <ul>
      <li>
        <span>Website name</span>
        <v-input ref="inputName" v-model="name" name="Website name" :rule="'required|max:50'" placeholder=""></v-input>
      </li>
      <li>
        <span>Website url</span>
        <v-input ref="inputUrl" v-model="url" name="Website url" :rule="'required|max:100|url:true'" placeholder=""></v-input>
      </li>
      <li>
        <span>Level</span>
        <v-input ref="inputLevel" v-model="level" name="Level" :rule="'required|in:1,2,3'" placeholder=""></v-input>
      </li>
    </ul>
    <div>
      <v-button @click="handleSubmit">提交</v-button>
    </div>
  </div>
</template>

<script>
import { request } from 'v-utility';
import context from '../../common/context.js';

export default {
  name: 'editSite',
  data() {
    return {
      id: 0,
      name: '',
      url: '',
      level: ''
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.id = Number(this.$route.query.id);
      request.getPromise(context.apiUrl('/webapi/site/fetch'), { id: this.id }).then(data => {
        if (data.length === 0) {
          this.$vToast.show({
            message: `不存在id为${this.id}的网站信息`
          });
        }
        else {
          let site = data[0];
          this.name = site.Name;
          this.url = site.Url;
          this.level = site.Level;
        }
      }).catch(error => {
        this.$vToast.show({
          message: error.message
        });
      });
    }
  },
  methods: {
    handleSubmit(e) {
      this.checkInput().catch(error => {
        return Promise.reject();
      }).then(() => {
        return request.postPromise(context.apiUrl('/webapi/site/save'), {
          site: JSON.stringify({
            Id: this.id,
            Name: encodeURIComponent(this.name),
            Url: this.url,
            Level: this.level
          })
        });
      }).then(data => {
        console.log(data);
      }).catch(error => {
        if (!error) {
          return;
        }
        this.$vToast.show({
          message: error.message
        });
      });
    },
    async checkInput() {
      await this.$refs.inputName.getValidResult();
      await this.$refs.inputUrl.getValidResult();
      await this.$refs.inputLevel.getValidResult();
    }
  }
};
</script>

<style scoped>

</style>
