import { useReducer, useState } from "react";
import AuthContext from "../context/AuthContext";

import AuthReducer from "../reducers/AuthReducer";

// create provider
const AuthContextProvider = ({ children }) => {
  // initial state
  const INITIAL_STATE = {
    isUserLoggedIn: false,
    user: {},
  };

  // reducer
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // drawer menu
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn: state.isUserLoggedIn,
        user: state.user,
        dispatch, drawerOpen,setDrawerOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//export
export default AuthContextProvider;
