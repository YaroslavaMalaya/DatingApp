function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    if (message.username === document.getElementById('username').value) {
        div.classList.add('own');
    }
    const messageTime = new Date(message.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
    div.innerHTML = `<a class="name-time">${message.username} <span class="time-mes">${messageTime}</span></a>
      <p class="text"> ${message.text}</p>`;
    document.querySelector('.messages').appendChild(div);
}
document.addEventListener('DOMContentLoaded', function() {
    const socket = io();

    const username = document.getElementById('username').value;
    const targetUsername = document.getElementById('targetUsername').value;
    socket.emit('joinRoom', { username, targetUsername });

    socket.on('previousMessages', (messages) => {
        messages.forEach(message => {
            outputMessage(message);
        });
    });

    socket.on('message', (message) => {
        outputMessage(message);
    });

    const chatForm = document.querySelector('.chat-form');
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = e.target.elements['message'].value;
        if (msg.trim()) {
            const room = [username, targetUsername].sort().join('_');
            socket.emit('chatMessage', {
                room,
                msg,
                username
            });
            e.target.elements['message'].value = '';
        }
    });

});
