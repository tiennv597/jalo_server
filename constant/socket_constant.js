/**
 * socket constant value
 */

module.exports = {
     basURL: 'http://192.168.1.28:3000',
     nameSpase: '/game-namespace',
     china_word_ns: '/china_word_ns',
     vocabulary_ns: '/vocabulary_ns',
     grammar_ns: '/grammar_ns',
     /**
      * /default evenst of socket io
      */
     connect: 'connect',
     connect_error: 'connect_error',
     connect_timeout: 'connect_timeout',
     connecting: 'connecting',
     disconnect: 'disconnect',
     error: 'error',
     reconnect: 'reconnect',
     reconnect_attempt: 'reconnect_attempt',
     reconnect_failed: 'reconnect_failed',
     reconnect_error: 'reconnect_error',
     reconnecting: 'reconnecting',
     ping: 'ping',
     pong: 'pong',
     /**
      * additton
      */
     message: 'message',
     client_send_message: 'client_send_message',
     server_send_message: 'server_send_message',
     start_game: 'start_game',
     client_get_rooms: 'client_get_rooms',
     server_send_rooms: 'server_send_rooms',
     join_room: 'join_room',
     creat_room: 'creat_room',
     server_send_room: 'server_send_room',
     leave: 'leave',
     joined_room: 'joined_room',
     ready: 'ready',
     get_client_in_room: 'get_client_in_room',
     send_client_in_room: 'send_client_in_room',
     joined_room: 'joined_room',
     get_quizzes: 'get_quizzes',
     send_quizzes: 'send_quizzes',


     check_info_room: 'check_info_room',
     result_check_room: 'result_check_room',


};
