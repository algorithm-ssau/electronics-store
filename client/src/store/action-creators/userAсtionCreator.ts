import { Dispatch } from "redux";
import axios from "axios";
import {
  userDeleteAccountBegin,
  userDeleteAccountError,
  userDeleteAccountSuccess,
  userLoginBegin,
  userLoginError,
  userLoginSuccess,
  userLogoutBegin,
  userLogoutError,
  userLogoutSuccess,
  userRegisterBegin,
  userRegisterError,
  userRegisterSuccess,
  userUpdateBegin,
  userUpdateError,
  userUpdateSuccess,
} from "../../ui/user-data/InputUserDataActions";
import { EmailAndPassword, UserDataSignUpProps } from "../../ui/user-data/UserDataProps";
import { getDBReqURL } from "../../utils/URLs";
import { UserOrError } from "../../interfaces/json-interfaces/UserOrError";
import {
  backendMessageToActionMessage,
  backendResponseUserToFrontendUser,
  userSignUpPropsToBackendUser,
  userSignUpPropsToBackendUserDefault,
} from "../../utils/converters";
import { BackendMessage } from "../../interfaces/BackendMessage";
import { CustomerSchema } from "../../interfaces/backend-return-types/CustomerSchema";

export const signIn = (emailAndPassword: EmailAndPassword) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(userLoginBegin(emailAndPassword));
      const response: UserOrError[] = (
        await axios.get(
          getDBReqURL("CUSTOMER", "GET", `?email=${emailAndPassword.email}&password=${emailAndPassword.password}`)
        )
      ).data;
      if (response[0].responseType === "Message") {
        dispatch(userLoginError({ error: response[0].error, text: response[0].message }));
      }
      const userData = backendResponseUserToFrontendUser(response[0]);
      dispatch(userLoginSuccess(userData));
      return userData;
    } catch (e) {
      dispatch(userLoginError({ error: true, text: e.message }));
      return e;
    }
  };
};

export const signUp = (userSignUpProps: UserDataSignUpProps) => {
  return async (dispatch: Dispatch) => {
    try {
      const userToSignUpBackendFormat: CustomerSchema = userSignUpPropsToBackendUserDefault(userSignUpProps);
      await dispatch(userRegisterBegin(userToSignUpBackendFormat));
      const response: UserOrError[] = (
        await axios.post(getDBReqURL("CUSTOMER", "POST"), JSON.stringify(userToSignUpBackendFormat), {
          headers: {
            "content-type": "application/json",
          },
        })
      ).data;
      if (response[0].responseType === "Message") {
        return dispatch(userRegisterError({ error: response[0].error, text: response[0].message }));
      }
      const userJustRegistered = backendResponseUserToFrontendUser(response[0]);
      return dispatch(userRegisterSuccess(userJustRegistered));
    } catch (e) {
      return dispatch(userRegisterError({ error: true, text: e.message }));
    }
  };
};

export const updateUserInfo = (oldEmailAndPassword: EmailAndPassword, newUserDataProps: UserDataSignUpProps) => {
  return async (dispatch: Dispatch) => {
    try {
      await dispatch(userUpdateBegin(oldEmailAndPassword, newUserDataProps));
      const newUserDataBackendFormat = userSignUpPropsToBackendUser(newUserDataProps);
      const response: BackendMessage[] = (
        await axios.put(
          getDBReqURL(
            "CUSTOMER",
            "PUT",
            `?email=${oldEmailAndPassword.email}&password=${oldEmailAndPassword.password}`
          ),
          JSON.stringify(newUserDataBackendFormat)
        )
      ).data;
      const actionMessage = backendMessageToActionMessage(response[0]);
      if (actionMessage.error) {
        return dispatch(userUpdateError(actionMessage));
      }
      return dispatch(userUpdateSuccess(actionMessage));
    } catch (e) {
      return dispatch(userUpdateError({ error: true, text: e.message }));
    }
  };
};

export const deleteAccount = (emailAndPassword: EmailAndPassword) => {
  return async (dispatch: Dispatch) => {
    try {
      await dispatch(userDeleteAccountBegin(emailAndPassword));
      const response: BackendMessage[] = (
        await axios.delete(
          getDBReqURL("CUSTOMER", "DELETE", `?email=${emailAndPassword.email}&password=${emailAndPassword.password}`)
        )
      ).data;
      const actionMessage = backendMessageToActionMessage(response[0]);
      if (actionMessage.error) {
        return dispatch(userDeleteAccountError(actionMessage));
      }
      return dispatch(userDeleteAccountSuccess(actionMessage));
    } catch (e) {
      return dispatch(userDeleteAccountError({ error: true, text: e.message }));
    }
  };
};

export const logOut = () => {
  return async (dispatch: Dispatch) => {
    try {
      await dispatch(userLogoutBegin());
      return dispatch(userLogoutSuccess());
    } catch (e) {
      return dispatch(userLogoutError({ error: true, text: e.message }));
    }
  };
};
