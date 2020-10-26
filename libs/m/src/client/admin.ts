import io from 'socket.io-client';

const socket = io('/admin', {
  reconnectionDelayMax: 10000,
});

const startButton = document.body.appendChild(document.createElement('button'));
startButton.innerHTML = '시작';
startButton.addEventListener('click', () => {
  socket.emit('start');
});

const resetButton = document.body.appendChild(document.createElement('button'));
resetButton.innerHTML = '리셋';
resetButton.addEventListener('click', () => {
  socket.emit('reset');
});
