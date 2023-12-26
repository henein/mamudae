import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  align?:
    | 'start'
    | 'end'
    | 'left'
    | 'right'
    | 'center'
    | 'justify'
    | 'match-parent';
}

export const TextField: React.FC<TextFieldProps> = ({ register, ...props }) => {
  return <Input {...props} {...register} />;
};

const Input = styled.input<TextFieldProps>`
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  background-color: ${(props) => props.theme.input};
  color: ${(props) => props.theme.text};
  outline: 1px solid ${(props) => props.theme.border};
  outline-offset: -1px;
  border: none;
  text-align: ${(props) => props.align || 'left'};
  transition: all ease-in-out 100ms;

  ::placeholder {
    color: ${(props) => props.theme.subText};
  }

  :focus {
    outline: 2px solid ${(props) => props.theme.brand};
    outline-offset: -2px;
  }

  :hover:enabled {
    box-shadow: 0px 0px 0px 4px inset ${({ theme }) => theme.boxShadow};
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    appearance: none;
  }
`;
