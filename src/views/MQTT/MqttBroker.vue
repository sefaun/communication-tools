<template>
  <div class="container-fluid">
    <div class="row justify-content-center text-center">
      <div class="col-12">
        <h4 class="texts-dark">MQTT BROKER</h4>
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
              :disabled="mqtt_broker_status"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="row justify-content-start mt-1">
          <div class="col-12">
            <el-button
              class="mr-1 mt-1"
              size="mini"
              type="special"
              @click="createMQTTBroker()"
              :disabled="mqtt_broker_status"
            >
              {{ $t("mqtt.broker.create_broker") }}
            </el-button>
            <el-button
              class="m-0 mt-1"
              size="mini"
              type="danger"
              @click="closeMQTTBroker()"
              :disabled="!mqtt_broker_status"
              >{{ $t("mqtt.broker.close_broker") }}</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      port: "",
      broker_message: "",
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
      if (this.port !== this.tcp_port) {
        this.$store.commit("setMQTTBrokerPort", this.port);
      } else {
        this.port = Number(val) + 1;
        this.$store.dispatch("pushNotification", {
          message: "notifications.general.port_already_in_use",
          type: "warning",
        });
      }
    },
  },
  computed: {
    ...mapGetters({
      mqtt_broker_port: "getMQTTBrokerPort",
      mqtt_broker_status: "getMQTTBrokerStatus",
      tcp_port: "getTCPPort",
    }),
  },
  created() {
    this.synchronizeLogsFromVuex();
  },
  methods: {
    createMQTTBroker() {
      if (this.port.length > 1) {
        this.$store.dispatch("createMQTTBroker");
      } else {
        this.$store.dispatch("pushNotification", {
          message: "notifications.mqtt_broker.type_a_port",
          type: "warning",
        });
      }
    },
    closeMQTTBroker() {
      this.$store.dispatch("closeMQTTBroker");
    },
    synchronizeLogsFromVuex() {
      this.port = this.mqtt_broker_port;
    },
  },
};
</script>

<style>
</style>