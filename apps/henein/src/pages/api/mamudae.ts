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
  if (req.query.chzzkId) {
    const live = await client.live.detail(req.query.chzzkId as string);

    return res
      .status(200)
      .json({ isOnAir: live.livePlayback.media.length !== 0 });
  } else if (req.query.soopId) {
    const soopRes = await fetch(
      `https://chapi.sooplive.co.kr/api/${req.query.soopId as string}/station`,
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
        },
      },
    );
    const station = await soopRes.json();

    return res.status(200).json({ isOnAir: station.broad ? true : false });
  }

  return res.status(400).end();
}
