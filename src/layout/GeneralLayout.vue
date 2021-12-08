<template>
  <div class="general-layout">
    <Side-Bar />
    <div
      :class="`content ${
        $store.state.isSidebarOpen ? `sidebar-opened ${$store.state.theme}` : ''
      }`"
    >
      <Navbar />
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar/Navbar.vue";
import SideBar from "./SideBar/SideBar.vue";

export default {
  components: {
    Navbar,
    SideBar,
  },
};
</script>

<style>
</style>