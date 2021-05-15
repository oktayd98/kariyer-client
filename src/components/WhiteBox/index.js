import React from 'react';
import Button from '../Button';
import styles from './whitebox.module.scss';

const WhiteBox = ({ title, children }) => {
  return (
    <div className={styles.whitebox}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default WhiteBox;
