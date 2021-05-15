import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Button from '../../components/Button';
import Conditions from '../../components/Conditions';
import Loading from '../../components/Loading';
import WhiteBox from '../../components/WhiteBox';
import _fetch from '../../lib/_fetch';
import styles from './detail.module.scss';

const AdvertisementDetail = () => {
  const [ad, setAd] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    _fetch(`/jobs/${id}`, {
      headers: { 'Content-Type': 'applicaton/json' },
    })
      .then((data) => setAd(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.adDetail}>
          <div className={styles.column}>
            <WhiteBox>
              <div className={styles.company}>
                <h3>Şirket Bilgileri</h3>
                <div className={styles.info}>
                  <div className={styles.image}>
                    <img src={ad.company.avatar} alt="company" />
                  </div>
                  <div className={styles.detail}>
                    <h4>{ad.company.name}</h4>
                    <div className={styles.subDetail}>
                      <a href={'https://' + ad.company.website}>
                        {ad.company.website}
                      </a>
                    </div>
                    <div className={styles.subDetail}>
                      {ad.company.city}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.desc}>{ad.company.about}</div>
            </WhiteBox>
          </div>
          <div className={styles.column}>
            <WhiteBox>
              <h3>İlan Detayları</h3>
              <div className={styles.desc}>{ad.desc}</div>
            </WhiteBox>
          </div>
          <div className={styles.column}>
            <WhiteBox>
              <div className={styles.row}>
                <h3>Başvuru Şartları</h3>
                <Conditions conditions={ad.conditions} />
              </div>
              <div className={styles.row}>
                <h3>Lokasyon</h3>
                <span>{ad.cities.map((c) => c.name).join(', ')}</span>
              </div>
              <div className={styles.row}>
                <h3>Başvuru Sayısı</h3>
                <span>1-10</span>
              </div>
            </WhiteBox>
            <Button>Başvur</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvertisementDetail;
