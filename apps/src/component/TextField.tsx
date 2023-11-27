import React, { HtmlHTMLAttributes } from 'react';
import styled from 'styled-components';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const TextField: React.FC<TextFieldProps> = (props) => {
  return <Input {...props} />;
};

const Input = styled.input`
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  background-color: ${(props) => props.theme.input};
  color: ${(props) => props.theme.text};
  outline: 1px solid ${(props) => props.theme.border};
  outline-offset: -1px;
  border: none;
  transition: all ease-in-out 100ms;

  ::placeholder {
    color: ${(props) => props.theme.subText};
  }

  :focus {
    outline: 2px solid ${(props) => props.theme.brand};
    outline-offset: -2px;
  }

  :hover {
    box-shadow: 0px 0px 0px 4px inset ${({ theme }) => theme.boxShadow};
  }
`;
