import { ADD_NEW_RESULT } from "../actionTypes";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_RESULT: {
      return [
        action.payload,
        ...state
      ];
    }

    default:
      return state;
  }
}
