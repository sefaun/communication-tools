<template>
  <div class="container-fluid">
    <div class="row justify-content-center mb-4">
      <div class="col-12 mt-2">
        <div class="my-card">
          <Web-Socket-Client></Web-Socket-Client>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WebSocketClient from "./WebSocketClient.vue";

export default {
  components: {
    WebSocketClient,
  },
};
</script>

<style>
</style>