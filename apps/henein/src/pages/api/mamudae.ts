import { ChzzkClient } from 'chzzk';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  isOnAir: boolean;
};

const client = new ChzzkClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const live = await client.live.detail(req.query.chzzkId as string);

  console.log(req.query.chzzkId)
  console.log(live.livePlayback.media);

  res.status(200).json({ isOnAir: live.livePlayback.media.length !== 0 });
}
