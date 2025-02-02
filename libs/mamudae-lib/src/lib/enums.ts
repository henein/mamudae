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

export enum Streamer {
  NACHO = '나초',
  TERO = '테로',
  BAEKDOA = '백도아',
  JJANGJJUNG = '짱쭝',
  ISEUTEO = '이스터',
  KONGJU = '콩주',
  YUHIHI = '유히히',
  GYEOMJI = '겸지',
  NAENGIKIM = '냉이킴',
  NAMJIO = '남지오',
  NUSEUNYANG = '누스냥',
  UDEONG = '우덩',
}

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
