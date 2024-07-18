import { useSelector } from "react-redux";
import { AppState } from "../Redux/AppState";
import { UserModel } from "../Models/UserModel";

export function CurrentUser() {
  const currentUser = useSelector<AppState, UserModel>(
    (appState) => appState.user
  );
  const isAdmin = currentUser?.roleId === 1;
  const isUser = currentUser?.roleId === 2;

  return { isAdmin, isUser };
}
