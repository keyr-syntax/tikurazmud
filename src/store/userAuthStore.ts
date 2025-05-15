import { create } from "zustand";

interface userAuthenticationInterface {
  isAuthenticated: boolean;
  isPatient: boolean;
  isPhysician: boolean;
  isAdmin: boolean;
  username: string | null;
  profilePicture?: string | null;
}

export const userAuthenticationStore = create<userAuthenticationInterface>(
  () => ({
    isAuthenticated: false,
    isPatient: false,
    isPhysician: false,
    isAdmin: false,
    username: null,
    profilePicture: null,
  })
);
