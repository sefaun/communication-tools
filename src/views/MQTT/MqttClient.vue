<template>
  <div class="container-fluid">
    <div class="row justify-content-center text-center">
      <div class="col-12">
        <h4 class="texts-dark">MQTT Client</h4>
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
              :disabled="mqtt_client_server_status"
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
              :disabled="mqtt_client_server_status"
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
          @click="createMQTTClientConnection()"
          :disabled="mqtt_client_server_status"
          :loading="mqtt_client_connection_status"
          >{{ $t("mqtt.client.connect_to_broker") }}</el-button
        >
        <el-button
          class="m-0 mt-1"
          size="mini"
          type="danger"
          @click="closeMQTTClientConnection()"
          :disabled="!mqtt_client_server_status"
          >{{ $t("mqtt.client.close_connection") }}</el-button
        >
      </div>
    </div>
    <hr />
    <div class="row justify-content-center text-center">
      <div class="col-12">
        <h5 class="texts-dark">Subscribe</h5>
      </div>
    </div>
    <div class="row justify-content-around">
      <div class="col-md-6">
        <el-form label-position="top" :inline="true" class="demo-form-inline">
          <el-form-item label="Topic">
            <el-input
              class="mb-2"
              size="mini"
              v-model="subscribe_topic"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="col-md-6">
        <el-form label-position="top" :inline="true" class="demo-form-inline">
          <el-form-item label="Qos">
            <el-select size="mini" v-model="subscribe_qos" placeholder="Qos">
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="row justify-content-start mt-2">
      <div class="col-12">
        <el-button
          class="mb-2"
          size="mini"
          type="special"
          @click="subscribeToTopic()"
          :disabled="!mqtt_client_server_status"
        >
          {{ $t("mqtt.client.subscribe") }}
        </el-button>
      </div>
    </div>
    <hr />
    <div class="row justify-content-center text-center">
      <div class="col-12">
        <h5 class="texts-dark">Publish</h5>
      </div>
    </div>
    <div class="row justify-content-start align-items-center mt-1">
      <div class="col-12 d-flex">
        <el-form label-position="top" :inline="true" class="demo-form-inline">
          <el-form-item label="Topic">
            <el-input
              class="mb-2 mr-1"
              size="mini"
              v-model="publish_topic"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form label-position="top" :inline="true" class="demo-form-inline">
          <el-form-item :label="$t('mqtt.client.message')">
            <el-input
              class="mb-2"
              size="mini"
              v-model="publish_message"
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
    <div class="row justify-content-start mt-4 mb-1">
      <div class="col-12">
        <el-button
          class="m-0 mt-1"
          size="mini"
          type="special"
          @click="publishMessage()"
          :disabled="!mqtt_client_server_status"
        >
          {{ $t("mqtt.client.publish") }}
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
      subscribe_topic: "",
      subscribe_qos: 0,
      publish_topic: "",
      publish_message: "",
      qos: 0,
      retain: false,
    };
  },
  watch: {
    host: function (val) {
      this.$store.commit("setMQTTClientHost", val);
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
      this.$store.commit("setMQTTClientPort", this.port);
    },
    subscribe_topic: function (val) {
      this.$store.commit("setMQTTSubscribeTopic", val);
    },
    subscribe_qos: function (val) {
      this.$store.commit("setMQTTSubscribeQOS", val);
    },
    publish_topic: function (val) {
      this.$store.commit("setMQTTPublishTopic", val);
    },
    publish_message: function (val) {
      this.$store.commit("setMQTTPublishMessage", val);
    },
    qos: function (val) {
      this.$store.commit("setMQTTClientPublishMessageQOS", val);
    },
    retain: function (val) {
      this.$store.commit("setMQTTClientPublishMessageRetain", val);
    },
  },
  computed: {
    ...mapGetters({
      mqtt_client_host: "getMQTTClientHost",
      mqtt_client_port: "getMQTTClientPort",
      mqtt_client_subscribe_topic: "getMQTTClientSubscribeTopic",
      mqtt_client_subscribe_qos: "getMQTTSubscribeQOS",
      mqtt_client_publish_topic: "getMQTTClientPublishTopic",
      mqtt_client_publish_message: "getMQTTClientPublishMessage",
      mqtt_client_publish_message_qos: "getMQTTClientPublishMessageQOS",
      mqtt_client_publish_message_retain: "getMQTTClientPublishMessageRetain",
      mqtt_client_connection_status: "getMQTTClientConnectionStatus",
      mqtt_client_server_status: "getMQTTClientServerStatus",
    }),
  },
  created() {
    this.synchronizeLogsFromVuex();
  },
  methods: {
    createMQTTClientConnection() {
      if (this.host && this.port) {
        this.$store.dispatch("createMQTTClientConnection");
      } else {
        this.$store.dispatch("pushNotification", {
          message: "notifications.mqtt_client.type_host_and_port",
          type: "warning",
        });
      }
    },
    publishMessage() {
      if (this.publish_topic && this.publish_message) {
        this.$store.dispatch("publishMQTTClientMessage");
      } else {
        this.$store.dispatch("pushNotification", {
          message: "notifications.mqtt_client.type_publish_topic_and_message",
          type: "warning",
        });
      }
    },
    subscribeToTopic() {
      if (this.subscribe_topic) {
        this.$store.dispatch("subscribeToTopic");
      } else {
        this.$store.dispatch("pushNotification", {
          message: "notifications.mqtt_client.type_subscribe_topic",
          type: "warning",
        });
      }
    },
    closeMQTTClientConnection() {
      this.$store.dispatch("closeMQTTClientConnection");
    },
    synchronizeLogsFromVuex() {
      this.host = this.mqtt_client_host;
      this.port = this.mqtt_client_port;
      this.subscribe_topic = this.mqtt_client_subscribe_topic;
      this.subscribe_qos = this.mqtt_client_subscribe_qos;
      this.publish_topic = this.mqtt_client_publish_topic;
      this.publish_message = this.mqtt_client_publish_message;
      this.qos = this.mqtt_client_publish_message_qos;
      this.retain = this.mqtt_client_publish_message_retain;
    },
  },
};
</script>

<style>
</style>