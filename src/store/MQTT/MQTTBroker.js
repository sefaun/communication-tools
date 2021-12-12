import moment from "moment"

export default {
  state: {
    aedes: "",
    server: "",
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
      state.aedes = require('aedes')()
      state.server = require('net').createServer(state.aedes.handle)
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
      state.print_mqtt_broker_log += `${moment().format("HH:mm:ss")} -> Me(Broker):(${state.mqtt_broker_message_topic}) ${state.mqtt_broker_message}\r`
    },
    setMQTTBrokerPrintClientsMessageLog(state, data) {
      state.print_mqtt_broker_log += `${moment().format("HH:mm:ss")} -> Client:(${data.topic}) ${data.payload.toString()}\r`
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
      //Set MQTT Broker
      commit("setMQTTBrokerServer")

      state.server.listen(state.mqtt_broker_port, function () {
        console.log(`MQTT Broker is Running on Port ${state.mqtt_broker_port}`)
        commit("setMQTTBrokerStatus", true)
      })

      state.aedes.on('client', function (client) {
        console.log("yeni biri geldi")
      })

      state.aedes.on('publish', function (packet, client) {
        if (packet.cmd) {
          commit("setMQTTBrokerPrintClientsMessageLog", packet)
        }
      })

      state.aedes.on('subscribe', function (packet, client) {
        console.log("subscribe")
      })

      state.aedes.on('clientError', function (client, err) {
        console.log(`${client.id} has error`)
      })

      state.aedes.on('connectionError', function (client, err) {
        console.log(`${client.id} has connection error`)
      })

    },
    closeMQTTBroker({ commit, state }) {
      state.aedes.close()
      state.server.close()
      commit("setMQTTBrokerStatus", false)
      commit("clearMQTTBrokerServer")
      commit("clearMQTTBroker")
    },
    sendMQTTBrokerMessageToClient({ commit, state }) {
      state.aedes.publish({
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