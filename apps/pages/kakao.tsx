import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import LoadingSpinner from "../src/component/LoadingSpinner";
import { usePrintCode } from "../src/hooks/kakao/usePrintCode";

const KaKao = () => {
  const router = useRouter();
  const code = router.query.code as string;
  const { receivePrintCode } = usePrintCode({ code });

  useEffect(() => {
    if (!router.isReady) return;
    if (!code) {
      return;
    } else {
      receivePrintCode();
    }
  }, [router.isReady, code, receivePrintCode]);

  return (
    <Container>
      <LoadingSpinner width={130} height={130} borderWidth={6} />
    </Container>
  );
};

export default KaKao;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
