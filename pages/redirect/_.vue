<script>
export default {
  beforeCreate() {
    const { params, query } = this.$route;
    const { pathMatch } = params;
    this.$router.replace({ path: '/' + pathMatch, query });
  },
  render: function(h) {
    return h(); // avoid warning message
  },
};
</script>
