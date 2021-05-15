import React from 'react';
import cn from 'classnames';
import styles from './group.module.scss';

const GroupField = ({ className, children, ...props }) => {
  return (
    <div className={cn(styles.formGroup, className)} {...props}>
      {children}
    </div>
  );
};

export default GroupField;
