
var SOCKET_CONSTANT = require("../constant/socket_constant.js");
module.exports = function (io, socket, namespace, listRoom) {

  var nsp = io.of(namespace);
  socket.on("get-rooms", function (data) {
    socket.emit('server-send-rooms', data);
  });

  socket.on(SOCKET_CONSTANT.creat_room, function (userId, fullName, level, type, quantity, time) {
    console.log(level);
    var d = new Date();
    var r = Math.floor((Math.random() * 10));
    var id_room = d.getMilliseconds().toString() + r.toString();
    var roomObj = {
      'id_room': id_room,
      "id_owner": userId,
      "name_noom": "",
      "password": "",
      'level': level,
      "quantity": quantity,
      "time": time,
      "type": type,
      "users": [
        {
          "id": userId,
          "fullName": fullName,
          "gender": "",
          "profileUrl": ""
        }
      ]
    }
    listRoom.set(id_room, roomObj);
    socket.join(id_room);

    var room = JSON.stringify(roomObj);
    console.log(room);
    socket.emit(SOCKET_CONSTANT.server_send_room, room);
    console.log(listRoom.get(id_room));
    // }
  });
  socket.on(SOCKET_CONSTANT.join_room, function (id_room, password, userId, fullName) {
    var roomObj = listRoom.get(id_room);
    console.log(id_room);
    console.log(roomObj.users);
    console.log(roomObj);
    var room = JSON.stringify(roomObj);
    socket.join(id_room);
    nsp.to(id_room).emit(SOCKET_CONSTANT.joined_room, room);

  });

  socket.on(SOCKET_CONSTANT.leave, (id_room) => {
    let obj_room = { id_room };

    socket.leave(id_room);
    listRoom.delete(obj_room);
    nsp.to(id_room).emit(SOCKET_CONSTANT.leave);
  });

  socket.on(SOCKET_CONSTANT.ready, (id_room, ready) => {
    nsp.to(id_room).emit(SOCKET_CONSTANT.ready, ready);
    console.log(ready);
  });

  socket.on("user-chat", function (data) {
    io.sockets.in(socket.gameRoom).emit("server-chat", data);
    console.log(data);
  });
  socket.on(SOCKET_CONSTANT.start_game, (id_room) => {
    nsp.to(id_room).emit(SOCKET_CONSTANT.start_game);
  });

  //test
  socket.on("msg", function (data) {
    console.log(data + "dd");
  });
}