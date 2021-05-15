import React from 'react';
import styles from './addField.module.scss';
const AddField = ({ children, ...props }) => {
  return (
    <div className={styles.addField} {...props}>
      {children}
    </div>
  );
};

export default AddField;
