
var SOCKET_CONSTANT = require("../constant/socket_constant.js");
var listRoom = [];
var listRoomCnWord = new Map();
var listRoomVocabulary = new Map();
var listRoomGrammar = new Map();

module.exports = function (app, io) {
    //deful name space
    io.on(SOCKET_CONSTANT.connect, function (socket) {
        // Load the chat controller
        console.log('ket noi toi ');
        socket.on(SOCKET_CONSTANT.client_get_rooms, function (data) {
            let rCw = Array.from(listRoomCnWord.values());
            let rVc = Array.from(listRoomCnWord.values());
            rCw = rCw.map(x => ({ 'info': x.info }));
            rVc = rVc.map(x => ({ 'info': x.info }));
            console.log(rCw);
            let roomsCw = Array.from(rCw);
            let rooms_Vc = Array.from(rVc);
            var r = {
                'rooms_cw': roomsCw,
                'rooms_vc': rooms_Vc,
                // 'rooms_gr': infoRooms,
            }
            var rooms = JSON.stringify(r);
            console.log(rooms);
            socket.emit(SOCKET_CONSTANT.server_send_rooms, rooms);
        });
        socket.on(SOCKET_CONSTANT.create_socket_private, function (data) {
            console.log(data);
            socket.join(data);
            //socket.emit(SOCKET_CONSTANT.add_friends, "thanh cong roi");

        });
        socket.on(SOCKET_CONSTANT.add_friends, function (data) {
            console.log("test");
            socket.emit(SOCKET_CONSTANT.add_friends, "thanh cong roi");

        });

        socket.on(SOCKET_CONSTANT.invite_into, function (inviter, invitee, info) {
            console.log(inviter);
            console.log(invitee);
            console.log(info);
            //socket.emit(SOCKET_CONSTANT.add_friends, "thanh cong roi");
            io.to(invitee._id).emit(SOCKET_CONSTANT.invite_into, inviter,invitee, info);

        });
    });

    //create china word namespace
    var china_word_ns = io.of(SOCKET_CONSTANT.china_word_ns);
    china_word_ns.on(SOCKET_CONSTANT.connect, function (socket) {
        console.log('china word namespace');
        require('../controllers/game')(io, socket, SOCKET_CONSTANT.china_word_ns);
        require('../controllers/room')(io, socket, SOCKET_CONSTANT.china_word_ns, listRoomCnWord);
    });

    //create grammar namespace
    var grammar_ns = io.of(SOCKET_CONSTANT.grammar_ns);
    grammar_ns.on(SOCKET_CONSTANT.connect, function (socket) {
        console.log('grammar namespace');
        require('../controllers/game')(io, socket);
        require('../controllers/room')(io, socket, SOCKET_CONSTANT.grammar_ns, listRoomGrammar);
    });

    //create vocabulary namespace
    var vocabulary_ns = io.of(SOCKET_CONSTANT.vocabulary_ns);
    vocabulary_ns.on(SOCKET_CONSTANT.connect, function (socket) {
        console.log('vocabulary namespace');
        require('../controllers/game')(io, socket);
        require('../controllers/room')(io, socket, SOCKET_CONSTANT.vocabulary_ns, listRoomVocabulary);
    });

}
