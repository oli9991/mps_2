import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styling/layout/header.module.scss';
import * as assets from '../../assets/index';
import Context, { actions } from '../../context/context';
import _ from 'underscore';
import { fullName } from '../../utils/localData';
import CustomButton from '../custom_components/button';
import { Badge } from 'antd';
import { BsFillBellFill } from 'react-icons/bs';
import { connect, useDispatch } from 'react-redux';
import { setModal } from '../../redux/notifications';

const Header = props => {
  const { state, dispatch } = useContext(Context);
  const dispath = useDispatch();

  return (
    <div className={styles.header}>
      <div className={styles.pages}>
        {!_.isNull(state.token) &&
          state.user &&
          state.user.role === 'admin' && (
            <Link to='/reservations'>Rezervări</Link>
          )}
        {!_.isNull(state.token) &&
          state.user &&
          state.user.role === 'admin' && <Link to='/new'>Adăugare masă</Link>}
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
            {state.user && state.user.role !== 'admin' && (
              <Badge
                count={props.notifications}
                style={{ right: '20px', backgroundColor: '#2c2c2c' }}
              >
                <BsFillBellFill
                  onClick={() => dispath(setModal(true))}
                  style={{ cursor: 'pointer' }}
                />
              </Badge>
            )}
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
const mapStateToProps = store => ({
  notifications: store.notifications.notifications
});
export default connect(mapStateToProps)(Header);
