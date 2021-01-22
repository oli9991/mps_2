import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styling/layout/header.module.scss';
import * as assets from '../../assets/index';
import Context, { actions } from '../../context/context';
import _ from 'underscore';
import { fullName } from '../../utils/localData';
import CustomButton from '../custom_components/button';

const Header = () => {
  const { state, dispatch } = useContext(Context);

  return (
    <div className={styles.header}>
      <div className={styles.pages}>
        {!_.isNull(state.token) &&
          state.user &&
          state.user.role === 'admin' && (
            <Link to='/reservations'>Rezervări</Link>
          )}
        {!_.isNull(state.token) && <Link to='/tables'>Mese</Link>}
        {!_.isNull(state.token) &&
          state.user &&
          state.user.role !== 'admin' && (
            <Link to='/self'>Rezervările mele</Link>
          )}
      </div>
      <Link to='/'>
        <img className={styles.logo} alt='logo' src={assets.logo}></img>
      </Link>

      <div className={styles.authSection}>
        {_.isNull(state.token) && (
          <>
            <Link to='/login'>Autentificare</Link>
            <Link to='/register'>Înregistrare</Link>
          </>
        )}
        {!_.isNull(state.token) && (
          <>
            <p>{fullName(state.user)}</p>
            <CustomButton onClick={() => dispatch({ type: actions.logout })}>
              Ieșire
            </CustomButton>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
