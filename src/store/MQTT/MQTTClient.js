export default {
  state: {
    print_mqtt_client_log: "",
    mqtt_client_status: false,
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    getMQTTClientStatus(state) {
      return state.mqtt_client_status
    },
    getMQTTClientPrintLogs(state) {
      return state.print_mqtt_client_log
    }
  }
}