import React from 'react';
import Typography from './typography';
import classNames from 'classnames';

export interface NavigationItemProps extends React.PropsWithChildren {
  isSelect?: boolean;
  isWIP?: boolean;
}

export const NavigationItem = (props: NavigationItemProps) => {
  return (
    <div className="flex flex-col justify-center box-border no-underline h-10 px-4 rounded-lg cursor-pointer transition-all hover:bg-black-25 dark:hover:bg-white-50 hover:font-semibold hover:inset-ring inset-ring-border dark:inset-ring-dark-border">
      <Typography
        className={classNames('text-base', {
          'font-semibold': props.isSelect,
        })}
      >
        {props.children}
      </Typography>
    </div>
  );
};
