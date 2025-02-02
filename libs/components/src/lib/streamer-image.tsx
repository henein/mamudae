import { Streamer } from '@henein/mamudae-lib';
import classNames from 'classnames';

export interface StreamerImageProps {
  streamer: Streamer;
  className?: string;
  size?: number;
}

export const StreamerImage = (props: StreamerImageProps) => {
  const nickname = Object.keys(Streamer)[Object.values(Streamer).indexOf(props.streamer)].toLowerCase();

  return (
    <img
      className={classNames(
        'rounded-full',
        props.className,
      )}
      src={`/images/mamudae/profile/${nickname}.png`}
      alt={props.streamer}
      width={props.size || 160}
      height={props.size || 160}
    />
  );
};
