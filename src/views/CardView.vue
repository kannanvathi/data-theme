<template>
  <n-layout embedded content-style="padding: 24px;" class="card-view">
    <n-row
       :gutter="[12, 8]" 
    v-if="!data.users.length">
    <n-col
        :span="6"
    >
    </n-col>
      <n-col
        :span="12"
      >
        <n-card>
          <n-space>
            <n-spin size="large" />
            <h4>Loading data ...</h4>
          </n-space>
        </n-card>
      </n-col>
    </n-row>

    <n-row :gutter="[12, 8]" v-else>
      <n-col v-for="user in data.users" :key="user.id" :span="6">
        <n-card
          :title="user.username"
          :segmented="{
            content: true,
            footer: 'soft',
          }"
        >
          <template #header-extra>
            <n-button quaternary type="info" @click="viewCard(user.id)">
              View
            </n-button>
          </template>
          <img :src="user.image" />
          <div class="d-block p-3">
            <h2 class="">{{ user.firstName }} {{ user.lastName }}</h2>
            <p class="pb-2">{{ user.email }}</p>
            <p>Phone: {{ user.phone }}</p>
          </div>
          <template #action>
            <n-button type="error" @click="deleteCard(user.id)">
              Delete
            </n-button>
          </template>
        </n-card>
      </n-col>
    </n-row>
  </n-layout>
</template>
<script>
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, watch } from '@vue/runtime-core';
export default {
  setup() {
    const data = reactive({ users: [] });
    const store = useStore();
    const router = useRouter();
    const searchQuery = computed(() => {
      console.log(store.getters.searchQuery)
      return store.state.searchQuery;
    })
    watch(searchQuery, (current, old) => {
      data.users = store.state.cardData.filter(card => {
        return card.firstName.includes(current) || card.lastName.includes(current) || (card.username ? card.username.includes(current): false)
      })
    })
    function loadData() {
      store
        .dispatch("getCardData")
        .then((res) => {
          data.users = store.state.cardData;
          
        })
        .catch((error) => alert(error));
    }
    loadData();
    function viewCard(id) {
      router.push({ name: "single-card", params: { id: id } });
    }
    function deleteCard(id) {
      store.dispatch("deleteCard", id).then((res) => {
          data.users = store.state.cardData;
      });
    }
    return {
      data: data,
      viewCard,
      deleteCard,
    };
  },
};
</script>
<style>
.card-view .n-card__content,
.card-view .n-card.n-card--content-segmented > .n-card__content {
  padding: 0;
  padding-top: 0;
}
.card-view .n-card > .n-card__content,
.card-view .n-card > .n-card__footer {
  padding: 0;
}
.card-view .n-card > .n-card__content img {
  width: 100%;
  background: #f0f0f0;
}
.card-view .n-card .n-button {
  float: right;
}
</style>