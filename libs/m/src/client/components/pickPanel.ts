import { IReactionDisposer, autorun } from 'mobx';
import { JobId } from '../../common/enums';
import { getJob, Job } from '../../common/jobs';
import { store } from '../store';
import { DetailRoundedRect } from './detailRoundedRect';

type Option = {
  direction?: 'left' | 'right';
  isOpponent?: boolean;
};

export class PickPanel extends PIXI.Container {
  private _job?: Job;
  private _direction: 'left' | 'right';
  private _state: 'default' | 'current' | 'next' | 'blind' | 'done';
  private _currentDisposer?: IReactionDisposer;
  private _currentSprite: PIXI.Sprite;
  private _backgroundAlpha = {
    none: 0,
    current: 0.95,
    next: 0.2,
    done: 0.5,
  };
  background: PIXI.Sprite;
  sprite: PIXI.Sprite;
  title: PIXI.Text;
  shadow: PIXI.Sprite;

  constructor(option: Option = {}) {
    super();

    const { direction = 'left', isOpponent } = option;
    this._direction = direction;

    this._state = 'default';

    const backgroundColor = this.addChild(new PIXI.Graphics());
    backgroundColor.beginFill(0x000000, 0.3);
    backgroundColor.drawRect(0, 0, 396, 120);
    backgroundColor.endFill();

    this.background = this.addChild(
      PIXI.Sprite.from(
        `../assets/ui/${direction == 'left' ? 'leftPickBG' : 'rightPickBG'}.png`
      )
    );

    const graphics = this.addChild(
      new DetailRoundedRect({
        x: 0,
        y: 0,
        width: 396,
        height: 120,
        topRight: direction == 'left' ? 64 : 0,
        topLeft: direction == 'right' ? 64 : 0,
      })
    );
    this.mask = graphics;

    this.sprite = this.addChild(new PIXI.Sprite());
    this._currentSprite = this.addChild(new PIXI.Sprite());

    this.shadow = this.addChild(
      PIXI.Sprite.from(`../assets/ui/${direction}PickShadow.png`)
    );
    this.shadow.visible = false;

    if (isOpponent) {
      const opponentIcon = this.addChild(
        PIXI.Sprite.from(`../assets/ui/${direction}Opponent.png`)
      );
      opponentIcon.anchor.set(0.5);
      opponentIcon.position.set(396 / 2, 120 / 2);
    }

    this.title = this.addChild(
      new PIXI.Text(
        '',
        new PIXI.TextStyle({
          fontFamily: 'MaplestoryOTFLight',
          fontSize: 28,
          fill: '#ffffff',
          dropShadow: true,
          dropShadowColor: '#000000',
          dropShadowDistance: 0,
          dropShadowBlur: 4,
        })
      )
    );
    this.title.anchor.set(direction == 'left' ? 1 : 0, 1);
    this.title.position.set(direction == 'left' ? 396 - 12 : 0 + 12, 120 - 8);

    this.reset();
  }

  reset = () => {
    this._job = undefined;
    this.sprite.texture = PIXI.Texture.EMPTY;
    this._currentSprite.texture = PIXI.Texture.EMPTY;
    this._currentSprite.alpha = 0.5;
    this.title.text = '';
    this.background.alpha = this._backgroundAlpha.none;
    this.sprite.visible = false;
    this._currentSprite.visible = false;
    this.shadow.visible = false;
  };

  applyJob = (sprite: PIXI.Sprite, job?: Job) => {
    if (!job) {
      return;
    }

    sprite.texture = PIXI.Texture.from(`../assets/splashes/${job.id}.png`);
    sprite.scale.set(0.65);
    sprite.scale.x *=
      (this._direction == 'left' && job.reverse) ||
      (this._direction == 'right' && !job.reverse)
        ? -1
        : 1;
    sprite.anchor.set(0.5 + job.offsetX / 1024, 0.5 + job.offsetY / 604);
    sprite.position.set(
      396 / 2 + (this._direction == 'left' ? -76 : 76),
      120 / 2 + 20
    );
  };

  set jobId(value: JobId) {
    this._job = getJob(value);

    if (this._state == 'default') {
      this.background.alpha = this._backgroundAlpha.done;
      this.sprite.visible = true;
      this._currentSprite.visible = false;
      this.title.text = this._job.jobName;
    }

    this.applyJob(this.sprite, this._job);
  }

  get state() {
    return this._state;
  }

  set state(value: 'default' | 'current' | 'next' | 'blind' | 'done') {
    if (this._state == value) {
      return;
    }

    this._state = value;

    if (this._currentDisposer) {
      this._currentDisposer();
    }

    switch (this._state) {
      case 'default':
        if (this._job) {
          this.background.alpha = this._backgroundAlpha.done;
          this.sprite.visible = true;
          this._currentSprite.visible = false;
          this.title.text = this._job.jobName;
          this.shadow.visible = true;
        } else {
          this.background.alpha = this._backgroundAlpha.none;
          this.sprite.visible = false;
          this._currentSprite.visible = false;
          this.title.text = '';
          this.shadow.visible = false;
        }
        break;
      case 'current':
        this.background.alpha = this._backgroundAlpha.current;
        this.sprite.visible = false;
        this._currentSprite.visible = true;
        this._currentSprite.alpha = 0.5;
        this._currentDisposer = autorun(() => {
          const selectJobId =
            this._direction == 'left'
              ? store.jobStore.leftSelect
              : store.jobStore.rightSelect;

          if (!selectJobId) {
            return;
          }

          const selectJob = getJob(selectJobId);

          this.applyJob(this._currentSprite, selectJob);
        });
        this.title.text = '선택 중...';
        this.shadow.visible = true;
        break;
      case 'next':
        this.background.alpha = this._backgroundAlpha.next;
        this.sprite.visible = false;
        this._currentSprite.visible = false;
        this.title.text = '다음 선택';
        this.shadow.visible = false;
        break;
      case 'blind':
        this.background.alpha = this._backgroundAlpha.current;
        this.sprite.visible = false;
        this._currentSprite.visible = false;
        this.title.text = '선택 중...';
        this.shadow.visible = true;
        break;
    }
  }
}
