import { combineReducers } from 'redux';
import notifications from './notifications';
import reservations from './reservations';
import resources from './resources';

export default combineReducers({
  notifications,
  reservations,
  resources
});
