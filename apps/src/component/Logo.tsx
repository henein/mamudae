import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import useDarkMode from '../hooks/reduxHooks/useDarkMode';

interface LogoProps {
  size?: 'small' | 'large';
}

export const Logo: React.FC<LogoProps> = (props) => {
  const { darkModeState } = useDarkMode();

  return (
    <Container>
      <Image
        src={`/logo-${darkModeState ? 'dark' : 'light'}.svg`}
        alt="logo"
        width={props.size == 'small' ? 144 : 288}
        height={props.size == 'small' ? 40 : 80}
        priority
      />
    </Container>
  );
};

const Container = styled.div`
  .brand {
    fill: ${({ theme }) => theme.brand};
  }

  .text {
    fill: ${({ theme }) => theme.text};
  }
`;
