import { useEffect } from "react";
import { useAppDispatch } from "../features/hooks";
import { loginWithToken } from "../features/user/userSlice";

const RefreshHandler = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loginWithToken());
  }, [dispatch]);

  return null;
};

export default RefreshHandler;
