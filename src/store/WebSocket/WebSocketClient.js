import moment from "moment"

export default {
  state: {
    websocket: "",
    websocket_client_protocol: "ws",
    websocket_client_host: "",
    websocket_client_port: "",
    print_websocket_client_messages: "",
    websocket_client_server_status: false,
    websocket_client_connection_status: false
  },
  mutations: {
    setWebSocketClient(state) {
      state.websocket = new WebSocket(`${state.websocket_client_protocol}://${state.websocket_client_host}:${state.websocket_client_port}`)
    },
    setWebSocketClientProtocol(state, data) {
      state.websocket_client_protocol = data
    },
    setWebSocketClientHost(state, data) {
      state.websocket_client_host = data
    },
    setWebSocketClientPort(state, data) {
      state.websocket_client_port = data
    },
    setWebSocketClientServerStatus(state, data) {
      state.websocket_client_server_status = data
    },
    setWebSocketClientConnectionStatus(state, data) {
      state.websocket_client_connection_status = data
    },
    setWebSocketClientServerMessageLog(state, data) {
      state.print_websocket_client_messages += `${moment().format("HH:mm:ss")} -> Server: ${data}\r`;
    },
    setWebSocketClientMessageLog(state, data) {
      state.print_websocket_client_messages += `${moment().format("HH:mm:ss")} -> Me(Client): ${data}\r`;
    },
    clearWebSocketClientMessageLogs(state) {
      state.print_websocket_client_messages = ""
    },
    clearWebSocketClient(state) {
      state.websocket = ""
    }
  },
  actions: {
    createWebSocketClientConnection({ commit, state }) {

      commit("setWebSocketClientConnectionStatus", true)
      commit("setWebSocketClient")

      state.websocket.onopen = function () {
        commit("setWebSocketClientServerStatus", true)
        commit("setWebSocketClientConnectionStatus", false)
        console.log("websocket Connected...");
      };

      state.websocket.onmessage = function (data) {
        console.log(data)
        commit("setWebSocketClientServerMessageLog", data.data)
      };

      state.websocket.onclose = function () {
        console.log("websocket Connection is closed...");
        state.websocket.close();
        commit("clearWebSocketClient")
        commit("setWebSocketClientConnectionStatus")
        commit("setWebSocketClientServerStatus", false)
        commit("setWebSocketClientConnectionStatus", false)
      };

      state.websocket.onerror = function (event) {
        state.websocket.close();
        console.log("websocket Connection is closed...");
        commit("clearWebSocketClient")
        commit("setWebSocketClientConnectionStatus")
        commit("setWebSocketClientServerStatus", false)
        commit("setWebSocketClientConnectionStatus", false)
      };
    },
    sendWebSocketClientMessageToServer({ commit, state }, data) {
      state.websocket.send(data);
      commit("setWebSocketClientMessageLog", data)
    },
    closeWebSocketClientConnection({ commit, state }) {
      //Close Client Connections
      state.websocket.close();
    },
  },
  getters: {
    getWebSocketClient(state) {
      return state.websocket
    },
    getWebSocketClientProtocol(state) {
      return state.websocket_client_protocol
    },
    getWebSocketClientHost(state) {
      return state.websocket_client_host
    },
    getWebSocketClientPort(state) {
      return state.websocket_client_port
    },
    getWebSocketClientServerStatus(state) {
      return state.websocket_client_server_status
    },
    getWebSocketClientConnectionStatus(state) {
      return state.websocket_client_connection_status
    },
    getWebSocketClientMessageLog(state) {
      return state.print_websocket_client_messages
    },
  }
}