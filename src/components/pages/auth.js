import React, { useState } from 'react';
import Layout from '../layout/layout';
import styles from '../../styling/pages/auth.module.scss';
import CustomInput from '../custom_components/input';
import CustomButton from '../custom_components/button';
import { openNotification } from '../custom_components/notification';

const Auth = () => {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const location = window.location.pathname;

  const page = location && location === '/login' ? 'login' : 'register';

  const extractValue = event => event.target.value;

  return (
    <Layout>
      <div className={styles.container}>
        <form>
          <CustomInput
            type='input'
            value={username}
            placeholder={'username'}
            onChange={event => setUser(extractValue(event))}
          />
          <CustomInput
            type='password'
            value={password}
            placeholder={'parola'}
            onChange={event => setPassword(extractValue(event))}
          />
        </form>
        <CustomButton
          onClick={() =>
            openNotification(
              'success',
              page === 'login' ? 'Autentificare' : 'Înregistrare',
              'Veți fi redirecționat către pagina principală!'
            )
          }
        >
          {page === 'login' ? 'Autentificare' : 'Înregistrare'}
        </CustomButton>
      </div>
    </Layout>
  );
};

export default Auth;
