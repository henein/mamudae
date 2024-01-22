import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import LoadingSpinner from "../component/LoadingSpinner";
import { usePrintCode } from "../hooks/kakao/usePrintCode";

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
      <LoadingSpinner width={48} height={48} borderWidth={4} />
    </Container>
  );
};

export default KaKao;

const Container = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
