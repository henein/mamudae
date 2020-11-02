import io from 'socket.io-client';

const text = document.body.appendChild(document.createElement('a'));
text.innerHTML = '로그인 중...';

document.body.appendChild(document.createElement('br'));

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

const endButton = document.body.appendChild(document.createElement('button'));
endButton.innerHTML = '블라인드 상대픽 공개';
endButton.addEventListener('click', () => {
  socket.emit('end');
});

startButton.disabled = false;
resetButton.disabled = false;
endButton.disabled = false;

const key = prompt('비밀번호를 입력해주세요!');

const socket = io('/admin', {
  reconnectionDelayMax: 10000,
  query: {
    key: key,
  },
});

socket.on('login', (isSuccessed: boolean) => {
  if (isSuccessed) {
    alert('로그인 성공!');
    text.innerHTML = '로그인 성공';
    startButton.disabled = false;
    resetButton.disabled = false;
    endButton.disabled = false;
  } else {
    alert('로그인에 실패했습니다. 재시도시 새로고침 해주세요.');
    text.innerHTML = '로그인 실패';
    startButton.disabled = true;
    resetButton.disabled = true;
    endButton.disabled = true;
  }
});
