<template>
  <n-auto-complete
    v-model:value="value"
    :options="options"
    placeholder="Input 'a' to show menu"
    @select="navigateTo(value, options)"
  />
</template>

<script>
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  setup() {
    const valueRef = ref("");
    function navigateTo(value, options){
        console.log(value, options);
    }
    return {
        navigateTo,
      value: valueRef,
      options: computed(() => {
        return ["@gmail.com", "@163.com", "@qq.com"].filter((item) => {
          const prefix = valueRef.value.split("@")[0];
          if(item.includes(valueRef.value)){
              return {
                label:  item,
                value:  item
            }
          }
          ;
        });
      }),
      
    };
  }
});
</script>