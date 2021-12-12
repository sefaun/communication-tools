<template>
  <div class="myNavbar">
    <div class="myNavbar-content">
      <div class="d-flex mr-3">
        <div class="mobileButton mr-1" @click="$store.dispatch('onSidebar')">
          <b-icon class="mobileButtonIcon" icon="list"></b-icon>
        </div>
        <!--TCP Status-->
        <div class="d-grid justify-content-center mr-1">
          <div
            class="status-light"
            :style="{
              backgroundColor: tcp_server_status
                ? 'rgb(0, 215, 0)'
                : 'rgb(255, 0, 0)',
              boxShadow: `0 0 5px ${
                tcp_server_status ? 'rgb(0, 215, 0)' : 'rgb(255, 0, 0)'
              }`,
            }"
          ></div>
          <div class="texts-dark font">TCP Server</div>
        </div>
        <div class="d-grid justify-content-center mr-1">
          <div
            class="status-light"
            :style="{
              backgroundColor: tcp_client_server_status
                ? 'rgb(0, 215, 0)'
                : 'rgb(255, 0, 0)',
              boxShadow: `0 0 5px ${
                tcp_client_server_status ? 'rgb(0, 215, 0)' : 'rgb(255, 0, 0)'
              }`,
            }"
          ></div>
          <div class="texts-dark font">TCP Client</div>
        </div>
        <!--MQTT Status-->
        <div class="d-grid justify-content-center mr-1">
          <div
            class="status-light"
            :style="{
              backgroundColor: mqtt_broker_status
                ? 'rgb(0, 215, 0)'
                : 'rgb(255, 0, 0)',
              boxShadow: `0 0 5px ${
                mqtt_broker_status ? 'rgb(0, 215, 0)' : 'rgb(255, 0, 0)'
              }`,
            }"
          ></div>
          <div class="texts-dark font">MQTT Broker</div>
        </div>
        <div class="d-grid justify-content-center mr-1">
          <div
            class="status-light"
            :style="{
              backgroundColor: mqtt_client_server_status
                ? 'rgb(0, 215, 0)'
                : 'rgb(255, 0, 0)',
              boxShadow: `0 0 5px ${
                mqtt_client_server_status ? 'rgb(0, 215, 0)' : 'rgb(255, 0, 0)'
              }`,
            }"
          ></div>
          <div class="texts-dark font">MQTT Client</div>
        </div>
        <!--WebSocket Client-->
        <div class="d-grid justify-content-center mr-1">
          <div
            class="status-light"
            :style="{
              backgroundColor: websocket_client_server_status
                ? 'rgb(0, 215, 0)'
                : 'rgb(255, 0, 0)',
              boxShadow: `0 0 5px ${
                websocket_client_server_status
                  ? 'rgb(0, 215, 0)'
                  : 'rgb(255, 0, 0)'
              }`,
            }"
          ></div>
          <div class="texts-dark font">WS Client</div>
        </div>
      </div>
      <div class="myNavbar-links">
        <div style="margin-right: 15px">
          <el-dropdown trigger="click" placement="bottom" @command="changeLang">
            <span
              ><b-icon
                class="texts-dark"
                font-scale="1.3"
                icon="globe2"
              ></b-icon
            ></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="tr">
                <b-icon
                  v-if="language === 'tr'"
                  font-scale="1.2"
                  icon="check"
                  style="margin-right: 6px"
                ></b-icon
                >{{ $t("general.tr") }}</el-dropdown-item
              >
              <el-dropdown-item command="en">
                <b-icon
                  v-if="language === 'en'"
                  font-scale="1.2"
                  icon="check"
                  style="margin-right: 6px"
                ></b-icon
                >{{ $t("general.en") }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div
          @click="changeTheme"
          class="myNavbar-link"
          style="margin-right: 25px"
        >
          <b-icon
            v-if="getTheme === 'light'"
            class="myNavbar-link-icon"
            icon="moon"
          ></b-icon>
          <b-icon
            v-if="getTheme === 'dark'"
            class="myNavbar-link-icon"
            icon="sun"
          ></b-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      language: "",
    };
  },
  computed: {
    ...mapGetters({
      getTheme: "getTheme",
      tcp_server_status: "getTCPServerStatus",
      tcp_client_server_status: "getTCPClientServerStatus",
      mqtt_broker_status: "getMQTTBrokerStatus",
      mqtt_client_server_status: "getMQTTClientServerStatus",
      websocket_client_server_status: "getWebSocketClientServerStatus",
    }),
  },
  created() {
    this.getLang();
  },
  methods: {
    ...mapActions(["changeTheme"]),
    getLang() {
      if (localStorage.getItem("lang") === "tr") {
        this.language = "tr";
      } else if (localStorage.getItem("lang") === "en") {
        this.language = "en";
      } else {
        localStorage.setItem("lang", "en");
        this.language = "en";
      }
    },
    changeLang(language) {
      this.$store.dispatch("changeLang", language);
      this.language = language;
    },
  },
};
</script>

<style scoped>
.status-light {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 0 auto;
  transition: 0.3s;
}

.font {
  font-size: 11px;
}
</style>