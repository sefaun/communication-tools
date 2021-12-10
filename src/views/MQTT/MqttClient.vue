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
    <div class="row justify-content-around align-items-end">
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
    <div class="row justify-content-start mt-1">
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
    <div class="row justify-content-start mt-1 mb-1">
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
      publish_topic: "",
      publish_message: "",
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
    publish_topic: function (val) {
      this.$store.commit("setMQTTPublishTopic", val);
    },
    publish_message: function (val) {
      this.$store.commit("setMQTTPublishMessage", val);
    },
  },
  computed: {
    ...mapGetters({
      mqtt_client_host: "getMQTTClientHost",
      mqtt_client_port: "getMQTTClientPort",
      mqtt_client_subscribe_topic: "getMQTTClientSubscribeTopic",
      mqtt_client_publish_topic: "getMQTTClientPublishTopic",
      mqtt_client_publish_message: "getMQTTClientPublishMessage",
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
      this.publish_topic = this.mqtt_client_publish_topic;
      this.publish_message = this.mqtt_client_publish_message;
    },
  },
};
</script>

<style>
</style>