import { pl } from 'date-fns/locale';
export enum JobId {
  NULL = 0,
  BEGINNER = 1,
  HERO,
  PALADIN,
  DARK_KNIGHT,
  ARCH_MAGE_FIRE_POISON,
  ARCH_MAGE_ICE_LIGHTNING,
  BISHOP,
  BOWMASTER,
  MARKSMAN,
  PATHFINDER,
  NIGHT_LORD,
  SHADOWER,
  DUAL_BLADE,
  BUCCANEER,
  CORSAIR,
  CANNONEER,
  DAWN_WARRIOR,
  MIHILE,
  BLAZE_WIZARD,
  WIND_ARCHER,
  NIGHT_WALKER,
  THUNDER_BREAKER,
  BLASTER,
  BATTLE_MAGE,
  WILD_HUNTER,
  MECHANIC,
  XENON,
  DEMON_SLAYER,
  DEMON_AVENGER,
  ARAN,
  EVAN,
  LUMINOUS,
  MERCEDES,
  PHANTOM,
  SHADE,
  KAISER,
  CADENA,
  ANGELIC_BUSTER,
  ADELE,
  ILLIUM,
  ARK,
  HOYOUNG,
  ZERO,
  KINESIS,
  KAIN,
  LARA,
  KHALI,
  JOB_MAXIMIM,
}

export type Team = 'left' | 'right';

// 나초, 테로, 백도아, 짱쭝, 이스터, 콩주, 유히히, 겸지, 냉이킴, 남지오, 누스냥, 우덩

//Nacho, tero, baekdoa, jjangjjung, iseuteo, kongju, yuhihi, gyeomji, naengikim, namjio, nuseunyang, udeong

export enum StreamerId {
  NACHO = 'nacho',
  TERO = 'tero',
  BAEKDOA = 'baekdoa',
  JJANGJJUNG = 'jjangjjung',
  ISEUTEO = 'iseuteo',
  KONGJU = 'kongju',
  YUHIHI = 'yuhihi',
  GYEOMJI = 'gyeomji',
  NAENGIKIM = 'naengikim',
  NAMJIO = 'namjio',
  NUSEUNYANG = 'nuseunyang',
  UDEONG = 'udeong',
}

export type StreamerPlatform = 'soop' | 'youtube' | 'chzzk';

export type StreamerPlatformLink = {
  platform: StreamerPlatform;
  link: string;
}

export type Streamer = {
  id: StreamerId;
  nickname: string;
  links: StreamerPlatformLink[];
};

export const Streamers: Streamer[] = [
  {
    id: StreamerId.NACHO,
    nickname: '나초',
    links: [
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@nanna_nacho',
      },
      {
        platform: 'chzzk',
        link: 'https://chzzk.naver.com/99704cbd2709e80c7f30276d8bd0994f',
      },
    ],
  },
  {
    id: StreamerId.TERO,
    nickname: '테로',
    links: [
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@Tero_'
      },
      {
        platform: 'chzzk',
        link: 'https://chzzk.naver.com/242b983916affb5ba4c9aa7765e11782'
      }
    ],
  },
  {
    id: StreamerId.BAEKDOA,
    nickname: '백도아',
    links: [
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@%EB%B0%B1%EB%8F%84%EC%95%84'
      },
      {
        platform: 'chzzk',
        link: 'https://chzzk.naver.com/f9efec5bd77dd0ea0a9c307057038348'
      }
    ],
  },
  {
    id: StreamerId.JJANGJJUNG,
    nickname: '짱쭝',
    links: [
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@WkdWnd'
      },
      {
        platform: 'chzzk',
        link: 'https://chzzk.naver.com/8fccc905e1d86062a6865519dbb85b81'
      }
    ],
  },
  {
    id: StreamerId.ISEUTEO,
    nickname: '이스터',
    links: [
      {
        platform: 'soop',
        link: 'https://ch.sooplive.co.kr/easter0404'
      },
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@%EC%9D%B4%EC%8A%A4%ED%84%B0%EC%9C%A0%ED%8A%9C%EB%B8%8C'
      }
    ],
  },
  {
    id: StreamerId.KONGJU,
    nickname: '콩주',
    links: [
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@kong_ovo'
      },
      {
        platform: 'chzzk',
        link: 'https://chzzk.naver.com/58c857c619dbc62110f025c382265abe'
      }
    ],
  },
  {
    id: StreamerId.YUHIHI,
    nickname: '유히히',
    links: [
      {
        platform: 'soop',
        link: 'https://ch.sooplive.co.kr/qqaa0810'
      },
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@%EC%9C%A0%ED%9E%88%ED%9E%88'
      },
      {
        platform: 'chzzk',
        link: 'https://chzzk.naver.com/23a96c7728efd75092e69befd8d3630d'
      }
    ],
  },
  {
    id: StreamerId.GYEOMJI,
    nickname: '겸지',
    links: [
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@cuteji'
      },
      {
        platform: 'chzzk',
        link: 'https://chzzk.naver.com/90805db274df92aa07b385c3ef6c8e5f'
      }
    ],
  },
  {
    id: StreamerId.NAENGIKIM,
    nickname: '냉이킴',
    links: [
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@%EB%83%89%EC%9D%B4%ED%82%B4'
      },
      {
        platform: 'chzzk',
        link: 'https://chzzk.naver.com/d90ed65ecb9c7231708a166362aaa247'
      }
    ],
  },
  {
    id: StreamerId.NAMJIO,
    nickname: '남지오',
    links: [
      {
        platform: 'soop',
        link: 'https://ch.sooplive.co.kr/tmfrl4597'
      },
    ],
  },
  {
    id: StreamerId.NUSEUNYANG,
    nickname: '누스냥',
    links: [
      {
        platform: 'soop',
        link: 'https://ch.sooplive.co.kr/nusnyang'
      },
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@%EB%88%84%EC%8A%A4%EB%83%A5'
      },
      {
        platform: 'chzzk',
        link: 'https://chzzk.naver.com/1c0e0d1416a2b1fe69534f168f982d58'
      }
    ],
  },
  {
    id: StreamerId.UDEONG,
    nickname: '우덩',
    links: [
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@udeong'
      }
    ],
  },
]

export enum BossId {
  ZAKUM = 'zakum',
  HORNTAIL = 'horntail',
  HILLA = 'hilla',
  PIERRE = 'pierre',
  VONBON = 'vonbon',
  BLOODY_QUEEN = 'bloody-queen',
  VELLUM = 'vellum',
  VON_LEON = 'von-leon',
  ARKARIUM = 'arkarium',
  MAGNUS = 'magnus',
  PINKBEAN = 'pinkbean',
  CYGNUS = 'cygnus',
  SWOO = 'swoo',
  DAMIEN = 'damien',
  LUCID = 'lucid',
  KAUNG = 'kaung',
  PAPULATUS = 'papulatus',
  WILL = 'will',
  VERUS_HILLA = 'verus-hilla',
  BLACK_MAGE = 'black-mage',
  DUSK = 'dusk',
  DARKNELL = 'darknell',
  GUARDIAN_ANGEL_SLIME = 'guardian-angel-slime',
}

export type BossDifficulty = 'easy' | 'normal' | 'hard' | 'chaos';

export type Boss = {
  id: BossId;
  name: string;
  difficulties: BossDifficulty[];
};

export const Bosses: Boss[] = [
  {
    id: BossId.ZAKUM,
    name: '자쿰',
    difficulties: ['easy', 'normal', 'chaos'],
  },
  {
    id: BossId.HORNTAIL,
    name: '혼테일',
    difficulties: ['easy', 'normal', 'chaos'],
  },
  {
    id: BossId.HILLA,
    name: '힐라',
    difficulties: ['normal', 'hard'],
  },
  {
    id: BossId.PIERRE,
    name: '피에르',
    difficulties: ['normal', 'chaos'],
  },
  {
    id: BossId.VONBON,
    name: '반반',
    difficulties: ['normal', 'chaos'],
  },
  {
    id: BossId.BLOODY_QUEEN,
    name: '블러디퀸',
    difficulties: ['normal', 'chaos'],
  },
  {
    id: BossId.VELLUM,
    name: '벨룸',
    difficulties: ['normal', 'chaos'],
  },
  {
    id: BossId.VON_LEON,
    name: '반 레온',
    difficulties: ['easy', 'normal', 'hard'],
  },
  {
    id: BossId.ARKARIUM,
    name: '아카이럼',
    difficulties: ['easy', 'normal'],
  },
  {
    id: BossId.MAGNUS,
    name: '매그너스',
    difficulties: ['easy', 'normal', 'hard'],
  },
  {
    id: BossId.PINKBEAN,
    name: '핑크빈',
    difficulties: ['normal', 'chaos'],
  },
  {
    id: BossId.CYGNUS,
    name: '시그너스',
    difficulties: ['easy', 'normal'],
  },
  {
    id: BossId.SWOO,
    name: '스우',
    difficulties: ['normal', 'hard'],
  },
  {
    id: BossId.DAMIEN,
    name: '데미안',
    difficulties: ['normal', 'hard'],
  },
  {
    id: BossId.LUCID,
    name: '루시드',
    difficulties: ['easy', 'normal', 'hard'],
  },
  {
    id: BossId.KAUNG,
    name: '카웅',
    difficulties: ['normal'],
  },
  {
    id: BossId.PAPULATUS,
    name: '파풀라투스',
    difficulties: ['easy', 'normal', 'chaos'],
  },
  {
    id: BossId.WILL,
    name: '윌',
    difficulties: ['easy', 'normal', 'hard'],
  },
  {
    id: BossId.VERUS_HILLA,
    name: '진 힐라',
    difficulties: ['normal', 'hard'],
  },
  {
    id: BossId.BLACK_MAGE,
    name: '검은 마법사',
    difficulties: ['hard'],
  },
  {
    id: BossId.DUSK,
    name: '더스크',
    difficulties: ['normal', 'chaos'],
  },
  {
    id: BossId.DARKNELL,
    name: '듄켈',
    difficulties: ['normal', 'hard'],
  },
  {
    id: BossId.GUARDIAN_ANGEL_SLIME,
    name: '가디언 엔젤 슬라임',
    difficulties: ['normal', 'hard'],
  },
];
