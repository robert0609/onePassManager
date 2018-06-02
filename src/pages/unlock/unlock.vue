<template>
  <o-login @success="handleSuccess"></o-login>
</template>

<script>
import oLogin from '../../components/login/login';

export default {
  name: 'unlock',
  data() {
    return {
      sourceUrl: '/'
    };
  },
  components: {
    oLogin
  },
  mounted() {
    if (this.$route.query.source) {
      this.sourceUrl = this.$route.query.source;
    }
  },
  methods: {
    handleSuccess() {
      this.$router.load(this.sourceUrl, { replace: true });
    }
  }
};
</script>

<style scoped>

</style>
