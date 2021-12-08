<template>
  <div class="container-fluid">
    <div class="row justify-content-center text-center">
      <div class="col-12">
        <h4 class="texts-dark">TCP Client</h4>
      </div>
    </div>
    <div class="row justify-content-around">
      <div class="col-md-6">
        <el-form label-position="top" :inline="true" class="demo-form-inline">
          <el-form-item :label="$t('tcp.client.host')">
            <el-input
              class="mb-2"
              size="mini"
              v-model="host"
              :disabled="tcp_client_server_status"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="col-md-6">
        <el-form label-position="top" :inline="true" class="demo-form-inline">
          <el-form-item label="Port">
            <el-input
              maxlength="5"
              class="mb-2"
              style="width: 100px"
              size="mini"
              v-model="port"
              :disabled="tcp_client_server_status"
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
          @click="createTCPConnection()"
          :disabled="tcp_client_server_status"
          :loading="tcp_client_connection_status"
          >{{ $t("tcp.client.connect_to_server") }}</el-button
        >
        <el-button
          class="m-0 mt-1"
          size="mini"
          type="danger"
          @click="closeTCPConnection()"
          :disabled="!tcp_client_server_status"
          >{{ $t("tcp.client.close_connection") }}</el-button
        >
      </div>
    </div>
    <hr />
    <div class="row justify-content-start align-items-center mt-1">
      <div class="col-12">
        <el-form label-position="top" :inline="true" class="demo-form-inline">
          <el-form-item :label="$t('tcp.client.send_message')">
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
          @click="sendMessageToServer()"
          :disabled="!tcp_client_server_status"
        >
          {{ $t("tcp.client.send_message") }}
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
      host: "",
      port: "",
      client_message: "",
    };
  },
  watch: {
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
      this.$store.commit("setTCPClientPort", this.port);
    },
    client_message: function (val) {
      this.$store.commit("setTCPClientMessage", val);
    },
  },
  computed: {
    ...mapGetters({
      tcp_host: "getTCPClientHost",
      tcp_port: "getTCPClientPort",
      client: "getTCPClient",
      tcp_client_message: "getTCPClientMessage",
      tcp_client_server_status: "getTCPClientServerStatus",
      tcp_client_connection_status: "getTCPConnectionStatus",
    }),
  },
  created() {
    this.synchronizeLogsFromVuex();
  },
  methods: {
    createTCPConnection() {
      if (this.host.toString().length > 1 && this.port.toString().length > 1) {
        this.$store.commit("setTCPClientHost", this.host);
        this.$store.commit("setTCPClientPort", this.port);
        this.$store.dispatch("createTCPConnection");
      } else {
        this.$store.dispatch("pushNotification", {
          message: "notifications.tcp_client.type_connection_info",
          type: "warning",
        });
      }
    },
    closeTCPConnection() {
      this.$store.dispatch("closeTCPConnection");
      this.$store.dispatch("pushNotification", {
        message: "notifications.tcp_client.closed_tcp_client_connection",
        type: "warning",
      });
    },
    sendMessageToServer() {
      if (this.client_message) {
        this.$store.dispatch("sendMessageToServer", this.client_message);
      } else {
        this.$store.dispatch("pushNotification", {
          message: "notifications.tcp_client.type_a_message",
          type: "warning",
        });
      }
    },
    synchronizeLogsFromVuex() {
      this.host = this.tcp_host;
      this.port = this.tcp_port;
      this.client_message = this.tcp_client_message;
    },
  },
};
</script>

<style>
</style>