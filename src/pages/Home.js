import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Advertisement from '../components/Advertisement';
import Loading from '../components/Loading';

import _fetch from '../lib/_fetch';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _fetch('/jobs')
      .then((data) => setJobs(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const ad = {
    title: 'Yeni Mezun Siber Güvenlik Danışmanı',
    conditions: [
      { category: 'Network', limit: 85 },
      { category: 'SQL', limit: 30 },
      { category: 'Web', limit: 60 },
    ],
    companyName: 'Privia Cyber Security Consulting',
    date: '11.09.2021',
    location: ['İzmir', 'Ankara'],
  };
  return (
    <>
      <div
        className={cn(
          'adList',
          (loading || jobs.length < 1) && 'loading',
        )}
      >
        {loading ? (
          <Loading />
        ) : jobs.length > 0 ? (
          jobs.map((job) => <Advertisement ad={job} />)
        ) : (
          'Veri bulunamadı'
        )}
      </div>
    </>
  );
};

export default Home;
