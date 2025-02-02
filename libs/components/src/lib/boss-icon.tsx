import { BossId } from '@henein/mamudae-lib';
import Image from 'next/image';

export interface BossIconProps {
  bossId: BossId;
  size?: number;
  // difficulty: 'easy' | 'normal' | 'hard' | 'chaos';
}

export const BossIcon = (props: BossIconProps) => {
  return (
    <Image
        src={`/images/mamudae/boss-icon/${props.bossId}.png`}
        alt=""
        width={props.size ?? 40}
        height={props.size ?? 40}
      />
  );
};
