import { StreamerImage } from '@henein/components';

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl leading-6">
      <h2 className="text-3xl font-bold">참여자</h2>
      <StreamerImage streamer="나초" />
      <h2 className="text-3xl font-bold">규정</h2>
      <h3 className="text-2xl">시청자 지원 가능</h3>
      <ul className="list-inside list-disc">
        <li>
          각 팀별 길드 주간 미션 포인트 / 지하 수로 / 플래그 레이스 지원 가능
        </li>
      </ul>
      <h3 className="mt-4 text-2xl">시청자 지원 금지</h3>
      <ul className="list-inside list-disc">
        <li>시청자 지원 금지 상하차 등 사냥 관련 지원 금지</li>
        <li>
          이하 금지 직업 및 스킬 (사냥에 영향을 주는 모든 스킬)
          <ul className="ml-4 list-inside list-disc">
            <li>나이트로드 - 쇼다운 챌린지, 쇼다운 챌린지 : 인핸스</li>
            <li>데몬슬레이어 - 데빌 크라이</li>
            <li>배틀메이지 - 디버프 오라 : 인핸스</li>
            <li>소울마스터 - 트루 사이트, 트루 사이트 : 인핸스</li>
            <li>은월 - 파쇄철조 류</li>
            <li>키네시스 - 싸이킥 포스 류</li>
            <li>사냥 시 시청자와 파티 금지</li>
          </ul>
        </li>
      </ul>
      <h3 className="mt-4 text-2xl">가능 규정</h3>
      <ul className="list-inside list-disc">
        <li>
          링크 캐릭터로 사냥 가능
          <ul className="ml-4 list-inside list-disc">
            <li>
              단, 본 게임 진행 이후 가능하며, 기존의 아이템들은 모두 버리고난 뒤
              진행 가능
            </li>
            <li>
              본 게임 진행하며 생긴 마일리지 또는 메소로 슬롯 증설 후 추가
              캐릭터 육성 가능
            </li>
          </ul>
        </li>
        <li>
          메이플 옥션 (경매장) 사용 가능
          <ul className="ml-4 list-inside list-disc">
            <li>
              단, 12시간 이내로 남은 아이템만 구매 가능 (시청자의 헐값 판매
              아이템 구매 방지)
            </li>
          </ul>
        </li>
      </ul>
      <h3 className="mt-4 text-2xl">금지 규정</h3>
      <ul className="list-inside list-disc">
        <li>PC방 금지</li>
        <li>
          시청자의 지원 금지
          <ul className="ml-4 list-inside list-disc">
            <li>
              단, 기상 효과 아이템 뿌리기, 코디 아이템(외형 프리셋 적용)은 가능
            </li>
          </ul>
        </li>
        <li>대리 금지</li>
        <li>
          현질 및 MVP 보상 수령 금지
          <ul className="ml-4 list-inside list-disc">
            <li>
              단, 코디 아이템 구매는 가능. MVP 등급이 올라가지 않는 선에서 가능
            </li>
          </ul>
        </li>
        <li>자유 전직 및 직업 중복 금지</li>
        <li>메이플스토리M 유니온 점령 금지</li>
      </ul>
    </div>
  );
}
