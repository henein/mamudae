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

export const TextField: React.FC<TextFieldProps> = ({
  register,
  placeholder,
  ...props
}) => {
  const [isEmpty, setIsEmpty] = React.useState(true);

  return (
    <Container>
      <Label isEmpty={isEmpty}>{placeholder}</Label>
      <Input
        {...props}
        {...register}
        onChange={(event) => {
          setIsEmpty(event.target.value === '');
          register?.onChange(event);
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Label = styled.label<{ isEmpty: boolean }>`
  position: absolute;
  top: ${(props) => (props.isEmpty ? '10px' : '-10px')};
  font-size: 14px;
  color: ${(props) => props.theme.subText};
  margin-left: 14px;
  padding: 2px;
  border-radius: 2px;
  background-color: ${({ theme, ...props }) =>
    props.isEmpty ? 'transparent' : theme.card};
  transition: all ease-in-out 100ms;
  pointer-events: none;
  user-select: none;
`;

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
