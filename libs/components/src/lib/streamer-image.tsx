import { Streamer } from '@henein/mamudae-lib';
import { romanize } from 'es-hangul';
import Image from 'next/image';

export interface StreamerImageProps {
  streamer: Streamer;
  width?: number;
  height?: number;
}

export const StreamerImage = (props: StreamerImageProps) => {
  return (
    <Image
      className="rounded-full border border-border dark:border-dark-border"
      src={`/images/mamudae/profile/${romanize(props.streamer)}.png`}
      alt={props.streamer}
      width={props.width || 160}
      height={props.height || 160}
    />
  );
};
