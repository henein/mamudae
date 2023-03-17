import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect } from "react";

const KaKao = () => {
  const router = useRouter();
  const { code }: ParsedUrlQuery = router.query;

  // 인자코드 넘기는 API refetch로 react-query 실행하면 될듯?
  // const givePrintCode = () => {};
  // useMutation


  useEffect(() => {
    if (!router.isReady) return;
    if (!code) {
      alert("카카오에서 인자코드를 받지 못함");
    } else {
      // givePrintCode();
    }
  }, [router.isReady, code]);

  return (
    <div>
      {code && <p>Kakao authorization code: {code}</p>}
      {!code && <p>Kakao authorization code not found.</p>}
      인자코드를 받았어요!! 서버에게 인자코드를 주면 돼요!!
    </div>
  );
};

export default KaKao;
