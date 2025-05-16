import { create } from "zustand";

interface userAuthenticationInterface {
  isAuthenticated: boolean;
  isPatient: boolean;
  isPhysician: boolean;
  isAdmin: boolean;
  username: string | null;
  profilePicture?: string | null;
}

export type userPhoneRedirectType = {
  phoneNumber: string;
};
export interface userPhoneRedirectInterface {
  loading: boolean;
  phoneNumber: string | null;
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

export const userPhoneRedirectStore = create<userPhoneRedirectInterface>(
  () => ({
    loading: false,
    phoneNumber: null,
  })
);
