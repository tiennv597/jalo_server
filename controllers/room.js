
var SOCKET_CONSTANT = require("../constant/socket_constant.js");
const Question = require('../models/learn/Question')
module.exports = function (io, socket, namespace, listRoom) {

  var nsp = io.of(namespace);
  socket.on("get-rooms", function (data) {
    socket.emit('server-send-rooms', data);
  });

  socket.on(SOCKET_CONSTANT.creat_room, function (userId, fullName, level, type, quantity, time) {
    if (time == null) {// đang bug khi tạo time = 10 thì undefined đamg không biết tại sao
      time = "10"
    }
    console.log(time);
    var d = new Date();
    var r = Math.floor((Math.random() * 10));
    var id_room = d.getMilliseconds().toString() + r.toString();
    var info = {
      'id_room': id_room,
      "id_owner": userId,
      "name_noom": "",
      "password": "",
      'level': level,
      "quantity": quantity,
      "time": time,
      "type": type,
    };

    var user = {
      id: userId,
      fullName: fullName,
      gender: '1',
      profileUrl: '1',
    };
    var roomObj = {
      "info": info,
      "users": new Map()
    }

    roomObj.users.set(userId, user);

    listRoom.set(id_room, roomObj);
    let users = Array.from(roomObj.users.values());
    socket.join(id_room);
    var r = {
      'info': info,
      'all_user': users,
    }
    var room = JSON.stringify(r);
    socket.emit(SOCKET_CONSTANT.server_send_room, room);
  });
  socket.on(SOCKET_CONSTANT.join_room, function (id_room, password, userId, fullName) {
    var roomObj = listRoom.get(id_room);
    console.log(id_room);
    console.log(roomObj.users);
    var user = {
      "id": userId,
      "fullName": fullName,
      "gender": "",
      "profileUrl": ""
    }
    roomObj.users.set(userId, user);
    //let u = roomObj.users.values();
    let users = Array.from(roomObj.users.values());
    var r = {
      'info': roomObj.info,
      'all_user': users,
    }
    var room = JSON.stringify(r);
    console.log(room);

    socket.join(id_room);
    nsp.to(id_room).emit(SOCKET_CONSTANT.joined_room, room);

  });
  // update info room
  socket.on(SOCKET_CONSTANT.update_room, function (idRoom, level, type, quantity, time) {
    console.log(idRoom, level, type, quantity, time);
    if (time == null) {// đang bug khi tạo time = 10 thì undefined đamg không biết tại sao
      time = "10"
    }
    var roomObj = listRoom.get(idRoom);
    console.log(JSON.stringify(roomObj));
    roomObj.info.level = level;
    roomObj.info.type = type;
    roomObj.info.quantity = quantity;
    roomObj.info.time = time;
    console.log(JSON.stringify(roomObj));
    listRoom.set(idRoom, roomObj);

    var room = JSON.stringify(roomObj);
    nsp.to(idRoom).emit(SOCKET_CONSTANT.update_room, room);
  });
  //leave room
  socket.on(SOCKET_CONSTANT.leave, (id_room, userInRoom) => {
    //let obj_room = { id_room };
    socket.leave(id_room);
    if (userInRoom == 1) {
      listRoom.delete(id_room);
    }

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
  socket.on(SOCKET_CONSTANT.start_game, async (id_room, quantity, type, level) => {
    let number = Number(quantity);
    const questions = await Question.aggregate([{ $sample: { size: number } }]);
    nsp.to(id_room).emit(SOCKET_CONSTANT.start_game, { questions: questions });
  });

  //test
  socket.on("msg", function (data) {
    console.log(data + "dd");
  });
}