import { createStore } from "vuex";
import tableStore from "./table/index.js";
import cardStore from "./table/index.js";
import axios from "axios";
import urls from "./config.js";
const store = createStore({
  state: {
    tableData: [],
    cardData: [],
    card: {},
    searchOptions: [],
    searchQuery: "",
  },
  mutations: {
    tableData(state, payload) {
      state.tableData = payload;
    },
    cardData(state, payload) {
      state.cardData = payload;
    },
    card(state, payload) {
      state.card = payload;
    },
    searchOptions(state, payload) {
      state.searchOptions = payload.map((card) => {
        return {
          key: card.id,
          label: `${card.firstName} ${card.lastName} (${
            card.username ? card.username : ""
          })`,
        };
      });
    },
    searchQuery(state, payload) {
      state.searchQuery = payload;
    },
  },
  getters: {
    tableData(state) {
      return state.tableData;
    },
    cardData(state) {
      return state.cardData;
    },
    searchOptions(state) {
      return state.cardData.map((card) => {
        return {
          key: card.id,
          label: card.firstName,
        };
      });
    },
    searchQuery(state) {
      return state.searchQuery;
    },
  },
  actions: {
    searchQuery(context, query) {
      context.commit("searchQuery", query);
    },
    getTableData(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(urls.tableUrl)
          .then((res) => {
            context.commit("tableData", res.data.entries);
            resolve(res.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getCardData(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(urls.cardUrl)
          .then((res) => {
            context.commit("cardData", res.data.users);
            context.commit("searchOptions", res.data.users);
            resolve(res);
          })
          .catch((error) => reject(error));
      });
    },
    getCard(context, id) {
      const card = context.state.cardData.filter(
        (user) => user.id === Number(id)
      );
      context.commit("card", card[0]);
    },
    deleteCard(context, id) {
      const cardData = context.state.cardData.filter((user) => user.id !== id);
      context.commit("cardData", cardData);
    },
  },
  modules: {
    tableStore: tableStore,
    cardStore: cardStore,
  },
});

export default store;
