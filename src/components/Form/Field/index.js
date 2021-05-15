import React from 'react';
import cn from 'classnames';
import styles from './field.module.scss';

const Field = ({ label, className, children, ...props }) => {
  return (
    <div className={cn(styles.field, className)} {...props}>
      <label>{label}</label>
      {children}
    </div>
  );
};

export default Field;
