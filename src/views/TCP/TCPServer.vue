<template>
  <div class="container-fluid">
    <div class="row justify-content-center text-center">
      <div class="col-12">
        <h4 class="texts-dark">TCP SERVER</h4>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12">
        <el-form label-position="top" :inline="true" class="demo-form-inline">
          <el-form-item label="Port">
            <el-input
              maxlength="5"
              style="width: 100px"
              class="mb-2"
              size="mini"
              v-model="port"
              :disabled="tcp_server_status"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="row justify-content-start mt-1">
          <div class="col-12">
            <el-button
              class="mr-1 mt-1"
              size="mini"
              type="special"
              @click="createTCPServer()"
              :disabled="tcp_server_status"
            >
              {{ $t("tcp.server.create_server") }}
            </el-button>
            <el-button
              class="m-0 mt-1"
              size="mini"
              type="danger"
              @click="closeTCPServer()"
              :disabled="!tcp_server_status"
              >{{ $t("tcp.server.close_server") }}</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="row justify-content-center text-center">
      <div class="col-12">
        <h5 class="texts-dark">{{ $t("tcp.server.clients") }}</h5>
      </div>
    </div>
    <div class="row justify-content-center mt-3 mb-2">
      <div class="col-12">
        <el-select
          v-model="selected_client"
          class="mr-1 mt-1"
          multiple
          filterable
          allow-create
          default-first-option
          size="mini"
          :placeholder="$t('tcp.server.choose_client')"
        >
          <el-option
            v-for="(client, index) in tcp_server_clients"
            :key="index"
            :label="client.id"
            :value="client.id"
          >
          </el-option>
        </el-select>
        <el-button
          class="m-0 mt-1"
          size="mini"
          type="danger"
          @click="closeSelectedTCPClients()"
          :disabled="tcp_client_close_status"
          >{{ $t("tcp.server.close_clients") }}</el-button
        >
      </div>
    </div>
    <div class="row justify-content-start align-items-center mt-1">
      <div class="col-12">
        <el-form label-position="top" :inline="true" class="demo-form-inline">
          <el-form-item :label="$t('tcp.server.send_message')">
            <el-input
              class="mb-2"
              size="mini"
              v-model="server_message"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          class="m-0 mt-1"
          size="mini"
          type="special"
          @click="sendMessageToClient()"
          :disabled="!tcp_server_status"
          >{{ $t("tcp.server.send_message") }}</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      port: "",
      selected_client: [],
      server_message: "",
    };
  },
  watch: {
    selected_client: function (val) {
      if (val.length > 0) {
        this.$store.commit("setTCPClientCloseStatus", false);
      } else {
        this.$store.commit("setTCPClientCloseStatus", true);
      }
      this.$store.commit("setSelectedTCPClients", val);
    },
    port: function (val) {
      if (Number(val) > 65535) {
        this.port = "65535";
      }
      if (this.port[0] === "0") {
        this.port = "1";
      }
      if (isNaN(val)) {
        this.port = val.slice(0, val.length - 1);
      }
      if (this.port !== this.mqtt_broker_port) {
        this.$store.commit("setTCPPort", this.port);
      } else if (this.port === "") {
        this.port = "";
      } else {
        this.port = Number(val) + 1;
        this.$store.dispatch("pushNotification", {
          message: "notifications.general.port_already_in_use",
          type: "warning",
        });
      }
    },
    server_message: function (val) {
      this.$store.commit("setTCPServerMessage", val);
    },
  },
  computed: {
    ...mapGetters({
      tcp_server: "getTCPServer",
      tcp_port: "getTCPPort",
      tcp_server_clients: "getTCPServerClients",
      tcp_selected_clients: "getSelectedTCPClients",
      tcp_server_status: "getTCPServerStatus",
      tcp_client_close_status: "getTCPClientCloseStatus",
      tcp_server_message: "getTCPServerMessage",
      mqtt_broker_port: "getMQTTBrokerPort",
    }),
  },
  created() {
    this.synchronizeLogsFromVuex();
  },
  methods: {
    createTCPServer() {
      if (this.port.toString().length >= 1) {
        this.$store.dispatch("createTCPServer");
      } else {
        this.$store.dispatch("pushNotification", {
          message: "notifications.tcp_server.type_a_port",
          type: "warning",
        });
      }
    },
    closeTCPServer() {
      if (this.tcp_server) {
        this.$store.dispatch("closeTCPServer");
        this.selected_client = [];
        this.$store.dispatch("pushNotification", {
          message: "notifications.tcp_server.closed_tcp_server",
          type: "warning",
        });
      }
    },
    closeSelectedTCPClients() {
      this.$store.dispatch("closeSelectedTCPClients");
      this.selected_client = [];
    },
    sendMessageToClient() {
      if (this.selected_client.length) {
        if (this.server_message) {
          let log_control = false;
          for (let i = 0; i < this.tcp_server_clients.length; i++) {
            this.selected_client.forEach((id) => {
              if (this.tcp_server_clients[i].id === id) {
                log_control = true;
                this.tcp_server_clients[i].socket.write(
                  `${this.server_message}\r\n`
                );
              }
            });
          }
          if (log_control) {
            this.$store.commit("printTCPServerLog", this.server_message);
          }
        } else {
          this.$store.dispatch("pushNotification", {
            message: "notifications.tcp_server.type_a_message",
            type: "warning",
          });
        }
      } else {
        this.$store.dispatch("pushNotification", {
          message: "notifications.tcp_server.client_not_selected",
          type: "warning",
        });
      }
    },
    synchronizeLogsFromVuex() {
      this.port = this.tcp_port;
      this.selected_client = [...this.tcp_selected_clients];
      this.server_message = this.tcp_server_message;
    },
  },
};
</script>

<style>
</style>