var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen('', 'https://crisgal-chat-node.herokuapp.com', function(){
	console.log('El servidor está funcionando en localhost:6677')
});

//Ruta
app.get('/hola-mundo', (req, res)=> {
	res.status(200).send('Hola mundo desde Nodejs y socket.io');
});

//Sockets
var messages = [
	{
		id: 1,
		text: 'Bienvenido al chat privado de NodeJs y Socket.io de Cristian Galeano',
		nickname: 'Bot - @cristiangno'
	}
];

io.on('connection', (socket) => {
	console.log('El nodo con IP: ' + socket.handshake.address + ' Se ha conectado');
	socket.emit('messages', messages);

	socket.on('addMessage', function(data) {
		messages.push(data);
		io.sockets.emit('messages', messages);
	});

});



app.use(express.static('client'))

