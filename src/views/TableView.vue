<template>
  <n-layout embedded content-style="padding: 24px;">
    <n-card v-if="!data.value.length">
      <n-space>
        <n-spin size="large" />
      </n-space>
    
    </n-card>
    
    <n-card v-else>
      <n-data-table
        :columns="columns"
        :data="data.value"
        :pagination="pagination"
        :max-height="400"
        :scroll-x="1800"
      />
    </n-card>
  </n-layout>
</template>

<script>
import { h, defineComponent, reactive } from "vue";
import { useStore } from "vuex";
const createColumns = () => [
  {
    title: "API",
    key: "API",
     fixed: "left",
    width: 100,
  },
  {
    title: "Description",
    key: "Description",
    width: 200,
  },
  {
    title: "Auth",
    key: "Auth",
  },
  {
    title: "HTTPS",
    key: "HTTPS",
  },
  {
    title: "Cors",
    key: "Cors",
    render(Cors, index) {
      return h("span", ["Cors: "]);
    },
  },
  {
    title: "Link",
    key: "Link",
  },
  {
    title: "Category",
    key: "Category",
  },
];

export default defineComponent({
  setup() {
    const store = useStore();
    const data = reactive({value: []});
    function loadData() {
      store.dispatch("getTableData").then((res) => {
        //data = res.entries;
        data.value = res.entries;
        console.log(data);
      });
    }
    loadData();
    return {
      data: data,
      columns: createColumns(),
      pagination: { pageSize: 10 },
    };
  },
});
</script>
