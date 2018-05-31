<template>
  <o-layout>
    <div>
      <ul></ul>
    </div>
    <div></div>
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
      sites: [],
      accounts: []
    };
  },
  components: {
    oLayout,
    oSite,
    oAccount
  },
  mounted() {
    if (this.$route.query.level) {
      this.level = this.$route.query.level;
      this.loadSites();
    }
  },
  methods: {
    loadSites() {
      request.getPromise(context.apiUrl('/webapi/site/fetch'), { level: this.level }).then(data => {
        this.sites = data;
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
    }
  }
};
</script>

<style scoped>

</style>
