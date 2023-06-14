import authApi from "@/js/api/auth/AuthApi";

const state = { status: {}, user: null };

const actions = {
  async login(context, user) {
    var res = await authApi.login(user);
    if (res?.data?.user) {
      if (!res.data.user.role || res.data.user.role == 'user') {
        throw {
          response: {
            data: 'Tài khoản không hợp lệ.'
          }
        }
      }
      context.commit('loginSuccess', res.data);
    }
    return res.data;
  },
  logout({ commit }) {
    commit('logout');
  },
  register(context, user) {
    context.commit('registerRequest', user).then(res => {
      context.commit('registerSuccess', res.data);
    });
  }
};

const mutations = {
  loginSuccess(state, data) {
    state.status = { loggedIn: true };
    state.user = data.user;
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  },
  registerRequest(state) {
    state.status = { registering: true };
  },
  registerSuccess(state) {
    state.status = {};
  },
  registerFailure(state) {
    state.status = {};
  }
};

export const moduleAuth = {
  namespaced: true,
  state,
  actions,
  mutations
};
