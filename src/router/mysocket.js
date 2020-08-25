import io from "socket.io-client";

let socket = io.connect("http://localhost:3000");
console.log(socket);
socket.on("connect", function() {
  console.log("建立起链接");
});

export default socket;
