<template>
  <n-layout embedded content-style="padding: 24px;">
    <n-row v-if="!data.value.length">
      <n-col :span="6"> </n-col>
      <n-col :span="12">
        <n-card>
          <n-space>
            <div
              class="d-flex align-item-center justify-content-center w-100 p-3"
            >
              <n-spin size="large" />
              <h4 class="ml-2">Loading data ...</h4>
            </div>
          </n-space>
        </n-card>
      </n-col>
    </n-row>
    <n-row v-else>
      <n-col :span="24">
        <n-card>
          <n-data-table
            :columns="columns"
            :data="data.value"
            :pagination="pagination"
            :max-height="400"
            :scroll-x="1800"
          />
        </n-card>
      </n-col>
    </n-row>
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
    const data = reactive({ value: [] });
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
<style>
.n-space > div{
  width: 100%;
}
.justify-content-center{
  justify-content: center;
}
</style>
