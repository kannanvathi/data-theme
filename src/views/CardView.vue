<template>
  <n-layout embedded content-style="padding: 24px;" class="card-view">
  
    <n-row :gutter="[12, 8]" v-if="!data.users.length">
      <n-col :span="6"> </n-col>
      <n-col :span="12">
        <n-card>
          <n-space>
            <div class="d-flex align-item-center justify-content-center w-100 p-3">
              <n-spin size="large" />
              <h4 class="ml-2">Loading data ...</h4>
            </div>
          </n-space>
        </n-card>
      </n-col>
    </n-row>
    <n-grid cols="1 400:1 600:2 768:2 1266:4" v-else>
      <n-grid-item v-for="user in data.users" :key="user.id" class="p-2">
          <n-card
            :segmented="{
              content: true,
              footer: 'soft',
            }"
          >
            <template #header>
              <div class="d-flex align-items-center justify-content-start w-100">
                <div class="img-round mr-3">
                  <img :src="user.image" width="50" />
                </div>
                <div class="d-block">
                  <h3 class="">{{ user.username }}</h3>
                  <p>{{ user.email }}</p>
                </div>
              </div>
            </template>
            <div class="card-image">
              <img :src="user.image"  />
            </div>
            <div class="d-block p-3">
              <h3 class="">{{ user.firstName }} {{ user.lastName }}</h3>
              <p class="pb-2">{{ user.email }}</p>
              <p>Phone: {{ user.phone }}</p>
            </div>
            <template #action>
              <n-button text @click="viewCard(user.id)" class="mr-3">
                View
              </n-button>
              <n-button text  @click="deleteCard(user.id)" class="delete">
                Delete
              </n-button>
            </template>
          </n-card>
      </n-grid-item>
    </n-grid>
  </n-layout>
</template>
<script>
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, watch } from "@vue/runtime-core";
export default {
  setup() {
    const data = reactive({ users: [] });
    const store = useStore();
    const router = useRouter();
    const searchQuery = computed(() => {
      console.log(store.getters.searchQuery);
      return store.state.searchQuery;
    });
    watch(searchQuery, (current, old) => {
      data.users = store.state.cardData.filter((card) => {
        return (
          card.firstName.includes(current) ||
          card.lastName.includes(current) ||
          (card.username ? card.username.includes(current) : false)
        );
      });
    });
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


.card-image {
      width: 100%;
    height: 150px;
    overflow: hidden;
    margin: auto;
    text-align: center;
    background: #eee;
}
.card-image img {
      height: auto;
    width: auto;
    max-height: 150px;
    margin: auto;
    text-align: center;
}
.title {
  font-size: 24px !important;
}
.card-view .n-button.delete .n-button__content{
  color: red;
}
.n-card > .n-card-header{
  padding: 15px;
}
.img-round{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #aaa;
  overflow: hidden;
  min-width: 50px;
  
}
.card-view .n-button .n-button__content{
  color: #18a058;
  font-size: 16px;
}
.card-view .n-card > .n-card__action{
  padding-left: 15px;
  padding: 15px;
}


</style>