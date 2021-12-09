const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
import moment from "moment"

export default {
  state: {
    broker_server: "",
    mqtt_broker: "",
    mqtt_broker_port: "",
    print_mqtt_broker_log: "",
    mqtt_broker_message: "",
    mqtt_broker_message_topic: "",
    mqtt_broker_message_qos: 0,
    mqtt_broker_message_retain: false,
    mqtt_broker_status: false,
  },
  mutations: {
    setMQTTBrokerServer(state) {
      state.broker_server = server
    },
    setMQTTBroker(state) {
      state.mqtt_broker = aedes
    },
    setMQTTBrokerPort(state, data) {
      state.mqtt_broker_port = data
    },
    setMQTTBrokerStatus(state, data) {
      state.mqtt_broker_status = data
    },
    setMQTTBrokerMessageTopic(state, data) {
      state.mqtt_broker_message_topic = data
    },
    setMQTTBrokerMessage(state, data) {
      state.mqtt_broker_message = data
    },
    setMQTTBrokerPrintMessageLog(state) {
      state.print_mqtt_broker_log += `${moment().format("HH:mm:ss")} -> req:(${state.mqtt_broker_message_topic}) ${state.mqtt_broker_message}\r`
    },
    setMQTTBrokerPublishMessageQOS(state, data) {
      state.mqtt_broker_message_qos = Number(data)
    },
    setMQTTBrokerPublishMessageRetain(state, data) {
      state.mqtt_broker_message_retain = data
    },
    clearMQTTBrokerServer(state) {
      state.broker_server = ""
    },
    clearMQTTBroker(state) {
      state.mqtt_broker = ""
    },
    clearMQTTBrokerPrintMessageLogs(state) {
      state.print_mqtt_broker_log = ""
    }
  },
  actions: {
    createMQTTBroker({ commit, state }) {
      //Set Socket Data
      commit("setMQTTBrokerServer")
      //Set MQTT Data
      commit("setMQTTBroker")

      state.broker_server.listen(state.mqtt_broker_port, function () {
        console.log(`MQTT Broker is Running on Port ${state.mqtt_broker_port}`)
        commit("setMQTTBrokerStatus", true)
      })

      state.mqtt_broker.on('client', function (client) {
        console.log("yeni biri geldi")
      })

      state.mqtt_broker.on('publish', function (packet, client) {
        console.log(packet)
      })

      state.mqtt_broker.on('subscribe', function (packet, client) {
        console.log("subscribe")
      })

      state.mqtt_broker.on('clientError', function (client, err) {
        console.log(`${client.id} has error`)
      })

      state.mqtt_broker.on('connectionError', function (client, err) {
        console.log(`${client.id} has connection error`)
      })

    },
    closeMQTTBroker({ commit, state }) {
      state.broker_server.close()
      state.mqtt_broker.close()
      commit("setMQTTBrokerStatus", false)
      commit("clearMQTTBrokerServer")
      commit("clearMQTTBroker")
    },
    sendMQTTBrokerMessageToClient({ commit, state }) {
      state.mqtt_broker.publish({
        cmd: 'publish',
        qos: state.mqtt_broker_message_qos,
        dup: false,
        topic: state.mqtt_broker_message_topic,
        payload: state.mqtt_broker_message,
        retain: state.mqtt_broker_message_retain,
      })
      commit("setMQTTBrokerPrintMessageLog")
    }
  },
  getters: {
    getMQTTBroker(state) {
      return state.mqtt_broker
    },
    getMQTTBrokerPort(state) {
      return state.mqtt_broker_port
    },
    getMQTTBrokerStatus(state) {
      return state.mqtt_broker_status
    },
    getMQTTBrokerPrintLogs(state) {
      return state.print_mqtt_broker_log
    },
    getMQTTBrokerMessageTopic(state) {
      return state.mqtt_broker_message_topic
    },
    getMQTTBrokerMessage(state) {
      return state.mqtt_broker_message
    },
    getMQTTBrokerQOS(state) {
      return state.mqtt_broker_message_qos
    },
    getMQTTBrokerRetain(state) {
      return state.mqtt_broker_message_retain
    },
  }
}