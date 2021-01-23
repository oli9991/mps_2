const initialState = [];

export default function reservations(state = initialState, action) {
  switch (action.type) {
    case 'update':
      return action.payload;
    default:
      return state;
  }
}

export const updateReservations = payload => ({ type: 'update', payload });
