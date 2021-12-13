<template>
  <div class="container-fluid">
    <div class="row justify-content-center text-center">
      <div class="col-12">
        <h4 class="texts-dark">WebSocket Client</h4>
      </div>
    </div>
    <div class="row justify-content-start">
      <div class="col-12 d-flex">
        <el-form
          label-position="top"
          :inline="true"
          class="demo-form-inline"
          style="width: 100px"
        >
          <el-form-item :label="$t('websocket.client.protocol')">
            <el-select
              size="mini"
              :placeholder="$t('websocket.client.protocol')"
              v-model="protocol"
              :disabled="websocket_client_server_status"
            >
              <el-option label="ws://" value="ws"></el-option>
              <el-option label="wss://" value="wss"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form label-position="top" :inline="true" class="demo-form-inline">
          <el-form-item :label="$t('websocket.client.host')">
            <el-input
              class="mb-2"
              size="mini"
              v-model="host"
              :disabled="websocket_client_server_status"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form label-position="top" :inline="true" class="demo-form-inline">
          <el-form-item label="Port">
            <el-input
              maxlength="5"
              class="mb-2"
              style="width: 100px"
              size="mini"
              v-model="port"
              :disabled="websocket_client_server_status"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="row justify-content-start mt-1">
      <div class="col-12">
        <el-button
          class="mr-1 mt-1"
          size="mini"
          type="special"
          @click="createWebSocketClientConnection()"
          :disabled="websocket_client_server_status"
          :loading="websocket_client_connection_status"
          >{{ $t("websocket.client.connect_to_server") }}</el-button
        >
        <el-button
          class="m-0 mt-1"
          size="mini"
          type="danger"
          @click="closeWebSocketClientConnection()"
          :disabled="!websocket_client_server_status"
          >{{ $t("websocket.client.close_connection") }}</el-button
        >
      </div>
    </div>
    <hr />
    <div class="row justify-content-center text-center">
      <div class="col-12">
        <h5 class="texts-dark">
          {{ $t("websocket.client.send_message_to_server") }}
        </h5>
      </div>
    </div>
    <div class="row justify-content-start align-items-center">
      <div class="col-12">
        <el-form label-position="top" :inline="true" class="demo-form-inline">
          <el-form-item :label="$t('websocket.client.message')">
            <el-input
              class="mb-2"
              size="mini"
              v-model="client_message"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          class="m-0 mt-1"
          size="mini"
          type="special"
          @click="sendWebSocketClientMessageToServer()"
          :disabled="!websocket_client_server_status"
        >
          {{ $t("websocket.client.send_message_to_server") }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      protocol: "ws",
      host: "",
      port: "",
      client_message: "",
    };
  },
  watch: {
    protocol: function (val) {
      this.$store.commit("setWebSocketClientProtocol", val);
    },
    host: function (val) {
      this.$store.commit("setWebSocketClientHost", val);
    },
    port: function (val) {
      if (Number(val) > 65535) {
        this.port = "65535";
      }
      if (val[0] === "0") {
        this.port = "1";
      }
      if (isNaN(val)) {
        this.port = val.slice(0, val.length - 1);
      }
      this.$store.commit("setWebSocketClientPort", this.port);
    },
    websocket_client_message: function (val) {
      this.$store.commit("setWebSocketClientMessage", val);
    },
  },
  computed: {
    ...mapGetters({
      websocket_client_protocol: "getWebSocketClientProtocol",
      websocket_client_host: "getWebSocketClientHost",
      websocket_client_port: "getWebSocketClientPort",
      websocket_client_message: "getWebSocketClientMessage",
      websocket_client_server_status: "getWebSocketClientServerStatus",
      websocket_client_connection_status: "getWebSocketClientConnectionStatus",
    }),
  },
  created() {
    this.synchronizeLogsFromVuex();
  },
  methods: {
    createWebSocketClientConnection() {
      if (this.protocol && this.host && this.port) {
        this.$store.dispatch("createWebSocketClientConnection");
      } else {
        this.$store.dispatch("pushNotification", {
          message: "notifications.websocket_client.type_protocol_host_port",
          type: "warning",
        });
      }
    },
    sendWebSocketClientMessageToServer() {
      if (this.client_message) {
        this.$store.dispatch("sendWebSocketClientMessageToServer");
      } else {
        this.$store.dispatch("pushNotification", {
          message: "notifications.websocket_client.type_a_message",
          type: "warning",
        });
      }
    },
    closeWebSocketClientConnection() {
      this.$store.dispatch("closeWebSocketClientConnection");
    },
    synchronizeLogsFromVuex() {
      this.protocol = this.websocket_client_protocol;
      this.host = this.websocket_client_host;
      this.port = this.websocket_client_port;
      this.client_message = this.websocket_client_message;
    },
  },
};
</script>

<style>
</style>