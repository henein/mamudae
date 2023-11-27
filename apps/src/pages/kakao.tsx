import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { usePrintCode } from "../hooks/kakao/usePrintCode";

const KaKao = () => {
  const router = useRouter();
  const code = router.query.code as string;
  const { receivePrintCode } = usePrintCode({ code });

  useEffect(() => {
    if (!router.isReady) return;
    if (!code) {
      alert("카카오에서 인자코드를 받지 못함");
    } else {
      receivePrintCode();
    }
  }, [router.isReady, code, receivePrintCode]);

  return (
    <div>
      {code && <p>Kakao authorization code: {code}</p>}
      {!code && <p>Kakao authorization code not found.</p>}
      인자코드를 받았어요!! 서버에게 인자코드를 주면 돼요!!
    </div>
  );
};

export default KaKao;
