//https://crisgal-chat-node.herokuapp.com

var socket = io.connect('http://localhost:3000', {
	forceNew: true,
})

console.log(socket);

socket.on('messages', function(data){
	render(data);
})

socket.on('prueba', function(data){
	addMessage(data);
})


function render(data){
	var html = data.map(function(message, index){
		return (`
				<div class="message">
					<strong>${message.nickname}</strong> dice:
					<p>${message.text}</p>
				</div>
			`)
	}).join(' ');
	div = document.getElementById('messages');
	div.innerHTML = html;
	div.scrollTop = div.scrollHeight;
}

function addMessage(e){

	var message = {
		nickname: document.getElementById('nickname').value || e.nickname,
		text: document.getElementById('text').value || e.text
	};
	//console.log(message);
	document.getElementById('nickname').style.display = 'none';
	document.getElementById('text').value = '';

	socket.emit('addMessage', message);

	return false;
}