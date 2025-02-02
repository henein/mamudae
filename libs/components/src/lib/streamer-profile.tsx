import { PlatformIcon } from './platform-icon';
import { StreamerImage } from './streamer-image';
import { Streamer } from '@henein/mamudae-lib';
import classNames from 'classnames';

export interface StreamerProfileProps {
  streamer: Streamer;
  className?: string;
  size?: number;
}

export const StreamerProfile = (props: StreamerProfileProps) => {
  return (
    <div className={classNames('flex flex-col items-center', props.className)}>
      <div className="relative">
        <div className="absolute z-10 flex h-full w-full items-center justify-center rounded-full bg-black-800 opacity-0 transition-opacity hover:opacity-100">
          {props.streamer === Streamer.NACHO && (
            <>
              <a
                href="https://www.youtube.com/@nanna_nacho"
                target="_blank"
                rel="noreferrer"
              >
                <PlatformIcon platform="youtube" />
              </a>
              <a
                href="https://chzzk.naver.com/99704cbd2709e80c7f30276d8bd0994f"
                target="_blank"
                rel="noreferrer"
              >
                <PlatformIcon platform="chzzk" />
              </a>
            </>
          )}
        </div>
        <StreamerImage
          className="border border-border dark:border-dark-border"
          streamer={props.streamer}
        />
      </div>
      <p className="mt-1">{props.streamer}</p>
    </div>
  );
};
