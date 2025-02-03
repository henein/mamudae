import { PlatformIcon } from './platform-icon';
import { StreamerImage } from './streamer-image';
import { StreamerId, Streamers } from '@henein/mamudae-lib';
import classNames from 'classnames';

export interface StreamerProfileProps {
  streamerId: StreamerId;
  className?: string;
  size?: number;
}

export const StreamerProfile = (props: StreamerProfileProps) => {
  const streamer = Streamers.find(streamer => streamer.id === props.streamerId) ?? Streamers[0];

  return (
    <div className={classNames('flex flex-col items-center', props.className)}>
      <div className="relative">
        <div className="absolute z-10 flex h-full w-full items-center justify-center rounded-full bg-black-800 opacity-0 transition-opacity hover:opacity-100">
          {streamer.links.map(platformLink =>
            <a
              href={platformLink.link}
              target="_blank"
              rel="noreferrer"
            >
              <PlatformIcon platform={platformLink.platform} />
            </a>
          )}
        </div>
        <StreamerImage
          className="border border-border dark:border-dark-border"
          streamer={streamer}
        />
      </div>
      <p className="mt-1">
        {streamer.nickname}
      </p>
    </div>
  );
};
