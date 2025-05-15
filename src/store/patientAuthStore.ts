import { create } from "zustand";

export type patientType = {
  patientID?: number;
  uniqueID?: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  password?: string;
  isPatient?: boolean;
  isBlocked?: boolean;
  softDeleted?: boolean;
};

export type loginPatientType = {
  phoneNumber: string;
  password: string;
};

interface loginPatientInterface {
  patientLoginData: loginPatientType | null;
  loading: boolean;
}

interface registerNewPatientInterface {
  patientFormData: patientType | null;
  loading: boolean;
}

interface authenticatePatientInterface {
  isAuthenticated: boolean;
  isPatient: boolean;
  username: string | null;
}

interface editPatientProfileInterface {
  editProfileForm: patientType | null;
  loading: boolean;
}

export interface changePasswordInterface {
  oldPassword: string | null;
  newPassword: string | null;
  loading: boolean;
}

export const registerNewPatientStore = create<registerNewPatientInterface>(
  () => ({
    patientFormData: null,
    loading: false,
  })
);

export const loginPatientStore = create<loginPatientInterface>(() => ({
  patientLoginData: null,
  loading: false,
}));

export const authenticatePatientStore = create<authenticatePatientInterface>(
  () => ({
    isAuthenticated: false,
    isPatient: false,
    username: null,
  })
);

export const editPatientProfileStore = create<editPatientProfileInterface>(
  () => ({
    editProfileForm: null,
    loading: false,
  })
);
export const changePatientPasswordStore = create<changePasswordInterface>(
  () => ({
    oldPassword: null,
    newPassword: null,
    loading: false,
  })
);
