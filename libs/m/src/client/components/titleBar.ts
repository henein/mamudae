import { autorun } from 'mobx';
import { IOEvent } from '../../common/events';
import { store } from '../store';
import { DetailRoundedRect } from './detailRoundedRect';
import { MultiStyleText } from './text';

export class TitleBar extends PIXI.Container {
  private _main: PIXI.Graphics;

  constructor() {
    super();

    this._main = this.addChild(
      new DetailRoundedRect({
        color: 0xffffff,
        x: 428,
        y: 0,
        width: 1064,
        height: 136,
        bottomLeft: 64,
        bottomRight: 64,
      })
    );

    const title = this.addChild(
      new MultiStyleText('<leftTeam>나초팀</leftTeam> 첫 직업 선택 중', {
        default: {
          fontFamily: 'Jua',
          fontSize: '64px',
          fill: '#404040',
          align: 'center',
        },
        leftTeam: {
          fontSize: '64px',
          fill: '#0075ca',
        },
      })
    );

    title.anchor.set(0.5, 0);
    title.position.set(1920 / 2, 32);

    autorun(() => {
      const nextSequence = store.sequenceStore.nextSequence;

      if (nextSequence) {
        switch (nextSequence.event) {
          case IOEvent.START:
            title.setText('시작');
            break;
          case IOEvent.BAN_PICK:
            title.setText('밴픽');
            break;
          default:
            title.setText('');
        }
      } else {
        title.setText('');
      }
    });
  }
}
