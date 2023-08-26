import React, { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import { useAppDispatch } from "./redux/hook";
import { setAccessToken, setUser } from "./redux/features/auth/authSlice";

function App() {
  // *** set the user data to redux storage from session storage when load application. if the window close the session data remove. But it prevent the reload problem
  const dispatch = useAppDispatch();
  const authData = sessionStorage.getItem("authData");
  useEffect(() => {
    if (authData) {
      const authParseData = JSON.parse(authData);
      dispatch(setAccessToken(authParseData.accessToken));
      dispatch(setUser(authParseData.user));
    }
  }, [dispatch, authData]);

  return (
    <>
      <MainLayout />
    </>
  );
}

export default App;
