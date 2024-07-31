import { UserActionTypes } from "./userTypes";
import { Dispatch } from "redux";
import { postRequest } from "../../Services/api";
import { User } from "../../types";
import axios from "axios";

export const signIn = (user: User) => {
  return (dispatch: Dispatch) => {
    postRequest(
      "/user/addUser",
      user,
      (response) => {
        dispatch({
          type: UserActionTypes.ADD_USER,
          payload: response,
        });
      },
      (error) => {
        dispatch({
          type: UserActionTypes.FAILED,
          payload: error.response.status || "failed to add user",
        });
      }
    );
  };
};

export const logIn = (firstName: string, personalId: string) => {
  return (dispatch: Dispatch) => {
    postRequest(
      "/user/login",
      { firstName, personalId },
      (response) => {
        dispatch({
          type: UserActionTypes.LOG_IN,
          payload: response,
        });
      },
      (error) => {
        console.log(error); 
        dispatch({
          type: UserActionTypes.FAILED,
          payload: error.response.status || "Failed to login",
        });
        console.log(error.response.status);
        
      }
    );
  };
};

export const logOut = () => ({
  type: UserActionTypes.LOG_OUT,
});
