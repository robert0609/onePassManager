<template>
  <o-layout>
    <div class="search">
      <v-input class="keyword-input" ref="inputKeyword" v-model="keyword" name="keyword" :rule="'required'" placeholder="" @keyup.native.enter="handleSearch"></v-input>
      <v-button class="keyword-button" @click="handleSearch">search</v-button>
    </div>
    <div class="result">
      <div class="site">
        <ul>
          <li class="site-item" v-for="item in sites" :key="item.Id" @click="handleSelectSite(item)">
            <o-site :value="item"  :active="item.Id === siteId"></o-site>
          </li>
        </ul>
      </div>
      <div class="account">
        <ul>
          <li class="account-item" v-for="item in accounts" :key="item.Id">
            <o-account :value="item"></o-account>
          </li>
        </ul>
      </div>
    </div>
  </o-layout>
</template>

<script>
import { request } from 'v-utility';
import context from '../../common/context.js';
import oLayout from '../../components/layout/layout';
import oSite from '../../components/site/site';
import oAccount from '../../components/account/account';

export default {
  name: 'home',
  data() {
    return {
      keyword: '',
      siteId: 0,
      sites: [],
      accounts: []
    };
  },
  components: {
    oLayout,
    oSite,
    oAccount
  },
  methods: {
    init() {
      this.siteId = 0;
      this.sites = [];
      this.accounts = [];
    },
    handleSearch() {
      this.init();
      this.checkInput().catch(error => {
        return Promise.reject();
      }).then(() => {
        return request.getPromise(context.apiUrl('/webapi/search'), {
          keyword: this.keyword,
          withaccount: true
        });
      }).then(data => {
        this.sites = data;
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
      await this.$refs.inputKeyword.getValidResult();
    },
    handleSelectSite(site) {
      this.siteId = site.Id;
      this.accounts = site.AccountList;
    }
  }
};
</script>

<style scoped>
.result{
  position: relative;
}
.site{
  position: absolute;
  left: 0;
  top: 0;
  width: 440px;
  height: 810px;
  overflow-y: auto;
}
.site>ul{
  width: 400px;
}
.account{
  position: absolute;
  right: 0;
  top: 0;
  width: 600px;
}
.site-item{
  margin-bottom: 5px;
}
.account-item{
  float: left;
  margin-left: 5px;
}
.search{
  height: 40px;
}
.keyword-input{
  float: left;
  width: 400px;
}
.keyword-button{
  float: left;
  margin-left: 10px;
  width: 128px;
}
</style>
