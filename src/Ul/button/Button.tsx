import { FC, ReactNode } from 'react';
import scss from './Button.module.scss';

export const Button: FC<{
  onClick: () => void;
  children: ReactNode;
}> = ({onClick, children}) => {
  return <button className={scss.buttons} onClick={onClick}>{children}</button>
}
