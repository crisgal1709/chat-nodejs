var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

const apps = [
	'123',
	'1234',
	'12345'
]

server.listen(port, function(){
	console.log('servidor corriendo in port ' + port);
});

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());


// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Ruta

app.get('/hola-mundo', (req, res) => {
	console.log(req.query);
	io.emit('prueba', req.query )
	res.status(200).send('si');
});

app.get('/prueba', (req, res) => {
	//console.log(req.query.event);
	io.emit(req.query.event, req.query )
	res.status(200).send('');
});

app.post('/event-post', (req, res) => {
	io.emit(req.body.event, req.body)
	//console.log(req.body)
	res.status(200).send({error: 0, message: 'Broadcast succesfully'});
});

app.post('/app', (req, res) => {
	res.status(200).send({message: 'bienvenido'})
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
	//console.log(socket)
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

setInterval(function(){
	io.emit('alarma', {message: 'Esta es la alarma'})
}, 30000000);

app.use(express.static('client'));
