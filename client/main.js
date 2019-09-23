//

var socket = io.connect('', {})

document.addEventListener("DOMContentLoaded", function(e) {
   var r = localStorage.getItem('nickname');

   if (r === null) {
   	document.getElementById('nickname').style.display = 'block';
   } else {
   	document.getElementById('nickname').style.display = 'none';
   }
});


//Cambiar el io.connect para local o para heroku

socket.on('messages', function(data){
	render(data);
})

socket.on('alarma', function(data){
	//soundManager.play('campana');
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

	var l = document.getElementById('nickname').value;

	if (l != '') {
		localStorage.setItem('nickname', l);
	}

	let n = localStorage.getItem('nickname') || e.nickname;

	var message = {
		nickname: n,
		text: document.getElementById('text').value || e.text
	};

	//console.log(message)

	document.getElementById('nickname').style.display = 'none';
	document.getElementById('text').value = '';

	socket.emit('addMessage', message);

	return false;
}

document.getElementById('text').addEventListener('keyup', (e) => {
  if (e.keyCode == 13) {
  	document.getElementById('formChat').requestSubmit()
  }
});

