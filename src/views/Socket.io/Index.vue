<template>
  <div>socket.io</div>
</template>

<script>
const server = require("http").createServer();
//const io = require("socket.io")(server);

export default {
  data() {
    return {
      socket_io: "",
    };
  },
  methods: {
    createSocketIOServer() {
      io.on("connection", (client) => {
        client.on("disconnect", () => {
          console.log("Some Client Leaved From Socket !");
        });
      });

      server.listen(process.env.SOCKET_IO_PORT, () => {
        console.log(
          `Central Socket.io Server is Running on Port ${process.env.SOCKET_IO_PORT} !`
        );
      });
    },
  },
};
</script>

<style>
</style>