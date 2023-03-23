import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { usePrintCode } from "../src/hooks/kakao/usePrintCode";

const KaKao = () => {
  const router = useRouter();
  const code = router.query.code as string;
  const { data, refetch } = usePrintCode({ code });

  useEffect(() => {
    if (!router.isReady) return;
    if (!code) {
      alert("카카오에서 인자코드를 받지 못함");
    } else {
      refetch();
    }
    console.log(data)
  }, [router.isReady, code, data, refetch]);

  return (
    <div>
      {code && <p>Kakao authorization code: {code}</p>}
      {!code && <p>Kakao authorization code not found.</p>}
      인자코드를 받았어요!! 서버에게 인자코드를 주면 돼요!!
    </div>
  );
};

export default KaKao;
