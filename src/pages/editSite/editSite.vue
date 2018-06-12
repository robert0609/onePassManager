<template>
  <o-layout @pageload="handleLoad">
    <ul>
      <li>
        <div>Website name</div>
        <v-input class="input" ref="inputName" v-model="name" name="Website name" :rule="'required|max:50'" placeholder=""></v-input>
      </li>
      <li>
        <div>Website url</div>
        <v-input class="input" ref="inputUrl" v-model="url" name="Website url" :rule="'max:100|url:true'" placeholder=""></v-input>
      </li>
      <li>
        <div>Level</div>
        <v-input class="input" ref="inputLevel" v-model="level" name="Level" :rule="'required|in:1,2,3'" placeholder=""></v-input>
      </li>
    </ul>
    <div>
      <v-button class="button" @click="handleSubmit">submit</v-button>
    </div>
  </o-layout>
</template>

<script>
import { request } from 'v-utility';
import context from '../../common/context.js';
import oLayout from '../../components/layout/layout';

const noUrl = 'none';

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
  components: {
    oLayout
  },
  methods: {
    handleLoad() {
      if (this.$route.query.id) {
        this.id = Number(this.$route.query.id);
        request.getPromise(context.apiUrl('/webapi/site/fetch'), { id: this.id }).then(data => {
          if (data.length === 0) {
            this.$vToast.show({
              message: `there is not any site that id is ${this.id}!`
            });
          }
          else {
            let site = data[0];
            this.name = site.Name;
            this.url = site.Url === noUrl ? '' : site.Url;
            this.level = site.Level.toString();
          }
        }).catch(error => {
          this.$vToast.show({
            message: error.message
          });
        });
      }
      if (this.$route.query.level) {
        this.level = this.$route.query.level;
      }
    },
    handleSubmit(e) {
      this.checkInput().catch(error => {
        return Promise.reject();
      }).then(() => {
        return request.postPromise(context.apiUrl('/webapi/site/save'), {
          site: JSON.stringify({
            Id: this.id,
            Name: encodeURIComponent(this.name),
            Url: this.url ? this.url : noUrl,
            Level: this.level
          })
        });
      }).then(data => {
        this.$router.back();
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
ul>li{
  position: relative;
  height: 60px;
}
ul>li>div{
  position: relative;
  width: 120px;
  height: 100%;
  text-align: center;
  line-height: 36px;
}
ul>li>.input{
  position: absolute;
  top: 0;
  left: 130px;
  width: 500px;
}
.button{
  width: 128px;
}
</style>
