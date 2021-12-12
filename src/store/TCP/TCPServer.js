import net from "net"
import moment from "moment"

export default {
  state: {
    tcp_server: "",
    tcp_server_port: "",
    print_tcp_server_log: "",
    tcp_server_message: "",
    tcp_server_clients: [],
    tcp_selected_clients: [],
    tcp_client_id: 0,
    tcp_server_status: false,
    tcp_client_close_status: true,
  },
  mutations: {
    setTCPServer(state) {
      state.tcp_server = net.createServer()
    },
    setTCPPort(state, data) {
      state.tcp_server_port = data
    },
    setTCPClients(state, data) {
      state.tcp_server_clients.push(data)
    },
    increaseTCPClientId(state) {
      state.tcp_client_id++
    },
    printTCPServerLog(state, data) {
      state.print_tcp_server_log += `${moment().format("HH:mm:ss")} -> Me(Server): ${data}\r`
    },
    printTCPServerClientLog(state, data) {
      state.print_tcp_server_log += `${moment().format("HH:mm:ss")} -> Client: ${data}`
    },
    cleatTCPServerLogs(state) {
      state.print_tcp_server_log = ""
    },
    setTCPServerStatus(state, data) {
      state.tcp_server_status = data
    },
    setTCPClientCloseStatus(state, data) {
      state.tcp_client_close_status = data
    },
    clearTCPServer(state) {
      state.tcp_server = ""
    },
    clearTCPClients(state) {
      state.tcp_server_clients = []
    },
    clearSelectedTCPClients(state) {
      state.tcp_selected_clients = []
    },
    resetTCPClientId(state) {
      state.tcp_client_id = 0
    },
    setSelectedTCPClients(state, data) {
      state.tcp_selected_clients = data
    },
    setTCPServerMessage(state, data) {
      state.tcp_server_message = data
    }
  },
  actions: {
    createTCPServer({ commit, state }) {
      //Save TCP Server
      commit('setTCPServer')
      state.tcp_server.on("connection", (socket) => {
        console.log("Client Joined !")

        //Increase New Client ID
        commit("increaseTCPClientId")
        //Store New Clients
        commit('setTCPClients', { id: `Client-${state.tcp_client_id}`, socket: socket })

        socket.on("data", (data) => {
          //Print Client Datas To Server Logs Screen
          commit("printTCPServerClientLog", data.toString())
        })

        socket.on("end", (end) => {
          console.log("end !", end)
        })

        socket.on("close", (close) => {
          console.log("close ->", close)
        })

        socket.on("error", () => {
          socket.destroy()
        })
      })

      state.tcp_server.listen(Number(state.tcp_server_port), () => {
        console.log(`TCP Server is Running at ${state.tcp_server_port}`)
        commit("setTCPServerStatus", true)
      })
    },
    closeTCPServer({ commit, state }) {
      //Close Client Connections
      state.tcp_server_clients.forEach((client) => {
        client.socket.destroy()
      })
      //Close TCP Server
      state.tcp_server.close()

      commit("setTCPServerStatus", false)
      commit("setTCPClientCloseStatus", true)
      commit("clearTCPServer")
      commit("clearTCPClients")
      commit("clearSelectedTCPClients")
      commit("resetTCPClientId")
    },
    closeSelectedTCPClients({ commit, state }) {
      const clients_backup = [...state.tcp_server_clients]
      commit("clearTCPClients")

      for (const client of clients_backup) {
        if (state.tcp_selected_clients.includes(client.id) === false) {
          commit("setTCPClients", client)
        } else {
          client.socket.destroy()
        }
      }
      //Cleat Selected TCP Clients
      commit("clearSelectedTCPClients")
    },
  },
  getters: {
    getTCPServer(state) {
      return state.tcp_server
    },
    getTCPPort(state) {
      return state.tcp_server_port
    },
    getTCPServerClients(state) {
      return state.tcp_server_clients
    },
    getTCPServerStatus(state) {
      return state.tcp_server_status
    },
    getSelectedTCPClients(state) {
      return state.tcp_selected_clients
    },
    getTCPServerLogs(state) {
      return state.print_tcp_server_log
    },
    getTCPClientCloseStatus(state) {
      return state.tcp_client_close_status
    },
    getTCPServerMessage(state) {
      return state.tcp_server_message
    }
  }
}