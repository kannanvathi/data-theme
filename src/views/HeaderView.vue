<template>
  <div class="d-flex align-items-center justify-content-around w-100">
    <n-menu :options="menuOptions" />
    <search-bar></search-bar>
  </div>
</template>

<script>
import { defineComponent, h } from "vue";
import { NIcon } from "naive-ui";
import { RouterLink } from "vue-router";
import {
  LaptopOutline as WorkIcon,
  LogOutOutline as HomeIcon
} from "@vicons/ionicons5";
import SearchBar from "./SearchBar.vue";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
    {
    label: () => h(
      RouterLink,
      {
        to: {
          name: "table",
        }
      },
      { default: () => "Table" }
    ),
    key: "table",
    icon: renderIcon(HomeIcon)
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: "card",
        }
      },
      { default: () => "Card" }
    ),
    key: "card",
    icon: renderIcon(HomeIcon)
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          path: "/setting"
        }
      },
      { default: () => "Setting" }
    ),
    key: "setting",
    icon: renderIcon(WorkIcon)
  }
];

export default defineComponent({
  components: {
    SearchBar
  },
  setup() {
    SearchBar
    return {
      menuOptions
    };
  }
});
</script>
<style scoped>
.n-menu{
    display: flex;
    align-items: center;
    justify-content: center;
}
.justify-content-around{
  justify-content: space-around;
}
</style>