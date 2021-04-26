import { UserDataComponentProps } from "./UserDataComponentProps";
import { InputUserDataAction } from "./InputUserDataActionType";

const initialState: UserDataComponentProps = {
  userDataProps: {
    emailAndPassword: undefined,
    displayedName: "Guest",
    userIcon: "https://pereezd-neva.ru/assets/template/img/spectehnika/d5fa0e2330973dc6b7571d881a345d6b.png",
    userVerified: false,
  },
  loading: false,
  error: undefined,
};

export const currentUserReducer = (state = initialState, action: InputUserDataAction): UserDataComponentProps => {
  switch (action.type) {
    case "LOADING_USER":
      return { ...state, loading: action.payload.loading };
    case "FETCH_USER_SUCCESS":
      return { ...state, userDataProps: action.payload.userData, loading: false };
    case "UPDATE_USER_SUCCESS":
      return { ...state, userDataProps: action.payload.newInfo, loading: false };
    case "UPDATE_USER_ERROR":
    case "FETCH_USER_ERROR":
      return { ...state, error: action.payload.error, loading: false };
    case "USER_LOG_OUT":
      return { ...initialState };
    default:
      return state;
  }
};
