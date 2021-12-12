import mqtt from "mqtt"
import moment from "moment"

export default {
  state: {
    mqtt_client: "",
    mqtt_client_host: "",
    mqtt_client_port: "",
    mqtt_client_subscribe_topic: "",
    mqtt_client_subscribe_qos: 0,
    mqtt_client_publish_topic: "",
    mqtt_client_publish_message: "",
    mqtt_client_publish_message_qos: 0,
    mqtt_client_publish_message_retain: false,
    print_mqtt_client_log: "",
    print_mqtt_broker_messages_to_client: "",
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
    setMQTTSubscribeQOS(state, data) {
      state.mqtt_client_subscribe_qos = Number(data)
    },
    setMQTTPublishTopic(state, data) {
      state.mqtt_client_publish_topic = data
    },
    setMQTTPublishMessage(state, data) {
      state.mqtt_client_publish_message = data
    },
    setMQTTClientPrintMessage(state, data) {
      state.print_mqtt_client_log += `${moment().format("HH:mm:ss")} -> Me(Client):(${state.mqtt_client_publish_topic}) ${state.mqtt_client_publish_message}\r`
    },
    printMQTTBrokerMessages(state, data) {
      state.print_mqtt_client_log += `${moment().format("HH:mm:ss")} -> Broker:(${data.topic}) ${data.payload.toString()}\r`
    },
    setMQTTClientPublishMessageQOS(state, data) {
      state.mqtt_client_publish_message_qos = Number(data)
    },
    setMQTTClientPublishMessageRetain(state, data) {
      state.mqtt_client_publish_message_retain = data
    },
    clearMQTTClientPrintMessageLogs(state) {
      state.print_mqtt_client_log = ""
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
          commit("printMQTTBrokerMessages", packet)
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
      state.mqtt_client.publish(state.mqtt_client_publish_topic, state.mqtt_client_publish_message,
        { qos: state.mqtt_client_publish_message_qos, retain: state.mqtt_client_publish_message_retain });
      commit("setMQTTClientPrintMessage")
    },
    subscribeToTopic({ state }) {
      state.mqtt_client.subscribe(state.mqtt_client_subscribe_topic, { qos: state.mqtt_client_subscribe_qos })
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
    getMQTTSubscribeQOS(state) {
      return state.mqtt_client_subscribe_qos
    },
    getMQTTClientPublishTopic(state) {
      return state.mqtt_client_publish_topic
    },
    getMQTTClientPublishMessage(state) {
      return state.mqtt_client_publish_message
    },
    getMQTTClientPublishMessageQOS(state) {
      return state.mqtt_client_publish_message_qos
    },
    getMQTTClientPublishMessageRetain(state) {
      return state.mqtt_client_publish_message_retain
    },
    getMQTTClientPrintLogs(state) {
      return state.print_mqtt_client_log
    }
  }
}