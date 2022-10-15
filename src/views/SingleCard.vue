<template>
  <n-layout embedded content-style="padding: 24px;" class="single-card">
    <n-row :gutter="[12, 8]">
    <n-col :span="4">
    </n-col>
    <n-col :span="16">
    <n-card v-if="!bank.cardNumber">
        <n-space>
        <n-spin size="large" />
        <h4>Loading data ...</h4>
        </n-space>
    </n-card>

    <n-card
    v-else
        :title="card.value.username"
        :segmented="{
        content: true,
        footer: 'soft',
        }"
    >
        <template #header-extra>
        <n-button quaternary type="info" @click="back()"> Back </n-button>
        </template>
        <div class="d-flex align-items-start justify-content-start w-100">
            <div class="image-box">
                <img :src="card.value.image" style="max-width: 300px" />    
            </div>
            <div class="d-block p-3 pt-0">
                <h3 class="">
                    {{ card.value.firstName }} {{ card.value.lastName }}
                </h3>
                <p class="pb-2">{{ card.value.email }}</p>
                <p class="pb-2 pt-2"><span class="font-bold w-150">Phone:</span> {{ card.value.phone }}</p>
                <p class="pb-2 pt-2"><span class="font-bold w-150">Gender:</span> <strong>{{card.value.gender}}</strong></p>
                <p class="pb-2 pt-2"><span class="font-bold w-150">Birth:</span> <strong>{{card.value.birthDate}}</strong></p>
                <p class="pb-2 pt-2"><span class="font-bold w-150">Blood Group:</span> <strong>{{card.value.bloodGroup}}</strong></p>
                <p class="pb-2 pt-2"><span class="font-bold w-150">University:</span> <strong>{{card.value.university}}</strong></p>
                <p class="pb-2 pt-2"><span class="font-bold w-150">Bank Number:</span>  {{bank.cardNumber}} </p>
            </div>
        </div>
    </n-card>
    </n-col>
    </n-row>
  </n-layout>
</template>
<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reactive, ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
import { defineComponent, h } from "vue";
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const card = reactive({ value: {} });
    const bank = ref({});
    function loadCard() {
        if(store.state.cardData.length === 0){
            console.log(router)
            store.dispatch("getCardData").then(res => {
                store.dispatch("getCard", router.currentRoute.value.params.id).then((res) => {
                   card.value = store.state.card;
                   bank.value = card.value.bank;
                });
            })
        }
        else {
            console.log(router)
            store.dispatch("getCard", router.currentRoute.value.params.id).then((res) => {
                card.value = store.state.card;
                bank.value = card.value.bank;
            });
        }
    }
    loadCard();
    function back() {
        router.push({name: 'card'});
    }
    return {
      card,
      back,
      bank
    };
  },
}) ;
</script>
<style>
.image-box{
    width: 300px;
    height: 300px;
    border-radius: 5px;
    border: 1px solid #dddddd;
    margin-right: 15px;
}
</style>