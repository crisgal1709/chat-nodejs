var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;

server.listen(port, function(){
	console.log('El servidor está funcionando en localhost:' + port);
});

//Ruta
app.get('/hola-mundo', (req, res)=> {
	console.log(req.query);
	io.emit('prueba', req.query )
	res.status(200).send('si');
});

//Sockets
var messages = [
	{
		id: 1,
		text: 'Bienvenido al chat privado de NodeJs y Socket.io de Cristian Galeano',
		nickname: 'Bot - @cristiangno'
	}
];

// io.set('origins', '*:*')
// io.set('match origin protocol', true)

io.on('connection', (socket) => {
	//console.log('El nodo con IP: ' + socket.handshake.address + ' Se ha conectado');
	socket.emit('messages', messages);

	socket.on('addMessage', function(data) {
		messages.push(data);
		io.sockets.emit('messages', messages);
	});

	socket.on('verificar_paciente_atencion', function(data){
		var mensaje = {
			on: true
		};
		io.sockets.emit('paciente_atencion', mensaje);
	})

});

app.use(express.static('client'));



