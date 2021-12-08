import Vue from 'vue'
import Vuex from 'vuex'
import i18n from '../locales/i18n'
import mainVue from "../main"

import TCPServer from "./TCP/TCPServer"
import TCPClient from "./TCP/TCPClient"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    portRegex: /^[a-zA-ZığüşöçİĞÜŞÖÇ\,\<\?\{\}\[\]\>\/\"\'\½\|\ \£\!\\\@\#\$\%\^\&\*\)\(+\=\._-]+$/g,
    loading: "none",
    theme: localStorage.getItem('theme') || 'light',
    isSidebarOpen: false,
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
    },
    setSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setLoading(state, data) {
      if (data === "block" || data === "none") {
        state.loading = data
      }
    }
  },
  actions: {
    changeTheme({ commit, state }) {
      if (state.theme === 'dark') {
        commit('setTheme', 'light');
        document.querySelector('body').classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        commit('setTheme', 'dark');
        document.querySelector('body').classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    },
    onSidebar({ commit }) {
      commit('setSidebar');
    },
    changeLang({ }, language) {
      if (language === "tr") {
        localStorage.setItem("lang", "tr");
        i18n.locale = "tr";
      } else if (language === "en") {
        localStorage.setItem("lang", "en");
        i18n.locale = "en";
      } else {
        localStorage.setItem("lang", "en");
        i18n.locale = "en";
      }
    },
    pushNotification({ }, { message, type }) {
      mainVue.$message({
        showClose: true,
        message: mainVue.$t(`${message}`),
        type: type,
      });
    }
  },
  getters: {
    getTheme(state) {
      return state.theme
    },
    getLoading(state) {
      return state.loading
    },
    getPortRegex(state) {
      return state.portRegex
    }
  },
  modules: {
    TCPServer: TCPServer,
    TCPClient: TCPClient
  }
})


export default store;