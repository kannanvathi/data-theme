
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
    
  },

  beforeDestroy() {},
  methods: {},
 
};
</script>
<style>

</style>
