import React, { useState, useContext, useEffect } from 'react';
import Layout from '../layout/layout';
import styles from '../../styling/pages/auth.module.scss';
import CustomInput from '../custom_components/input';
import CustomButton from '../custom_components/button';
import { openNotification } from '../custom_components/notification';
import Context from '../../context/context';
import { login, register } from '../../requests/function';
import _ from 'underscore';
import { Redirect } from 'react-router-dom';
import CustomSelect from '../custom_components/custom_select';
import eating from '../../assets/eating.svg';
import Loading from '../custom_components/loading_screen';

const Auth = props => {
  const [email, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('user');
  const [submitted, setSubmitted] = useState(true);

  const location = window.location.pathname;
  const page = location && location === '/login' ? 'login' : 'register';

  const { state, dispatch } = useContext(Context);

  const extractValue = event => event.target.value;

  const checkInput = value => !_.isEmpty(value);

  useEffect(() => {
    return () => {
      setFirstName('');
      setLastName('');
      setPassword('');
      setUser('');
    };
  }, []);

  const handleLogin = () => {
    if (!checkInput(email)) {
      openNotification(
        'warning',
        'Autentificare',
        'Câmpul pentru email nu este completat!'
      );
      return;
    }
    if (!checkInput(password)) {
      openNotification(
        'warning',
        'Autentificare',
        'Câmpul pentru parolă nu este completat!'
      );
      return;
    }
    setSubmitted(false);
    login(
      email,
      password,
      dispatch,
      () => {
        openNotification(
          'success',
          'Autentificare',
          'Veți fi redirecționat către pagina principală!'
        );
        setSubmitted(true);
      },
      () => setSubmitted(true)
    );
  };

  const handleRegister = () => {
    if (!checkInput(email)) {
      openNotification(
        'warning',
        'Autentificare',
        'Câmpul pentru email nu este completat!'
      );
      return;
    }
    if (!checkInput(firstName)) {
      openNotification(
        'warning',
        'Autentificare',
        'Câmpul pentru prenume nu este completat!'
      );
      return;
    }
    if (!checkInput(lastName)) {
      openNotification(
        'warning',
        'Autentificare',
        'Câmpul pentru numele de familie nu este completat!'
      );
      return;
    }
    if (!checkInput(password)) {
      openNotification(
        'warning',
        'Autentificare',
        'Câmpul pentru parolă nu este completat!'
      );
      return;
    }
    if (password.length < 6) {
      openNotification(
        'warning',
        'Autentificare',
        'Câmpul pentru parolă nu se potrivește cerințelor!'
      );
      return;
    }
    setSubmitted(false);
    register(
      email,
      firstName,
      lastName,
      password,
      role,
      () => {
        openNotification(
          'success',
          'Înregistrare cu succes',
          'Veți fi redirecționat către pagina de autentificare!'
        );
        setSubmitted(true);
        props.history.push('/login');
      },
      () => setSubmitted(true)
    );
  };

  if (!_.isNull(state.token)) {
    return <Redirect to='/' />;
  }

  return (
    <Layout>
      {submitted === false && <Loading />}
      <div className={styles.container}>
        <img src={eating} alt='table' />
        <form>
          {page === 'register' && (
            <CustomInput
              type='text'
              value={firstName}
              placeholder={'prenume'}
              onChange={event => setFirstName(extractValue(event))}
            />
          )}
          {page === 'register' && (
            <CustomInput
              type='text'
              value={lastName}
              placeholder={'numele de familie'}
              onChange={event => setLastName(extractValue(event))}
            />
          )}
          {page === 'register' && (
            <CustomSelect
              value={role}
              autoFocus
              onChange={event => setRole(extractValue(event))}
            >
              <option className={styles.option} value={'admin'}>
                Administrator
              </option>
              <option className={styles.option} value={'user'}>
                Utilizator
              </option>
            </CustomSelect>
          )}
          <CustomInput
            type='input'
            value={email}
            placeholder={'email'}
            onChange={event => setUser(extractValue(event))}
          />
          <CustomInput
            type='password'
            value={password}
            placeholder={'parola'}
            onChange={event => setPassword(extractValue(event))}
          />
          {page === 'register' && password.length < 6 && (
            <p>Parola trebuie să aibă minim 6 caractere.</p>
          )}
        </form>
        <CustomButton
          onClick={() => (page === 'login' ? handleLogin() : handleRegister())}
        >
          {page === 'login' ? 'Autentificare' : 'Înregistrare'}
        </CustomButton>
      </div>
    </Layout>
  );
};

export default Auth;
