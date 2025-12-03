import type { FC, HTMLAttributes, ReactNode } from 'react';
import styles from './h2.module.css';

interface IProps extends HTMLAttributes<HTMLHeadingElement>{
  children: ReactNode;
}

export const H2: FC<IProps> = ({ children }) => <h2 className={styles.h2}>{children}</h2>;
