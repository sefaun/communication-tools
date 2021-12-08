<template>
  <div :class="`sidebar ${$store.state.isSidebarOpen ? 'open' : ''}`">
    <div
      :class="`sidebar-header ${
        $store.state.isSidebarOpen ? 'mobileSidebarHeader' : ''
      }`"
    >
      <div class="logo-container">
        <img class="logo" src="../../assets/logo/main-logo.png" alt="" />
      </div>
      <div
        @click="$store.dispatch('onSidebar')"
        v-if="$store.state.isSidebarOpen"
        class="closeBtn"
      >
        <b-icon class="closeBtnIcon" icon="x"></b-icon>
      </div>
    </div>
    <div class="sidebar-body">
      <div class="links" v-for="(menu, index) in menuContent" :key="index">
        <div
          :class="`link ${$route.fullPath === menu.path ? 'active' : ''}`"
          @click="menu.path !== $route.fullPath ? routeTo(menu.path) : null"
        >
          <span class="link-title">{{ $t(menu.name) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sidebarContents from "./sidebarContents";

export default {
  data() {
    return {
      menuContent: [],
    };
  },
  created() {
    this.menuContent = [...sidebarContents];
  },
  methods: {
    routeTo(route) {
      this.$router.push(route).catch(() => {});
      this.$store.state.isSidebarOpen = false;
    },
  },
};
</script>

<style>
</style>