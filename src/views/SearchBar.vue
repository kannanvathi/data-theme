<template>
  <n-space>
    <n-dropdown :show="showDropdown" :options="options" @select="handleSelect">
      <n-input v-model:value="query" @update:value="handleClick" type="text" placeholder=" Search by name" />
    </n-dropdown>
  </n-space>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useMessage } from "naive-ui";
import { useStore } from "vuex";
import { useRouter } from "vue-router"

export default defineComponent({
  setup() {
      const store = useStore();
      const router = useRouter();
    //const message = useMessage();
    const query = ref("");
    const showDropdownRef = ref(false);
    let rawOptions;
    store.dispatch("getCardData").then(res => {
         rawOptions = store.state.searchOptions
    });
    
    const options = ref(rawOptions)  
    return {
      options: options,
      query:query,
      showDropdown: showDropdownRef,
      handleSelect(key) {
        console.log(key);
        //router.push({path: "/card/" + key});
        router.replace({ path: '/card/' + key })
        query.value = "";
        showDropdownRef.value = false;
      },
      handleClick() {
          if(query.value === ""){
              showDropdownRef.value = false;
          }
          else{
              showDropdownRef.value = true;
          }
          options.value = rawOptions.filter(option => option.label.includes(query.value));
          store.dispatch("searchQuery", query.value).then(res => {

          });       
      }
    };
  }
});
</script>