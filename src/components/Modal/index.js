import React, { useState } from 'react';
import cn from 'classnames';
import styles from './modal.module.scss';
import Button from '../Button';

const Modal = ({
  title,
  active,
  button,
  onClose = () => {},
  children,
}) => {
  return (
    <>
      <div
        onClick={onClose}
        className={cn(styles.dimmer, active && styles.active)}
      >
        <div
          className={styles.container}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.header}>{title}</div>
          <div className={styles.body}>{children}</div>
          <div className={styles.footer}>
            <Button onClick={onClose} secondary>
              Vazgeç
            </Button>
            {button}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
