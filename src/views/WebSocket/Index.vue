<template>
  <div class="container-fluid">
    <div class="row justify-content-center mb-4">
      <div class="col-12 mt-2">
        <div class="my-card">
          <Web-Socket-Client></Web-Socket-Client>
        </div>
      </div>
    </div>
    <hr />
    <div class="row justify-content-around mb-2">
      <div class="col-12">
        <div class="row justify-content-around mb-2">
          <div class="col-6">
            <div class="texts-dark">
              {{ $t("websocket.index.client_logs") }}:
            </div>
          </div>
          <div class="col-6 d-flex justify-content-end">
            <el-button
              class="m-0 mt-1"
              size="mini"
              type="success"
              @click="clearWebSocketClientLogs()"
              >{{ $t("websocket.index.clear_logs") }}</el-button
            >
          </div>
        </div>
        <div class="row justify-content-around">
          <div class="col-12">
            <el-input
              :readonly="true"
              type="textarea"
              :rows="15"
              size="mini"
              v-model="print_websocket_client_messages"
            >
            </el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WebSocketClient from "./WebSocketClient.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    WebSocketClient,
  },
  computed: {
    ...mapGetters({
      print_websocket_client_messages: "getWebSocketClientMessageLog",
    }),
  },
  methods: {
    clearWebSocketClientLogs() {
      this.$store.commit("clearWebSocketClientMessageLogs");
    },
  },
};
</script>

<style>
</style>