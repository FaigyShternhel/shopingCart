import { User } from "../../types";
import { UserActionTypes } from "./userTypes";

type Action = {
  type: string;
  payload: User;
};

const INITIAL_STATE = {
  currentUser:{},
  failedMessage: '',
};

const userReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case UserActionTypes.LOG_IN:
      return {
        ...state,
        currentUser: action.payload,
        failedMessage: '',
      };
    case UserActionTypes.ADD_USER:
      return {
        ...state,
        currentUser: action.payload,
        failedMessage: '',
      };
    case UserActionTypes.LOG_OUT:
      return {
        ...state,
        currentUser: {},
      };
    case UserActionTypes.FAILED:
      return {
        state,
        failedMessage: action.payload || 'Failed to login',
      };
      
    default:
      return state;

  }
};

export default userReducer;
