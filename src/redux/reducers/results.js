import { ADD_NEW_RESULT } from "../actionTypes";

const initialState = {
  hotdogs: [],
  notHotdogs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_RESULT:
      const newHotdogs = state.hotdogs.slice();
      const newNotHotdogs = state.notHotdogs.slice();
      if (action.payload.isHotdog) {
        newHotdogs.push(action.payload.imageURL);
      }
      else {
        newNotHotdogs.push(action.payload.imageURL);
      }
      return {
        hotdogs: newHotdogs,
        notHotdogs: newNotHotdogs
      };

    default:
      return state;
  }
}
