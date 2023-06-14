import resortApi from "@/js/api/resort/ResortApi";

const state = { 
  list: [],
  queryText: "",
  province_name: "",
  district_name: "",
 };

const actions = {
  async search(context, payload) {
    let query = {
      title: payload.queryText,
      province_name: payload.province_name,
      district_name: payload.district_name,
    }
    var res = await resortApi.search(query);
    context.commit('list', res.data);
    context.commit('saveSearch', query);
  }
};

const mutations = {
  list(state, data) {
    state.list = data;
  },
  saveSearch(state, data) {
    state.queryText = data.title;
    state.province_name = data.province_name;
    state.district_name = data.district_name;
  },
};

export const moduleSearch = {
  namespaced: true,
  state,
  actions,
  mutations
};
