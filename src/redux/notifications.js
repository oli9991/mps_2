const initialState = {
  modalOpened: false,
  notifications: 0
};

export default function notifications(state = initialState, action) {
  switch (action.type) {
    case 'setModal':
      return { ...state, modalOpened: action.payload };
    case 'setNotifications':
      return { ...state, notifications: action.payload };
    default:
      return state;
  }
}

export const setModal = payload => ({ type: 'setModal', payload });
export const setNotifications = payload => ({
  type: 'setNotifications',
  payload
});
