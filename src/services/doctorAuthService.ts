import { baseURL } from "@/lib/utils";
import {
  editDoctorProfileStore,
  loginDoctorStore,
  registerNewDoctorStore,
  type loginDoctorType,
  type doctorType,
  type changeDoctorPasswordInterface,
  changeDoctorPasswordStore,
} from "@/store/doctorAuthStore";

import toast from "react-hot-toast";
import { handleUserAuthentication } from "./userAuthService";
import { userAuthenticationStore } from "@/store/userAuthStore";

export const handleRegisterNewDoctor = async (
  formData: doctorType
): Promise<boolean> => {
  registerNewDoctorStore.setState({
    loading: true,
  });
  try {
    const data = await fetch(
      `${baseURL}/physician/create_physician_personal_info`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: formData.gender,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
          isPhysician: true,
          // isAdmin: formData.isAdmin,
          // isBlocked: formData.isBlocked,
          // softDeleted: formData.softDeleted,
          // isApproved: formData.isApproved,
        }),
      }
    );
    const response = await data.json();
    if (response?.success) {
      //toast.success(response.message);
      console.log("Response", response);
      registerNewDoctorStore.setState({
        loading: false,
      });
      return true;
    } else {
      //toast.error(response.message);
      registerNewDoctorStore.setState({
        loading: false,
      });
      return false;
    }
  } catch (error) {
    //toast.error("Registration failed");
    registerNewDoctorStore.setState({
      loading: false,
    });
    return false;
  }
};
export const handleDoctorLogin = async (
  formData: loginDoctorType
): Promise<boolean> => {
  loginDoctorStore.setState({
    loading: true,
  });

  try {
    const data = await fetch(`${baseURL}/physician/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const response = await data.json();
    if (response?.success) {
      toast.success(response?.message);
      loginDoctorStore.setState({
        loading: false,
      });
      return true;
    } else {
      toast.error(response?.message);
      loginDoctorStore.setState({
        loading: false,
      });
      return false;
    }
  } catch (error) {
    toast.error("Login failed");
    loginDoctorStore.setState({
      loading: false,
    });
    return false;
  }
};
export const handleFetchDoctorProfile = async () => {
  try {
    editDoctorProfileStore.setState({
      loading: true,
    });
    const data = await fetch(
      `${baseURL}/physician/fetch-physician-profile-data`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const response = await data.json();

    if (response?.success) {
      editDoctorProfileStore.setState({
        editDoctorProfileForm: response?.physician,
        loading: false,
      });
    } else {
      toast.error(response?.message);
      editDoctorProfileStore.setState({
        editDoctorProfileForm: null,
        loading: false,
      });
    }
  } catch (error) {
    toast.error("Failed to fetch profile");
    editDoctorProfileStore.setState({
      editDoctorProfileForm: null,
      loading: false,
    });
  }
};
export const handleEditDoctorProfile = async (
  formData: doctorType
): Promise<boolean> => {
  try {
    editDoctorProfileStore.setState({
      loading: true,
    });
    const data = await fetch(`${baseURL}/physician/update-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      }),
    });
    const response = await data.json();

    if (response?.success) {
      toast.success(response?.message);
      editDoctorProfileStore.setState({
        loading: false,
        editDoctorProfileForm: null,
      });
      await handleUserAuthentication();
      return true;
    } else {
      toast.error(response?.message);
      editDoctorProfileStore.setState({
        loading: false,
      });
      return false;
    }
  } catch (error) {
    toast.error("Profile update failed");
    editDoctorProfileStore.setState({
      loading: false,
    });
    return false;
  }
};
export const handleChangeDoctorPassword = async (
  formData: changeDoctorPasswordInterface
): Promise<boolean> => {
  try {
    changeDoctorPasswordStore.setState({
      loading: true,
    });
    const data = await fetch(`${baseURL}/physician/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }),
    });
    const response = await data.json();

    if (response?.success) {
      toast.success(response?.message);
      changeDoctorPasswordStore.setState({
        loading: false,
      });
      await handleUserAuthentication();
      return true;
    } else {
      toast.error(response?.message);
      changeDoctorPasswordStore.setState({
        loading: false,
      });
      return false;
    }
  } catch (error) {
    toast.error("Profile update failed");
    changeDoctorPasswordStore.setState({
      loading: false,
    });
    return false;
  }
};
export const handleDoctorLogout = async () => {
  try {
    const data = await fetch(`${baseURL}/physician/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const response = await data.json();

    if (response?.success) {
      toast.success("Logout successful");

      userAuthenticationStore.setState({
        isAuthenticated: false,
        isPatient: false,
        isPhysician: false,
        isAdmin: false,
        username: null,
        profilePicture: null,
      });
      window.location.href = "/";
      localStorage.removeItem("username");
      localStorage.removeItem("profilePicture");
    } else {
      toast.error("Logout failed");
    }
  } catch (error) {
    toast.error("Logout failed");
  }
};
export const handleDeleteDoctorAccount = async (): Promise<boolean> => {
  try {
    const data = await fetch(`${baseURL}/physician/delete-account`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const response = await data.json();

    if (response?.success) {
      toast.success(response?.message);
      await handleUserAuthentication();
      localStorage.removeItem("username");
      localStorage.removeItem("profilePicture");

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
