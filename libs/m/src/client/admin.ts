import io from 'socket.io-client';
import { IOEvent } from '../common/events';
import { TeamNamePayload } from './../common/events';

const stateText = document.getElementById('stateText') as HTMLHeadingElement;

const startButton = document.getElementById('startButton') as HTMLButtonElement;
startButton.addEventListener('click', () => {
  socket.emit('start');
});

const resetButton = document.getElementById('resetButton') as HTMLButtonElement;
resetButton.addEventListener('click', () => {
  socket.emit('reset');

  const payload: TeamNamePayload = {
    leftTeamName: leftTeamNameInput.value,
    rightTeamName: rightTeamNameInput.value,
  };

  socket.emit(IOEvent.TEAM_NAME, payload);
});

const endButton = document.getElementById('endButton') as HTMLButtonElement;
endButton.addEventListener('click', () => {
  socket.emit('end');
});

const leftTeamNameInput = document.getElementById(
  'leftTeamNameInput'
) as HTMLInputElement;

const rightTeamNameInput = document.getElementById(
  'rightTeamNameInput'
) as HTMLInputElement;

const submitButton = document.getElementById(
  'submitButton'
) as HTMLButtonElement;
submitButton.addEventListener('click', () => {
  const payload: TeamNamePayload = {
    leftTeamName: leftTeamNameInput.value,
    rightTeamName: rightTeamNameInput.value,
  };

  socket.emit(IOEvent.TEAM_NAME, payload);
});

const key = prompt('비밀번호를 입력해주세요!');

const socket = io('/admin', {
  reconnectionDelayMax: 10000,
  query: {
    key: key,
  },
});

socket.on(
  IOEvent.LOGIN,
  (isSuccessed: boolean, leftTeamName: string, rightTeamName: string) => {
    if (isSuccessed) {
      alert('로그인 성공!');
      stateText.innerHTML = '로그인 성공';
      startButton.disabled = false;
      resetButton.disabled = false;
      endButton.disabled = false;
      leftTeamNameInput.value = leftTeamName;
      leftTeamNameInput.disabled = false;
      rightTeamNameInput.value = rightTeamName;
      rightTeamNameInput.disabled = false;
      submitButton.disabled = false;
    } else {
      alert('로그인에 실패했습니다. 재시도시 새로고침 해주세요.');
      stateText.innerHTML = '로그인 실패';
      startButton.disabled = true;
      resetButton.disabled = true;
      endButton.disabled = true;
      leftTeamNameInput.value = '';
      leftTeamNameInput.disabled = true;
      rightTeamNameInput.value = '';
      rightTeamNameInput.disabled = true;
      submitButton.disabled = true;
    }
  }
);
