import { autorun } from 'mobx';
import { GlowFilter } from 'pixi-filters';
import { IOEvent } from '../../common/events';
import { store } from '../store';
import { DetailRoundedRect } from './detailRoundedRect';
import { Tween, Easing } from '@tweenjs/tween.js';
import MultiStyleText from 'pixi-multistyle-text';

export class TitleBar extends PIXI.Container {
  private _main: PIXI.Graphics;
  private _leftGlow: PIXI.Sprite;
  private _rightGlow: PIXI.Sprite;
  private _leftArrow: PIXI.Sprite;
  private _rightArrow: PIXI.Sprite;
  private _leftTween: Tween<any>;
  private _rightTween: Tween<any>;
  private _preLeftTween: Tween<any>;
  private _preRightTween: Tween<any>;

  constructor() {
    super();

    this._leftGlow = this.addChild(
      PIXI.Sprite.from('../assets/ui/leftGlow.png')
    );
    this._leftGlow.position.set(0, 0);
    this._leftGlow.visible = false;
    this._leftGlow.alpha = 0;

    this._rightGlow = this.addChild(
      PIXI.Sprite.from('../assets/ui/rightGlow.png')
    );
    this._rightGlow.position.set(1920 - 428, 0);
    this._rightGlow.visible = false;
    this._rightGlow.alpha = 0;

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

    this._leftArrow = this.addChild(
      PIXI.Sprite.from('../assets/ui/leftArrow.png')
    );
    this._leftArrow.position.set(428, 0);
    this._leftArrow.visible = false;
    this._leftArrow.alpha = 0;

    this._preLeftTween = new Tween({
      glow: this._leftGlow,
      arrow: this._leftArrow,
    })
      .to({ glow: { alpha: 1 }, arrow: { alpha: 0.7 } }, 500)
      .easing(Easing.Quartic.InOut)
      .onStart((object) => {
        object.glow.visible = true;
        object.glow.alpha = 0;
        object.arrow.visible = true;
        object.arrow.alpha = 0;
      });

    this._leftTween = new Tween({
      glow: this._leftGlow,
      arrow: this._leftArrow,
    })
      .to({ glow: { alpha: 0.7 }, arrow: { alpha: 1 } }, 1000)
      .repeat(Infinity)
      .yoyo(true)
      .onStop((object) => {
        object.glow.visible = false;
        object.glow.alpha = 0;
        object.arrow.visible = false;
        object.arrow.alpha = 0;
      });

    this._rightArrow = this.addChild(
      PIXI.Sprite.from('../assets/ui/rightArrow.png')
    );
    this._rightArrow.position.set(1356, 0);
    this._rightArrow.visible = false;
    this._rightArrow.alpha = 0;

    this._preRightTween = this._rightTween = new Tween({
      glow: this._rightGlow,
      arrow: this._rightArrow,
    })
      .to({ glow: { alpha: 1 }, arrow: { alpha: 0.7 } }, 500)
      .easing(Easing.Quartic.InOut)
      .onStart((object) => {
        object.glow.visible = true;
        object.glow.alpha = 0;
        object.arrow.visible = true;
        object.arrow.alpha = 0;
      });

    this._rightTween = new Tween({
      glow: this._rightGlow,
      arrow: this._rightArrow,
    })
      .to({ glow: { alpha: 0.7 }, arrow: { alpha: 1 } }, 1000)
      .repeat(Infinity)
      .yoyo(true)
      .onStop((object) => {
        object.glow.visible = false;
        object.glow.alpha = 0;
        object.arrow.visible = false;
        object.arrow.alpha = 0;
      });

    const glowFilter = new GlowFilter({
      distance: 12,
      quality: 0.3,
      outerStrength: 1,
    });
    this._main.filters = [glowFilter];

    const title = this.addChild(
      new MultiStyleText('', {
        default: {
          fontFamily: 'MaplestoryOTFBold',
          fontSize: '56px',
          fill: '#404040',
          align: 'center',
        },
        leftTeam: {
          fontSize: '56px',
          fill: '#0075ca',
        },
        rightTeam: {
          fontSize: '56px',
          fill: '#de9300',
        },
      })
    );

    title.anchor.set(0.5, 0);
    title.position.set(1920 / 2, 32 - 2);

    autorun(() => {
      const nextSequence = store.sequenceStore.currentSequence;
      this._preLeftTween.stop();
      this._leftTween.stop();
      this._preRightTween.stop();
      this._rightTween.stop();

      if (nextSequence) {
        switch (nextSequence.event) {
          case IOEvent.START:
            title.text = '대기 중';
            break;
          case IOEvent.BAN_PICK:
            if (nextSequence.payload?.action == 'ban') {
              title.text = `${
                nextSequence.payload.team == 'left'
                  ? `<leftTeam>${store.sequenceStore.leftTeamName}</leftTeam>`
                  : `<rightTeam>${store.sequenceStore.rightTeamName}</rightTeam>`
              }이 ${
                (nextSequence.payload.index ?? 0) + 1
              }번째 밴할 직업을 선택 중`;
            } else if (nextSequence.payload?.action == 'pick') {
              title.text = `${
                nextSequence.payload?.team == 'left'
                  ? `<leftTeam>${store.sequenceStore.leftTeamName}</leftTeam>`
                  : `<rightTeam>${store.sequenceStore.rightTeamName}</rightTeam>`
              }이 ${(nextSequence.payload?.index ?? 0) + 1}번째 직업을 선택 중`;
            } else if (nextSequence.payload?.action == 'opponentPick') {
              title.text = '상대픽';
            }

            switch (nextSequence?.payload?.team) {
              case 'left':
                this._preLeftTween.chain(this._leftTween).start();
                break;
              case 'right':
                this._preRightTween.chain(this._rightTween).start();
                break;
              default:
                this._preLeftTween.chain(this._leftTween).start();
                this._preRightTween.chain(this._rightTween).start();
            }

            break;
          case IOEvent.END:
            title.text = '종료';
            break;
          default:
            title.text = '';
        }
      } else {
        title.text = '';
      }
    });
  }
}
