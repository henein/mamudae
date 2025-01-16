import { useEffect, useRef } from 'react';
import { engine, isEngineReady, setEngine } from './app/getEngine';
import { LoadScreen } from './app/screens/LoadScreen';
import { MainScreen } from './app/screens/main/main-screen';
import { userSettings } from './app/utils/userSettings';
import { CreationEngine } from './engine/engine';

/**
 * Importing these modules will automatically register there plugins with the engine.
 */
import '@pixi/sound';
import { store } from './app/store/state-store';
import { JobId, RoomState, Team } from '@henein/mamudae-lib';

// import "@esotericsoftware/spine-pixi-v8";

export interface MaplePickProps {
  team?: Team;
  roomState?: RoomState;
  onSelect: (jobId: JobId) => void;
  onPush: (jobId: JobId) => void;
}

export const MaplePick: React.FC<MaplePickProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (isEngineReady()) {
      // engine().addCanvas(ref.current);
      return;
    }

    const e = new CreationEngine();
    setEngine(e);

    (async () => {
      // Initialize the creation engine instance
      await e.init({
        background: '#1E1E1E',
        resizeOptions: { minWidth: 1920, minHeight: 1080, letterbox: false },
      });

      if (ref.current) {
        e.addCanvas(ref.current);
      }

      // Initialize the user settings
      userSettings.init();

      // Show the load screen
      await e.navigation.showScreen(LoadScreen);
      // Show the main screen once the load screen is dismissed
      await e.navigation.showScreen(MainScreen);
    })();

    // return () => {
    //   engine.destroy(true);
    // };
  });

  useEffect(() => {
    if (!props.roomState) {
      return;
    }

    store.updateState(props.roomState, props.team);
  }, [props.roomState, props.team]);

  useEffect(() => {
    store.onSelect = props.onSelect;
    store.onPush = props.onPush;
  }, [props.onPush, props.onSelect]);

  return (
    <div
      style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
      ref={ref}
    />
  );
};

//   this.socket.on(IOEvent.START, (payload: SequencePayload) => {
//     runInAction(() => {
//       this.setCurrentSequence(payload.nextSequence);
//       this.setNextSequence(payload.nextNextSequence);
//     });
//     console.log('start');
//   });
//
//   this.socket.on(IOEvent.BAN_PICK, (payload: SequencePayload) => {
//     if (payload.action === 'opponentPick' && payload.jobId && payload.team) {
//       rootStore.jobStore.onOpponentPick(payload.jobId, payload.team);
//     } else {
//       rootStore.jobStore.moveJob(payload, //jobId);
//     }
//
//     runInAction(() => {
//       this.setCurrentSequence(payload.nextSequence);
//       this.setNextSequence(payload.nextNextSequence);
//     });
//   });
//
//   this.socket.on(IOEvent.SELECT, (payload: SelectPayload) => {
//     this.rootStore.jobStore.onSelect(payload.leftSelect, payload.rightSelect);
//   });
//
//   this.socket.on(IOEvent.END, () => {
//     this.rootStore.jobStore.onEnd();
//     runInAction(() => {
//       this.setCurrentSequence(undefined);
//       this.setNextSequence(undefined);
//     });
//   });
