import React, { PropsWithChildren } from 'react';

export interface ButtonProps {
  onClick?: () => void;
}

export const Button = (props: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className="px-3 py-2 border rounded-md border-gray-400 hover:border-orange-400"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
