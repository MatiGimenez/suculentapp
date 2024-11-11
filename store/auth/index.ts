import { UserStorage } from "@/services/storage";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>()(() => ({
  isAuthenticated: Boolean(UserStorage.getString("user.token")),
}));

export const signIn = () => {
  UserStorage.set("user.token", "sadoikamsdokmqweokmqweoikm");
  useAuthStore.setState({ isAuthenticated: true });
};

export const signOut = () => {
  UserStorage.delete("user");
  useAuthStore.setState({ isAuthenticated: false });
};
