import { create } from "zustand";

export type adminType = {
  physicianID?: number;
  uniqueID?: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password?: string;
  phoneNumber: string;
  isPhysician?: boolean;
  isAdmin?: boolean;
  isBlocked?: boolean;
  softDeleted?: boolean;
  isApproved?: boolean;
};
export type loginAdminType = {
  email: string;
  password: string;
};
interface loginAdminInterface {
  adminLoginData: loginAdminType | null;
  loading: boolean;
}
export const loginAdminStore = create<loginAdminInterface>(() => ({
  adminLoginData: null,
  loading: false,
}));
