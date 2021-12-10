import net from "net"
import moment from "moment"

export default {
  state: {
    tcp_client_host: "",
    tcp_client_port: "",
    tcp_client: "",
    tcp_client_message: "",
    print_tcp_client_log: "",
    tcp_client_server_status: false,
    tcp_client_connection_status: false,
  },
  mutations: {
    setTCPClientHost(state, data) {
      state.tcp_client_host = data
    },
    setTCPClientPort(state, data) {
      state.tcp_client_port = data
    },
    setTCPClient(state) {
      state.tcp_client = new net.Socket()
    },
    setTCPClientMessage(state, data) {
      state.tcp_client_message = data
    },
    clearTCPClient(state) {
      state.tcp_client = ""
    },
    setTCPClientConnectionStatus(state, data) {
      state.tcp_client_connection_status = data
    },
    setTCPClientServerStatus(state, data) {
      state.tcp_client_server_status = data
    },
    printTCPCLientLog(state, data) {
      state.print_tcp_client_log += `${moment().format("HH:mm:ss")} -> req: ${data}\r`;
    },
    printServerMessages(state, data) {
      state.print_tcp_client_log += `${moment().format("HH:mm:ss")} -> res: ${data}`;
    },
    clearTCPClientLogs(state) {
      state.print_tcp_client_log = ""
    },
  },
  actions: {
    createTCPConnection({ commit, state, dispatch }) {
      commit("setTCPClientConnectionStatus", true)
      commit("setTCPClient")

      state.tcp_client.connect({ host: state.tcp_client_host, port: state.tcp_client_port }, () => {
        commit("setTCPClientServerStatus", true)
        commit("setTCPClientConnectionStatus", false)
        console.log("Client Connected !");
      });

      state.tcp_client.on("data", (data) => {
        commit("printServerMessages", data.toString())
      });

      state.tcp_client.on("error", () => {
        dispatch("closeTCPConnection")
        console.log("Client Connection Error !");
      });

      state.tcp_client.on("close", () => {
        dispatch("closeTCPConnection")
        console.log("Client Connection Closed !");
      });

    },
    closeTCPConnection({ commit, state }) {
      if (state.tcp_client) {
        state.tcp_client.destroy();
      }
      commit("setTCPClientConnectionStatus", false)
      commit("setTCPClientServerStatus", false)
      commit("clearTCPClient")
    },
    sendMessageToServer({ commit, state }, data) {
      commit("printTCPCLientLog", data)
      state.tcp_client.write(`${data}\r\n`);
    },
  },
  getters: {
    getTCPClient(state) {
      return state.tcp_client
    },
    getTCPClientHost(state) {
      return state.tcp_client_host
    },
    getTCPClientPort(state) {
      return state.tcp_client_port
    },
    getTCPClientServerStatus(state) {
      return state.tcp_client_server_status
    },
    getTCPConnectionStatus(state) {
      return state.tcp_client_connection_status
    },
    getTCPClientLogs(state) {
      return state.print_tcp_client_log
    },
    getTCPClientMessage(state) {
      return state.tcp_client_message
    }
  }
}