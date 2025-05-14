import { baseURL } from "@/lib/utils";
import {
  authenticatePatientStore,
  editPatientProfileStore,
  loginPatientStore,
  registerNewPatientStore,
} from "@/store/patientAuthStore";
import type { loginPatientType, patientType } from "@/store/patientAuthStore";
import toast from "react-hot-toast";

export const handleRegisterNewPatient = async (
  formData: patientType
): Promise<boolean> => {
  registerNewPatientStore.setState({
    loading: true,
  });

  try {
    registerNewPatientStore.setState({
      loading: true,
    });
    const data = await fetch(`${baseURL}/patient/new-patient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        fullName: formData.fullName,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      }),
    });
    const response = await data.json();
    if (response?.success) {
      toast.success(response?.message);
      console.log("Response", response);
      registerNewPatientStore.setState({
        loading: false,
      });
      return true;
    } else if (!response?.success && response?.redirectToLogin) {
      loginPatientStore.setState({
        loading: false,
      });
      window.location.href = "/patients/login";
      return false;
    } else {
      toast.error(response?.message);
      registerNewPatientStore.setState({
        loading: false,
      });
      return false;
    }
  } catch (error) {
    toast.error("Registration failed");
    registerNewPatientStore.setState({
      loading: false,
    });
    return false;
  }
};
export const handlePatientLogin = async (
  formData: loginPatientType
): Promise<boolean> => {
  loginPatientStore.setState({
    loading: true,
  });

  try {
    const data = await fetch(`${baseURL}/patient/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      }),
    });
    const response = await data.json();
    if (response?.success) {
      toast.success(response?.message);

      loginPatientStore.setState({
        loading: false,
      });
      return true;
    } else if (!response?.success && response?.redirectToSignup) {
      toast.error(response?.message);
      loginPatientStore.setState({
        loading: false,
      });
      window.location.href = "/patients/signup";
      return false;
    } else {
      toast.error(response?.message);
      loginPatientStore.setState({
        loading: false,
      });
      return false;
    }
  } catch (error) {
    toast.error("Login failed");
    loginPatientStore.setState({
      loading: false,
    });
    return false;
  }
};
export const handlePatientAuthentication = async () => {
  try {
    const data = await fetch(`${baseURL}/patient/authenticate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const response = await data.json();

    if (response?.success) {
      console.log("Response", response);
      authenticatePatientStore.setState({
        isAuthenticated: response?.isAuthenticated,
        isPatient: response?.isPatient,
        username: response?.patient.fullName,
      });
      localStorage.setItem("patient", response?.patient.fullName);
    } else {
      console.log("Response", response);
      authenticatePatientStore.setState({
        isAuthenticated: response?.isAuthenticated,
        isPatient: response?.isPatient,
      });
    }
  } catch (error) {
    authenticatePatientStore.setState({
      isAuthenticated: false,
      isPatient: false,
    });
  }
};
export const handlePatientLogout = async () => {
  try {
    const data = await fetch(`${baseURL}/patient/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const response = await data.json();

    if (response?.success) {
      toast.success("Logout successful");

      authenticatePatientStore.setState({
        isAuthenticated: false,
        isPatient: false,
        username: null,
      });
      localStorage.removeItem("patient");
    } else {
      toast.error("Logout failed");
    }
  } catch (error) {
    toast.error("Logout failed");
  }
};
export const handleFetchPatientProfile = async () => {
  try {
    editPatientProfileStore.setState({
      loading: true,
    });
    const data = await fetch(`${baseURL}/patient/fetch-patient-profile-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const response = await data.json();

    if (response?.success) {
      editPatientProfileStore.setState({
        editProfileForm: response?.patient,
        loading: false,
      });
    } else {
      toast.error("Failed to fetch profile");
      editPatientProfileStore.setState({
        editProfileForm: null,
        loading: false,
      });
    }
  } catch (error) {
    toast.error("Failed to fetch profile");
    editPatientProfileStore.setState({
      editProfileForm: null,
      loading: false,
    });
  }
};

export const handleEditPatientProfile = async (
  formData: patientType
): Promise<boolean> => {
  try {
    editPatientProfileStore.setState({
      loading: true,
    });
    const data = await fetch(`${baseURL}/patient/update-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        fullName: formData.fullName,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
      }),
    });
    const response = await data.json();

    if (response?.success) {
      toast.success(response?.message);
      editPatientProfileStore.setState({
        loading: false,
        editProfileForm: null,
      });
      await handlePatientAuthentication();
      return true;
    } else {
      toast.error(response?.message);
      editPatientProfileStore.setState({
        loading: false,
      });
      return false;
    }
  } catch (error) {
    toast.error("Profile update failed");
    editPatientProfileStore.setState({
      loading: false,
    });
    return false;
  }
};

export const handleDeletePatientAccount = async (): Promise<boolean> => {
  try {
    const data = await fetch(`${baseURL}/patient/delete-account`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const response = await data.json();

    if (response?.success) {
      toast.success(response?.message);
      await handlePatientAuthentication();
      localStorage.removeItem("patient");
      return true;
    } else {
      toast.error(response?.message);
      return false;
    }
  } catch (error) {
    toast.error("Failed to delete account");

    return false;
  }
};
