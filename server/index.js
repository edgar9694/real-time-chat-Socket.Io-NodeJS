var express = require('express');
var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

// app.get('/hola-mundo', (req,res) => {
//   res.status(200).send('Hola mundo desde Socket.IO');
// });

var messages = [{
  id: 1,
  text: 'Bienvenido al chat privado de Socket.io y NodeJS de Edgar Ugueto',
  nickname: 'Bot - edgard9u6@gmail.com'
}];

//midleware para cargar una vista estatica por defecto
app.use(express.static('client'));

// abriendo conexion al socket
io.on('connection', (socket) =>{
  console.log("Alguien se ha conectado a Socket desde el nodo con IP: "+socket.handshake.address);

  socket.emit('messages',messages);

  //guardo el evento addMessage
  socket.on('add-message',(data) => {
    messages.push(data);

    io.sockets.emit('messages', messages);
  });

});

server.listen(6677, ()=>{
  console.log('Servidor esta funcionando en http://localhost:6677');
});
