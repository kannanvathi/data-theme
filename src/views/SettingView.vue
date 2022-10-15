<template>
<div class="container-box">
    <div class="center-box">
        <n-tag type="warning" class="mb-3">
        {{isDark ? 'Dark Mode' : 'Light Mode'}}
        </n-tag>
        <n-button type="info" @click="toggleDark()">
          Toggle color mode
        </n-button>
  </div>
</div>
  
</template>
<script>
import { useDark, useToggle } from "@vueuse/core";
export default {
  setup() {
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    return {
      isDark,
      toggleDark,
    };
  },
};
</script>
<style>
    .container-box{
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
    }
    .center-box{
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        flex-direction: column;
        transform: translate(-50%, -50%);
    }
</style>