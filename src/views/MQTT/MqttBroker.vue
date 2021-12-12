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
    <div class="row justify-content-start align-items-center mt-1">
      <div class="col-12 d-flex">
        <el-form label-position="top" :inline="true" class="demo-form-inline">
          <el-form-item :label="$t('mqtt.broker.topic')">
            <el-input class="mb-2" size="mini" v-model="topic"></el-input>
          </el-form-item>
        </el-form>
        <el-form label-position="top" :inline="true" class="demo-form-inline">
          <el-form-item :label="$t('mqtt.broker.broker_message')">
            <el-input
              class="mb-2"
              size="mini"
              v-model="broker_message"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="row justify-content-start align-items-center mt-1">
      <div class="col-md-6">
        <el-form label-position="top" :inline="true" class="demo-form-inline">
          <el-form-item label="Qos">
            <el-select size="mini" v-model="qos" placeholder="Qos">
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="col-md-6">
        <el-checkbox class="texts-dark" v-model="retain">Retain</el-checkbox>
      </div>
    </div>
    <div class="row justify-content-start align-items-center mt-4 mb-1">
      <div class="col-12">
        <el-button
          class="m-0 mt-2"
          size="mini"
          type="special"
          @click="sendMQTTBrokerMessageToClient()"
          :disabled="!mqtt_broker_status"
          >{{ $t("mqtt.broker.send_message") }}</el-button
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
      topic: "",
      broker_message: "",
      qos: "0",
      retain: false,
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
    topic: function (val) {
      this.$store.commit("setMQTTBrokerMessageTopic", val);
    },
    broker_message: function (val) {
      this.$store.commit("setMQTTBrokerMessage", val);
    },
    qos: function (val) {
      this.$store.commit("setMQTTBrokerPublishMessageQOS", val);
    },
    retain: function (val) {
      this.$store.commit("setMQTTBrokerPublishMessageRetain", val);
    },
  },
  computed: {
    ...mapGetters({
      mqtt_broker_port: "getMQTTBrokerPort",
      mqtt_broker_status: "getMQTTBrokerStatus",
      mqtt_broker_message_topic: "getMQTTBrokerMessageTopic",
      mqtt_broker_message: "getMQTTBrokerMessage",
      mqtt_broker_message_retain: "getMQTTBrokerRetain",
      mqtt_broker_message_qos: "getMQTTBrokerQOS",
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
      this.$store.dispatch("pushNotification", {
        message: "notifications.mqtt_broker.mqtt_broker_closed",
        type: "warning",
      });
    },
    sendMQTTBrokerMessageToClient() {
      if (this.topic && this.broker_message) {
        this.$store.dispatch("sendMQTTBrokerMessageToClient");
      } else {
        this.$store.dispatch("pushNotification", {
          message: "notifications.mqtt_broker.type_topic_and_message",
          type: "warning",
        });
      }
    },
    setQos(e) {
      this.$store.commit("setMQTTBrokerPublishMessageRetain", e);
    },
    synchronizeLogsFromVuex() {
      this.port = this.mqtt_broker_port;
      this.topic = this.mqtt_broker_message_topic;
      this.broker_message = this.mqtt_broker_message;
      this.qos = this.mqtt_broker_message_qos;
      this.retain = this.mqtt_broker_message_retain;
    },
  },
};
</script>

<style>
</style>