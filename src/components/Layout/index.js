import React from 'react';
import Header from '../Header';
import Modal from '../Modal';
import styles from './layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
