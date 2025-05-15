import { create } from "zustand";

export type doctorType = {
  physicianID?: number;
  uniqueID?: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  phoneNumber: string;
  isPhysician: boolean;
  isAdmin?: boolean;
  isBlocked?: boolean;
  softDeleted?: boolean;
  isApproved?: boolean;
};

interface registerNewDoctorInterface {
  doctorFormData: doctorType | null;
  loading: boolean;
}

export type loginDoctorType = {
  email: string;
  password: string;
};

interface loginDoctorInterface {
  doctorLoginData: loginDoctorType | null;
  loading: boolean;
}

export const registerNewDoctorStore = create<registerNewDoctorInterface>(
  () => ({
    doctorFormData: null,
    loading: false,
  })
);

export const loginDoctorStore = create<loginDoctorInterface>(() => ({
  doctorLoginData: null,
  loading: false,
}));
