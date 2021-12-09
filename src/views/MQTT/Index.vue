<template>
  <div class="container-fluid">
    <div class="row justify-content-center mb-4">
      <div class="col-md-6 mt-2">
        <div class="my-card">
          <MQTT-Broker></MQTT-Broker>
        </div>
      </div>
      <div class="col-md-6 mt-2">
        <div class="my-card">
          <MQTT-Client></MQTT-Client>
        </div>
      </div>
    </div>
    <hr />
    <div class="row justify-content-around mb-2">
      <div class="col-6">
        <div class="row justify-content-around mb-2">
          <div class="col-6">
            <div class="texts-dark">{{ $t("mqtt.index.broker_logs") }}:</div>
          </div>
          <div class="col-6 d-flex justify-content-end">
            <el-button
              class="m-0 mt-1"
              size="mini"
              type="success"
              @click="clearMQTTBrokerLogs()"
              >{{ $t("mqtt.index.clear_logs") }}</el-button
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
              v-model="print_mqtt_broker_log"
            >
            </el-input>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row justify-content-around mb-2">
          <div class="col-6">
            <div class="texts-dark">{{ $t("mqtt.index.client_logs") }}:</div>
          </div>
          <div class="col-6 d-flex justify-content-end">
            <el-button
              class="m-0 mt-1"
              size="mini"
              type="success"
              @click="clearMQTTClientLogs()"
              >{{ $t("mqtt.index.clear_logs") }}</el-button
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
              v-model="print_mqtt_client_log"
            >
            </el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MQTTBroker from "./MqttBroker";
import MQTTClient from "./MqttClient";
import { mapGetters } from "vuex";

export default {
  components: {
    MQTTBroker,
    MQTTClient,
  },
  computed: {
    ...mapGetters({
      print_mqtt_broker_log: "getMQTTBrokerPrintLogs",
      print_mqtt_client_log: "getMQTTClientPrintLogs",
    }),
  },
  methods: {
    clearMQTTBrokerLogs() {
      this.$store.commit("clearMQTTBrokerPrintMessageLogs");
    },
    clearMQTTClientLogs() {},
  },
};
</script>

<style scoped>
</style>