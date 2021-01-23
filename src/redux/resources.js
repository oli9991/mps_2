const initialState = [];

export default function resources(state = initialState, action) {
  switch (action.type) {
    case 'updateResources':
      return action.payload;
    default:
      return state;
  }
}

export const updateResources = payload => ({
  type: 'updateResources',
  payload
});
