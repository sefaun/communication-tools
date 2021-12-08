<template>
  <div class="container-fluid">
    <div class="row justify-content-center mb-4">
      <div class="col-md-6 mt-2">
        <div class="my-card">
          <TCP-Server></TCP-Server>
        </div>
      </div>
      <div class="col-md-6 mt-2">
        <div class="my-card">
          <TCP-Client></TCP-Client>
        </div>
      </div>
    </div>
    <hr />
    <div class="row justify-content-around mb-2">
      <div class="col-6">
        <div class="row justify-content-around mb-2">
          <div class="col-6">
            <div class="texts-dark">{{ $t("tcp.index.server_logs") }}:</div>
          </div>
          <div class="col-6 d-flex justify-content-end">
            <el-button
              class="m-0 mt-1"
              size="mini"
              type="success"
              @click="clearTCPServerLogs()"
              >{{ $t("tcp.index.clear_logs") }}</el-button
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
              v-model="print_tcp_server_log"
            >
            </el-input>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row justify-content-around mb-2">
          <div class="col-6">
            <div class="texts-dark">{{ $t("tcp.index.client_logs") }}:</div>
          </div>
          <div class="col-6 d-flex justify-content-end">
            <el-button
              class="m-0 mt-1"
              size="mini"
              type="success"
              @click="clearTCPClientLogs()"
              >{{ $t("tcp.index.clear_logs") }}</el-button
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
              v-model="print_tcp_client_log"
            >
            </el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TCPServer from "./TCPServer.vue";
import TCPClient from "./TCPClient.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    TCPServer,
    TCPClient,
  },
  computed: {
    ...mapGetters({
      print_tcp_server_log: "getTCPServerLogs",
      print_tcp_client_log: "getTCPClientLogs",
    }),
  },
  methods: {
    clearTCPServerLogs() {
      this.$store.commit("cleatTCPServerLogs");
    },
    clearTCPClientLogs() {
      this.$store.commit("clearTCPClientLogs");
    },
  },
};
</script>

<style scoped>
</style>