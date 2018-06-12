<template>
  <o-layout @pageload="handleLoad">
    <div class="site">
      <div class="new-container">
        <div class="new-button" @click="handleNewSite">new site</div>
      </div>
      <ul>
        <li v-if="sites.length > 0" class="site-item" v-for="item in sites" :key="item.Id" @click="handleSelectSite(item)">
          <o-site :value="item" :active="item.Id === siteId"></o-site>
        </li>
      </ul>
    </div>
    <div class="account">
      <div class="new-container" v-if="siteId > 0">
        <div class="new-button" @click="handleNewAccount">new account</div>
      </div>
      <ul>
        <li v-if="accounts.length > 0" class="account-item" v-for="item in accounts" :key="item.Id">
          <o-account :value="item"></o-account>
        </li>
      </ul>
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
  name: 'list',
  data() {
    return {
      level: '',
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
  beforeRouteUpdate(to, from, next) {
    this.handleLoad(to.query);
    next();
  },
  methods: {
    handleLoad(query) {
      if (query.level) {
        this.level = query.level;
        this.loadSites();
      }
      else {
        this.$vToast.show({
          message: 'level is null!'
        });
      }
      this.siteId = 0;
      this.accounts = [];
    },
    loadSites() {
      request.getPromise(context.apiUrl('/webapi/site/fetch'), { level: this.level }).then(data => {
        this.sites = data.sort((a, b) => b.Id - a.Id);
      }).catch(error => {
        this.$vToast.show({
          message: error.message
        });
      });
    },
    loadAccounts(site) {
      request.getPromise(context.apiUrl('/webapi/account/fetch'), { siteid: site.Id }).then(data => {
        this.accounts = data;
      }).catch(error => {
        this.$vToast.show({
          message: error.message
        });
      });
    },
    handleSelectSite(site) {
      this.siteId = site.Id;
      this.loadAccounts(site);
    },
    handleNewSite() {
        this.$router.push({ name: 'editSite', query: { level: this.level } });
    },
    handleNewAccount() {
        this.$router.push({ name: 'editAccount', query: { siteid: this.siteId } });
    }
  }
};
</script>

<style scoped>
.site{
  position: absolute;
  left: 0;
  top: 0;
  width: 400px;
}
.account{
  position: absolute;
  right: 0;
  top: 0;
  width: 600px;
}
.new-container{

}
.site-item{
  margin-bottom: 5px;
}
.account-item{
  float: left;
  margin-right: 5px;
}
.new-button{
  margin-left: 0;
  width: 96px;
  font-size: 14px;
  line-height: 28px;
  border: 1px solid #b0a174;
  color: #b0a174;
  text-align: center;
  cursor: pointer;
}
</style>
