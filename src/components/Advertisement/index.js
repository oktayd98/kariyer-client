import React from 'react';
import cn from 'classnames';
import styles from './advertisement.module.scss';
import Conditions from '../Conditions';
import { Link } from 'react-router-dom';

const Advertisement = ({ ad }) => {
  return (
    <Link to={`/hiring/${ad.id}`} className={styles.advertisement}>
      <div className={styles.title}>{ad.title}</div>
      <Conditions conditions={ad.conditions} />
      <div className={styles.company}>
        <div className={styles.image}>
          <img src={ad.company.avatar} alt="company" />
        </div>
        <div className={styles.info}>
          <div className={styles.companyName}>{ad.company.name}</div>
          <div className={styles.adInfo}>
            <span className={styles.infoTitle}>İlan Tarihi: </span>
            <span className={styles.infoContent}>
              {new Date(ad.created_at).toLocaleDateString()}
            </span>
          </div>
          <div className={styles.adInfo}>
            <span className={styles.infoTitle}>Lokasyon: </span>
            <span className={styles.infoContent}>
              {ad.cities.map((c) => c.name).join(', ')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Advertisement;
