import { store } from '../../../store/state-store';
import { DetailRoundedRect } from './detailRoundedRect';
import { Tween, Easing } from '@tweenjs/tween.js';
import { josa } from 'es-hangul';
import { autorun, reaction } from 'mobx';
import { GlowFilter } from 'pixi-filters';
import {
  Container,
  Graphics,
  HTMLText,
  Sprite,
  Text,
  TextStyle,
} from 'pixi.js';

export class TitleBar extends Container {
  // private _main: Graphics;
  // private _leftGlow: Sprite;
  // private _rightGlow: Sprite;
  // private _leftArrow: Sprite;
  // private _rightArrow: Sprite;
  private _leftTeamName: Text;
  private _rightTeamName: Text;
  // private _leftTween: Tween<any>;
  // private _rightTween: Tween<any>;
  // private _preLeftTween: Tween<any>;
  // private _preRightTween: Tween<any>;

  constructor() {
    super();

    // this._leftGlow = this.addChild(Sprite.from('main/ui/leftGlow.png'));
    // this._leftGlow.position.set(0, 0);
    // this._leftGlow.visible = false;
    // this._leftGlow.alpha = 0;

    // this._rightGlow = this.addChild(Sprite.from('main/ui/rightGlow.png'));
    // this._rightGlow.position.set(1920 - 428, 0);
    // this._rightGlow.visible = false;
    // this._rightGlow.alpha = 0;

    this._leftTeamName = this.addChild(
      new Text(
        '',
        new TextStyle({
          fontFamily: 'Maplestory Bold',
          fontSize: 32,
          fill: 0xffffff,
          dropShadow: true,
          dropShadowColor: 0x404040,
          dropShadowDistance: 0,
          dropShadowBlur: 4,
        }),
      ),
    );
    this._leftTeamName.anchor.set(0, 0.5);
    this._leftTeamName.position.set(128 - 12, 786);

    this._rightTeamName = this.addChild(
      new Text(
        '',
        new TextStyle({
          fontFamily: 'Maplestory Bold',
          fontSize: 32,
          fill: 0xffffff,
          dropShadow: true,
          dropShadowColor: 0x404040,
          dropShadowDistance: 0,
          dropShadowBlur: 4,
        }),
      ),
    );
    this._rightTeamName.anchor.set(1, 0.5);
    this._rightTeamName.position.set(1920 - 128 + 12, 786);

    autorun(() => {
      this._leftTeamName.text = store.roomState.leftTeam.name;
      this._rightTeamName.text = store.roomState.rightTeam.name;
    });

    // this._main = this.addChild(
    //   new DetailRoundedRect({
    //     color: 0xffffff,
    //     x: 428,
    //     y: 0,
    //     width: 1064,
    //     height: 136,
    //     bottomLeft: 64,
    //     bottomRight: 64,
    //   }),
    // );

    // const mask = this.addChild(Sprite.from('main/ui/titlebarMask.png'));
    // mask.position.set(428, 0);
    // this._main.mask = mask;

    // this._leftArrow = this.addChild(Sprite.from('main/ui/leftArrow.png'));
    // this._leftArrow.position.set(428, 0);
    // this._leftArrow.visible = false;
    // this._leftArrow.alpha = 0;

    // this._preLeftTween = new Tween({
    //   glow: this._leftGlow,
    //   // arrow: this._leftArrow,
    // })
    //   .to({ glow: { alpha: 1 }, arrow: { alpha: 0.7 } }, 500)
    //   .easing(Easing.Quartic.InOut)
    //   .onStart((object) => {
    //     object.glow.visible = true;
    //     object.glow.alpha = 0;
    //     // object.arrow.visible = true;
    //     // object.arrow.alpha = 0;
    //   });

    // this._leftTween = new Tween({
    //   glow: this._leftGlow,
    //   // arrow: this._leftArrow,
    // })
    //   .to({ glow: { alpha: 0.7 }, arrow: { alpha: 1 } }, 1500)
    //   .repeat(Infinity)
    //   .yoyo(true)
    //   .onStop((object) => {
    //     object.glow.visible = false;
    //     object.glow.alpha = 0;
    //     // object.arrow.visible = false;
    //     // object.arrow.alpha = 0;
    //   });

    // // this._rightArrow = this.addChild(Sprite.from('main/ui/rightArrow.png'));
    // // this._rightArrow.position.set(1356, 0);
    // // this._rightArrow.visible = false;
    // // this._rightArrow.alpha = 0;

    // this._preRightTween = this._rightTween = new Tween({
    //   glow: this._rightGlow,
    //   // arrow: this._rightArrow,
    // })
    //   .to({ glow: { alpha: 1 }, arrow: { alpha: 0.7 } }, 500)
    //   .easing(Easing.Quartic.InOut)
    //   .onStart((object) => {
    //     object.glow.visible = true;
    //     object.glow.alpha = 0;
    //     // object.arrow.visible = true;
    //     // object.arrow.alpha = 0;
    //   });

    // this._rightTween = new Tween({
    //   glow: this._rightGlow,
    //   // arrow: this._rightArrow,
    // })
    //   .to({ glow: { alpha: 0.7 }, arrow: { alpha: 1 } }, 1500)
    //   .repeat(Infinity)
    //   .yoyo(true)
    //   .onStop((object) => {
    //     object.glow.visible = false;
    //     object.glow.alpha = 0;
    //     // object.arrow.visible = false;
    //     // object.arrow.alpha = 0;
    //   });

    // const glowFilter = new GlowFilter({
    //   distance: 12,
    //   quality: 0.3,
    //   outerStrength: 1,
    // });
    // this._main.filters = [glowFilter];

    // const title = this.addChild(
    //   new MultiStyleText('', {
    //     default: {
    //       fontFamily: 'Maplestory Bold',
    //       fontSize: '56px',
    //       fill: '#404040',
    //       align: 'center',
    //     },
    //     leftTeam: {
    //       fontSize: '56px',
    //       fill: '#0075ca',
    //     },
    //     rightTeam: {
    //       fontSize: '56px',
    //       fill: '#de9300',
    //     },
    //     ban: {
    //       fontSize: '56px',
    //       fill: '#ca0000',
    //     },
    //   })
    // );

    const title = this.addChild(
      new HTMLText('', {
        fontFamily: ['Maplestory Bold', 'sans-serif'],
        fontSize: 56,
        fill: 0xffffff,
        align: 'center',
        dropShadow: true,
        dropShadowColor: 0x000000,
        dropShadowDistance: 0,
        dropShadowBlur: 4,
      }),
    );

    title.style.loadFont('/assets/preload/Maplestory Bold.woff2', {
      family: 'Maplestory Bold',
    });

    title.anchor.set(0.5, 0);
    title.position.set(1920 / 2, 48);

    const titleReaction = () => {
      const nextSequence = store.currentSequence;
      // this._preLeftTween.stop();
      // this._leftTween.stop();
      // this._preRightTween.stop();
      // this._rightTween.stop();

      if (nextSequence) {
        let teamText = '';

        if (
          nextSequence.team === 'left' ||
          store.roomState.coinTossTeam === 'left'
        ) {
          const leftTeamName = store.roomState.leftTeam.name;

          teamText = `<span style="color: #4C9ED9">${leftTeamName}</span>${josa.pick(
            leftTeamName,
            '이/가',
          )}`;
        } else if (
          nextSequence.team === 'right' ||
          store.roomState.coinTossTeam === 'right'
        ) {
          const rightTeamName = store.roomState.rightTeam.name;

          teamText = `<span style="color: #E4A832">${rightTeamName}</span>${josa.pick(
            rightTeamName,
            '이/가',
          )}`;
        }

        switch (nextSequence.action) {
          case 'start':
            title.text = '대기 중';
            break;
          case 'ban':
          case 'pick':
            if (nextSequence.action === 'ban') {
              title.text = `${teamText} ${
                (nextSequence.index ?? 0) + 1
              }번째 <span style="color: #ca0000">밴</span>할 직업을 선택 중`;
            } else if (nextSequence.action === 'pick') {
              title.text = `${teamText} ${
                (nextSequence.index ?? 0) + 1
              }번째 직업을 선택 중`;
            }

            // switch (nextSequence?.team) {
            //   case 'left':
            //     this._preLeftTween.chain(this._leftTween).start();
            //     break;
            //   case 'right':
            //     this._preRightTween.chain(this._rightTween).start();
            //     break;
            // }
            break;
          case 'coinToss':
            title.text = '누가 선택할지 결정 중';
            break;
          case 'votePick':
            title.text = '누가 선택할지 결정 중';

            if (!store.isPaused) {
              // if (store.roomState.coinTossTeam === 'left') {
              //   this._preLeftTween.chain(this._leftTween).start();
              // } else {
              //   this._preRightTween.chain(this._rightTween).start();
              // }

              title.text = `${teamText} 선택 중`;
            }

            break;
          // case 'end':
          //   title.text = '종료!';
          //   break;
          default:
            title.text = '';
        }
      } else {
        title.text = '';
      }
    };

    reaction(() => store.nextSequence, titleReaction);
    reaction(() => store.isPaused, titleReaction);

    titleReaction();
  }
}
