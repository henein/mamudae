// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - This is a dynamically generated file by AssetPack
import manifest from '../manifest.json';
import { CreationAudioPlugin } from './audio/AudioPlugin';
import { BGM, SFX } from './audio/audio';
import { CreationNavigationPlugin } from './navigation/NavigationPlugin';
import { Navigation } from './navigation/navigation';
import { CreationResizePlugin } from './resize/ResizePlugin';
import { getResolution } from './utils/getResolution';
import { sound } from '@pixi/sound';
import '../spine';
import {
  Application,
  Assets,
  extensions,
  IApplicationOptions,
  IDestroyOptions,
  ResizePlugin,
} from 'pixi.js';

extensions.remove(ResizePlugin);
extensions.add(CreationResizePlugin);
extensions.add(CreationAudioPlugin);
extensions.add(CreationNavigationPlugin);

/**
 * The main creation engine class.
 *
 * This is a lightweight wrapper around the PixiJS Application class.
 * It provides a few additional features such as:
 * - Navigation manager
 * - Audio manager
 * - Resize handling
 * - Visibility change handling (pause/resume sounds)
 *
 * It also initializes the PixiJS application and loads any assets in the `preload` bundle.
 */
export class CreationEngine extends Application {
  navigation!: Navigation;

  audio!: {
    bgm: BGM;
    sfx: SFX;
    getMasterVolume: () => number;
    setMasterVolume: (volume: number) => void;
  };

  /** Initialize the application */
  constructor(opts: Partial<IApplicationOptions>) {
    opts.resizeTo ??= window;
    opts.resolution ??= getResolution();

    super(opts);

    this.init();
  }

  private async init() {
    // // Append the application canvas to the document body
    // document.getElementById("pixi-container")!.appendChild(this.canvas);
    // Add a visibility listener, so the app can pause sounds and screens
    document.addEventListener('visibilitychange', this.visibilityChange);

    // Init PixiJS assets with this asset manifest
    await Assets.init({ manifest, basePath: '/assets' });
    await Assets.loadBundle('preload');

    await Assets.load('/spine/4/skeleton.json');
    await Assets.load('/spine/5/skeleton.json');
    await Assets.load('/spine/6/skeleton.json');
    await Assets.load('/spine/7/skeleton.json');
    await Assets.load('/spine/8/skeleton.json');
    await Assets.load('/spine/9/skeleton.json');
    await Assets.load('/spine/10/skeleton.json');
    await Assets.load('/spine/11/skeleton.json');
    await Assets.load('/spine/12/skeleton.json');
    await Assets.load('/spine/13/skeleton.json');
    await Assets.load('/spine/14/skeleton.json');
    await Assets.load('/spine/15/skeleton.json');
    // await Assets.load('/spine/16/skeleton.json');
    await Assets.load('/spine/17/skeleton.json');
    await Assets.load('/spine/18/skeleton.json');
    await Assets.load('/spine/19/skeleton.json');
    await Assets.load('/spine/20/skeleton.json');
    await Assets.load('/spine/21/skeleton.json');
    await Assets.load('/spine/22/skeleton.json');
    await Assets.load('/spine/23/skeleton.json');
    await Assets.load('/spine/24/skeleton.json');
    await Assets.load('/spine/25/skeleton.json');
    await Assets.load('/spine/26/skeleton.json');
    await Assets.load('/spine/27/skeleton.json');
    await Assets.load('/spine/28/skeleton.json');
    // List all existing bundles names
    const allBundles = manifest.bundles.map((item: any) => item.name);
    // Start up background loading of all bundles
    Assets.backgroundLoadBundle(allBundles);
  }

  public addCanvas(element: HTMLElement): void {
    element.appendChild(this.view as HTMLCanvasElement);
  }

  public override destroy(
    removeView = false,
    stageOptions: IDestroyOptions | boolean = false,
  ): void {
    document.removeEventListener('visibilitychange', this.visibilityChange);
    super.destroy(removeView, stageOptions);
  }

  /** Fire when document visibility changes - lose or regain focus */
  protected visibilityChange = () => {
    if (document.hidden) {
      sound.pauseAll();
      // this.navigation.blur();
    } else {
      sound.resumeAll();
      // this.navigation.focus();
    }
  };
}
