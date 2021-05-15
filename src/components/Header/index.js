import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import _fetch from '../../lib/_fetch';
import AddField from '../AddField';
import Button from '../Button';
import Dropdown from '../Dropdown';
import { Field, Form, GroupField } from '../Form';
import Modal from '../Modal';
import styles from './header.module.scss';

const Header = () => {
  const [hiringModal, setHiringModal] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState([]);
  const [conditions, setConditions] = useState([
    { category_id: '', limit: '' },
  ]);
  const [cities, setCities] = useState([]);
  const [companyModal, setCompanyModal] = useState(false);
  const [name, setName] = useState('');
  const [webSite, setWebSite] = useState('');
  const [city, setCity] = useState(-1);
  const [about, setAbout] = useState('');
  const [email, setEmail] = useState('');
  const [companies, setCompanies] = useState([]);
  const [avatar, setAvatar] = useState(undefined);

  const categoryOptions = [
    { text: 'SQL', value: 1 },
    { text: 'Web', value: 2 },
    { text: 'Network', value: 3 },
    { text: 'System', value: 4 },
    { text: 'Reverse', value: 5 },
  ];

  const newCondition = () => {
    setConditions([...conditions, { category_id: '', limit: '' }]);
  };

  const handleSetLimit = (value, index) => {
    const tempConditions = [...conditions];
    tempConditions[index].limit = value;
    setConditions(tempConditions);
  };

  const handleSetCategory = (value, index) => {
    const tempConditions = [...conditions];
    tempConditions[index].category_id = value;
    setConditions(tempConditions);
  };

  const handleCompanySubmit = () => {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('about', about);
    fd.append('city_id', city);
    fd.append('email', email);
    fd.append('website', webSite);
    fd.append('avatar', avatar);
    const data = {
      company: {
        name,
        about,
        city_id: city,
        email,
        website: webSite,
      },
      avatar,
    };

    _fetch('/companies', {
      method: 'POST',
      body: fd,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => setCompanyModal(false));
  };

  const handleJobSubmit = () => {
    const data = {
      job: {
        title,
        desc,
        company_id: companyName,
        job_type: type,
        city_ids: location,
        conditions_attributes: conditions,
      },
    };

    _fetch('/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => setHiringModal(false));
  };

  useEffect(() => {
    _fetch('/cities', {
      headers: { 'Content-Type': 'application/json' },
    }).then((data) => {
      const temp = data.map((city) => {
        return { text: city.name, value: city.id };
      });
      setCities(temp);
    });
    _fetch('/companies', {
      headers: { 'Content-Type': 'application/json' },
    }).then((data) => {
      const temp = data.map((company) => {
        return { text: company.name, value: company.id };
      });
      setCompanies(temp);
    });
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>
            Kariyer
          </Link>
          <nav>
            <Link to="/hiring">İşe Alımlar</Link>
            <Link to="/searching">İş Arayanlar</Link>
          </nav>
        </div>
        <div className={styles.right}>
          <Button onClick={() => setHiringModal(true)}>
            İş İlanı Yayınla
          </Button>
          <Button onClick={() => setCompanyModal(true)}>
            Kayıt Ol
          </Button>
        </div>
      </header>

      <Modal
        active={hiringModal}
        onClose={() => setHiringModal(false)}
        button={<Button onClick={handleJobSubmit}>Yayınla</Button>}
        title="İş İlanı Yayınla"
      >
        <Form>
          <Field label="Başlık">
            <input
              placeholder="İlan başlığı"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Field>
          <Field label="Açıklama">
            <textarea
              placeholder="İlan açıklaması"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Field>
          <GroupField>
            {companies.length > 0 && (
              <Field label="Şirket Adı">
                <Dropdown
                  options={companies}
                  onChange={(e, value) => setCompanyName(value)}
                ></Dropdown>
              </Field>
            )}
            <Field label="Yayın Türü">
              <Dropdown
                options={[
                  { text: 'Anonim', value: 'anonim' },
                  { text: 'Şirket Adıyla', value: 'named' },
                ]}
                onChange={(e, value) => setType(value)}
              ></Dropdown>
            </Field>
          </GroupField>
          {cities.length > 0 && (
            <Field label="Lokasyon">
              <Dropdown
                multiple
                options={cities}
                onChange={(e, values) => setLocation(values)}
              />
            </Field>
          )}
          {conditions.map((c, i) => (
            <GroupField>
              <Field label="Kategori">
                <Dropdown
                  options={categoryOptions}
                  onChange={(e, value) => handleSetCategory(value, i)}
                />
              </Field>
              <Field label="Limit">
                <input
                  placeholder="Limit"
                  type="text"
                  value={conditions[i].limit}
                  onChange={(e) => handleSetLimit(e.target.value, i)}
                />
              </Field>
            </GroupField>
          ))}
          <AddField onClick={newCondition}>+Ekle</AddField>
        </Form>
      </Modal>

      <Modal
        active={companyModal}
        onClose={() => setCompanyModal(false)}
        button={
          <Button onClick={handleCompanySubmit}>Kayıt Ol</Button>
        }
        title="Kayıt Ol"
      >
        <Form>
          <Field label="Adı">
            <input
              placeholder="firma adı"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field label="Hakkında">
            <textarea
              placeholder="firma hakkında"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </Field>
          <Field label="Email">
            <input
              placeholder="firma email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Website">
            <input
              placeholder="firma website"
              value={webSite}
              onChange={(e) => setWebSite(e.target.value)}
            />
          </Field>
          {cities.length > 0 && (
            <Field label="Şehir">
              <Dropdown
                options={cities}
                onChange={(e, value) => setCity(value)}
              ></Dropdown>
            </Field>
          )}
          <Field label="Avatar">
            <input
              type="file"
              placeholder="firma website"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </Field>
        </Form>
      </Modal>
    </>
  );
};

export default Header;
