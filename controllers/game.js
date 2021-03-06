var SOCKET_CONSTANT = require("../constant/socket_constant.js");

module.exports = function (io, socket, namespace) {
  var nsp = io.of(namespace);

  socket.on('client-send-scores', (room, message) => {
    nsp.to(room).emit("server-send-scores", message);
    console.log(room + message);
  });

  socket.on(SOCKET_CONSTANT.client_send_message, (room, displayName, message) => {
    var obj = { name: displayName, message: message };
    var message = JSON.stringify(obj);
    nsp.to(room).emit(SOCKET_CONSTANT.server_send_message, message);
    console.log(room + displayName + message);
  });

  socket.on(SOCKET_CONSTANT.check_answer, function (room, userId, userName, marks) {
    var obj = { userId: userId, userName: userName, marks: marks };
    var status = JSON.stringify(obj);
    console.log(status);
    nsp.to(room).emit(SOCKET_CONSTANT.check_answer, status);

  });

  socket.on(SOCKET_CONSTANT.next_question, function (room) {
    console.log(room);
    nsp.to(room).emit(SOCKET_CONSTANT.next_question);

  });

  // lay 
  // socket.on(SOCKET_CONSTANT.get_quizzes, (room, level, type) => {
  //   var obj = { level: level, type: type };
  //   learnCtrl.getRandomByLevelAndType(obj, function (pto) {
  //     nsp.to(room).emit(SOCKET_CONSTANT.send_quizzes, pto);
  //     console.log(pto);
  //   });
  // });

  ///comment laoij
  // socket.on(SOCKET_CONSTANT.client_get_rooms, () => {
  //   //nsp.to(room).emit("server-send-scores", message);
  //   console.log(socket.adapter.rooms);
  //   //console.log(room + message);
  // });

}