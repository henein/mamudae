import { JobId } from './enums';

export interface Job {
  id: JobId;
  jobName: string;
  className: string;
  branchName: string;
  background: number;
  globalBan?: boolean;
  offsetX: number;
  offsetY: number;
  reverse?: boolean;
  spine?: number;
}

export const getJob = (jobId: JobId) => {
  return JobList.find((job) => job.id === jobId) ?? JobList[0];
};

export const JobList: Job[] = [
  // {
  //   id: JobId.BEGINNER,
  //   jobName: '초보자',
  //   className: '모험가',
  //   branchName: '초보자',
  //   background: 3,
  //   globalBan: true,
  //   offsetX: 0,
  //   offsetY: 0,
  // },
  {
    id: JobId.HERO,
    jobName: '히어로',
    className: '모험가',
    branchName: '전사',
    background: 1,
    offsetX: 0,
    offsetY: -20,
  },
  {
    id: JobId.PALADIN,
    jobName: '팔라딘',
    className: '모험가',
    branchName: '전사',
    background: 1,
    offsetX: 0,
    offsetY: -20,
  },
  {
    id: JobId.DARK_KNIGHT,
    jobName: '다크나이트',
    className: '모험가',
    branchName: '전사',
    background: 1,
    offsetX: 0,
    offsetY: -20,
  },
  {
    id: JobId.ARCH_MAGE_FIRE_POISON,
    jobName: '아크메이지(불,독)',
    className: '모험가',
    branchName: '마법사',
    background: 2,
    offsetX: +28,
    offsetY: -20,
  },
  {
    id: JobId.ARCH_MAGE_ICE_LIGHTNING,
    jobName: '아크메이지(썬,콜)',
    className: '모험가',
    branchName: '마법사',
    background: 2,
    offsetX: +20,
    offsetY: -20,
  },
  {
    id: JobId.BISHOP,
    jobName: '비숍',
    className: '모험가',
    branchName: '마법사',
    background: 2,
    offsetX: 10,
    offsetY: -20,
  },
  {
    id: JobId.BOWMASTER,
    jobName: '보우마스터',
    className: '모험가',
    branchName: '궁수',
    background: 3,
    offsetX: 0,
    offsetY: -20,
  },
  {
    id: JobId.MARKSMAN,
    jobName: '신궁',
    className: '모험가',
    branchName: '궁수',
    background: 3,
    offsetX: 0,
    offsetY: -20,
  },
  {
    id: JobId.PATHFINDER,
    jobName: '패스파인더',
    className: '모험가',
    branchName: '궁수',
    background: 4,
    offsetX: +40,
    offsetY: 0,
    spine: 22,
  },
  {
    id: JobId.NIGHT_LORD,
    jobName: '나이트로드',
    className: '모험가',
    branchName: '도적',
    background: 5,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: JobId.SHADOWER,
    jobName: '섀도어',
    className: '모험가',
    branchName: '도적',
    background: 5,
    offsetX: -24,
    offsetY: -20,
  },
  {
    id: JobId.DUAL_BLADE,
    jobName: '듀얼블레이드',
    className: '모험가',
    branchName: '도적',
    background: 6,
    offsetX: -60,
    offsetY: 0,
    spine: 8,
  },
  {
    id: JobId.BUCCANEER,
    jobName: '바이퍼',
    className: '모험가',
    branchName: '해적',
    background: 7,
    offsetX: -40,
    offsetY: 0,
  },
  {
    id: JobId.CORSAIR,
    jobName: '캡틴',
    className: '모험가',
    branchName: '해적',
    background: 7,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: JobId.CANNONEER,
    jobName: '캐논슈터',
    className: '모험가',
    branchName: '해적',
    background: 7,
    offsetX: +28,
    offsetY: 0,
    reverse: true,
    spine: 13,
  },
  {
    id: JobId.DAWN_WARRIOR,
    jobName: '소울마스터',
    className: '시그너스 기사단',
    branchName: '전사',
    background: 8,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: JobId.MIHILE,
    jobName: '미하일',
    className: '시그너스 기사단',
    branchName: '전사',
    background: 8,
    offsetX: -56,
    offsetY: 0,
    spine: 9,
  },
  {
    id: JobId.BLAZE_WIZARD,
    jobName: '플레임위자드',
    className: '시그너스 기사단',
    branchName: '마법사',
    background: 8,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: JobId.WIND_ARCHER,
    jobName: '윈드브레이커',
    className: '시그너스 기사단',
    branchName: '궁수',
    background: 8,
    offsetX: -8,
    offsetY: 0,
  },
  {
    id: JobId.NIGHT_WALKER,
    jobName: '나이트워커',
    className: '시그너스 기사단',
    branchName: '도적',
    background: 8,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: JobId.THUNDER_BREAKER,
    jobName: '스트라이커',
    className: '시그너스 기사단',
    branchName: '해적',
    background: 8,
    offsetX: -40,
    offsetY: 0,
  },
  {
    id: JobId.BLASTER,
    jobName: '블래스터',
    className: '레지스탕스',
    branchName: '전사',
    background: 9,
    offsetX: -52,
    offsetY: 0,
  },
  {
    id: JobId.BATTLE_MAGE,
    jobName: '배틀메이지',
    className: '레지스탕스',
    branchName: '마법사',
    background: 9,
    offsetX: -24,
    offsetY: 0,
  },
  {
    id: JobId.WILD_HUNTER,
    jobName: '와일드헌터',
    className: '레지스탕스',
    branchName: '궁수',
    background: 9,
    offsetX: -20,
    offsetY: 0,
  },
  {
    id: JobId.MECHANIC,
    jobName: '메카닉',
    className: '레지스탕스',
    branchName: '해적',
    background: 9,
    offsetX: -44,
    offsetY: 0,
  },
  {
    id: JobId.XENON,
    jobName: '제논',
    className: '레지스탕스',
    branchName: '도적/해적',
    background: 10,
    offsetX: -64,
    offsetY: 0,
    spine: 14,
  },
  {
    id: JobId.DEMON_SLAYER,
    jobName: '데몬슬레이어',
    className: '레지스탕스',
    branchName: '전사',
    background: 11,
    offsetX: +40,
    offsetY: 0,
    reverse: true,
  },
  {
    id: JobId.DEMON_AVENGER,
    jobName: '데몬어벤져',
    className: '레지스탕스',
    branchName: '전사',
    background: 11,
    offsetX: -84,
    offsetY: 0,
  },
  {
    id: JobId.ARAN,
    jobName: '아란',
    className: '영웅',
    branchName: '전사',
    background: 12,
    offsetX: -16,
    offsetY: 0,
    // spine: 3,
  },
  {
    id: JobId.EVAN,
    jobName: '에반',
    className: '영웅',
    branchName: '마법사',
    background: 13,
    offsetX: +24,
    offsetY: 0,
    reverse: true,
    spine: 4,
  },
  {
    id: JobId.LUMINOUS,
    jobName: '루미너스',
    className: '영웅',
    branchName: '마법사',
    background: 14,
    offsetX: -4,
    offsetY: 0,
    spine: 10,
  },
  {
    id: JobId.MERCEDES,
    jobName: '메르세데스',
    className: '영웅',
    branchName: '궁수',
    background: 15,
    offsetX: +36,
    offsetY: 0,
    reverse: true,
    spine: 5,
  },
  {
    id: JobId.PHANTOM,
    jobName: '팬텀',
    className: '영웅',
    branchName: '도적',
    background: 16,
    offsetX: -24,
    offsetY: 0,
    reverse: true,
    spine: 7,
  },
  {
    id: JobId.SHADE,
    jobName: '은월',
    className: '영웅',
    branchName: '해적',
    background: 17,
    offsetX: 0,
    offsetY: -20,
    // spine: 16,
  },
  {
    id: JobId.KAISER,
    jobName: '카이저',
    className: '노바',
    branchName: '전사',
    background: 18,
    offsetX: -56,
    offsetY: 0,
    reverse: true,
    spine: 11,
  },
  {
    id: JobId.CADENA,
    jobName: '카데나',
    className: '노바',
    branchName: '도적',
    background: 19,
    offsetX: -28,
    offsetY: 0,
    reverse: true,
    spine: 19,
  },
  {
    id: JobId.ANGELIC_BUSTER,
    jobName: '엔젤릭버스터',
    className: '노바',
    branchName: '해적',
    background: 20,
    offsetX: 40,
    offsetY: 0,
    spine: 12,
  },
  {
    id: JobId.ADELE,
    jobName: '아델',
    className: '레프',
    branchName: '전사',
    background: 21,
    offsetX: -12,
    offsetY: 0,
    spine: 24
  },
  {
    id: JobId.ILLIUM,
    jobName: '일리움',
    className: '레프',
    branchName: '마법사',
    background: 22,
    offsetX: +56,
    offsetY: 0,
    reverse: true,
    spine: 20,
  },
  {
    id: JobId.KAIN,
    jobName: '카인',
    className: '노바',
    branchName: '궁수',
    background: 27,
    offsetX: 0,
    offsetY: 0,
    spine: 25
  },
  {
    id: JobId.KHALI,
    jobName: '칼리',
    className: '레프',
    branchName: '도적',
    background: 29,
    offsetX: 0,
    offsetY: 0,
    spine: 28
  },
  {
    id: JobId.ARK,
    jobName: '아크',
    className: '레프',
    branchName: '해적',
    background: 23,
    offsetX: +36,
    offsetY: 0,
    spine: 21,
  },
  {
    id: JobId.LARA,
    jobName: '라라',
    className: '아니마',
    branchName: '마법사',
    background: 28,
    offsetX: 20,
    offsetY: 0,
    spine: 27
  },
  {
    id: JobId.HOYOUNG,
    jobName: '호영',
    className: '아니마',
    branchName: '도적',
    background: 24,
    offsetX: -52,
    offsetY: 0,
    spine: 23
  },
  {
    id: JobId.ZERO,
    jobName: '제로',
    className: '제로',
    branchName: '전사',
    background: 25,
    offsetX: 0,
    offsetY: 0,
    spine: 15,
  },
  {
    id: JobId.KINESIS,
    jobName: '키네시스',
    className: '키네시스',
    branchName: '마법사',
    background: 26,
    offsetX: -40,
    offsetY: 0,
    spine: 18,
  },
];
