<template>
  <div id="app">
    <router-view />
    <Loading :style="{ display: getLoading }" />
  </div>
</template>

<script>
import Loading from "./components/loading/Loading.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Loading,
  },
  computed: {
    ...mapGetters({ getLoading: "getLoading" }),
  },
  created() {
    if (localStorage.getItem("theme") === null) {
      document.querySelector("body").classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else if (localStorage.getItem("theme") === "light") {
      document.querySelector("body").classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else if (localStorage.getItem("theme") === "dark") {
      document.querySelector("body").classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
