import mqtt from "mqtt"
import moment from "moment"

export default {
  state: {
    mqtt_client: "",
    mqtt_client_host: "",
    mqtt_client_port: "",
    mqtt_client_subscribe_topic: "",
    mqtt_client_publish_topic: "",
    mqtt_client_publish_message: "",
    print_mqtt_client_log: "",
    mqtt_client_connection_status: false,
    mqtt_client_server_status: false,
  },
  mutations: {
    setMQTTClient(state) {
      state.mqtt_client = mqtt.connect(`tcp://${state.mqtt_client_host}:${state.mqtt_client_port}`)
    },
    setMQTTClientHost(state, data) {
      state.mqtt_client_host = data
    },
    setMQTTClientPort(state, data) {
      state.mqtt_client_port = data
    },
    setMQTTClientConnectionStatus(state, data) {
      state.mqtt_client_connection_status = data
    },
    setMQTTClientServerStatus(state, data) {
      state.mqtt_client_server_status = data
    },
    setMQTTSubscribeTopic(state, data) {
      state.mqtt_client_subscribe_topic = data
    },
    setMQTTPublishTopic(state, data) {
      state.mqtt_client_publish_topic = data
    },
    setMQTTPublishMessage(state, data) {
      state.mqtt_client_publish_message = data
    },
    setMQTTClientPrintMessage(state, data) {
      state.print_mqtt_client_log = data
    },
    clearMqttClient(state) {
      state.mqtt_client = ""
    }
  },
  actions: {
    createMQTTClientConnection({ commit, state, dispatch }) {
      try {
        commit("setMQTTClientConnectionStatus", true)
        commit("setMQTTClient")

        state.mqtt_client.on("message", (topic, payload, packet) => {
          console.log(packet);
        });

        state.mqtt_client.on("connect", (packet) => {
          console.log("bağlandı")
          commit("setMQTTClientConnectionStatus", false)
          commit("setMQTTClientServerStatus", true)
        });

        state.mqtt_client.on("error", (error) => {
          commit("setMQTTClientConnectionStatus", false)
          commit("setMQTTClientServerStatus", false)
          dispatch("closeMQTTClientConnection")
          console.log(error, "hata var");
        });

      } catch (error) {
        console.log("mqtt client error -> ", error)
        dispatch("closeMQTTClientConnection")
      }
    },
    publishMQTTClientMessage({ commit, state }) {
      state.mqtt_client.publish(state.mqtt_client_publish_topic, state.mqtt_client_publish_message);
      commit("print data buraya")
    },
    subscribeToTopic({ state }) {
      state.mqtt_client.subscribe(state.mqtt_client_subscribe_topic)
    },
    closeMQTTClientConnection({ commit, state }) {
      state.mqtt_client.end();
      commit("clearMqttClient")
      commit("setMQTTClientConnectionStatus", false)
      commit("setMQTTClientServerStatus", false)
    },
  },
  getters: {
    getMQTTClientHost(state) {
      return state.mqtt_client_host
    },
    getMQTTClientPort(state) {
      return state.mqtt_client_port
    },
    getMQTTClientConnectionStatus(state) {
      return state.mqtt_client_connection_status
    },
    getMQTTClientServerStatus(state) {
      return state.mqtt_client_server_status
    },
    getMQTTClientSubscribeTopic(state) {
      return state.mqtt_client_subscribe_topic
    },
    getMQTTClientPublishTopic(state) {
      return state.mqtt_client_publish_topic
    },
    getMQTTClientPublishMessage(state) {
      return state.mqtt_client_publish_message
    },
    getMQTTClientPrintLogs(state) {
      return state.print_mqtt_client_log
    }
  }
}