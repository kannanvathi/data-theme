
<template>
  <header-view></header-view>
  <RouterView :key="$route.path" />
</template>
<script>
import HeaderView from "./views/HeaderView.vue";

export default {
  components: {
    HeaderView,
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("setThemeGlobal").then(res => {
      console.log(res);
    })
  },

  beforeDestroy() {},
  methods: {},
 
};
</script>
<style>

</style>
