import { baseURL } from "@/lib/utils";
import {
  editDoctorProfileStore,
  loginDoctorStore,
  registerNewDoctorStore,
  type loginDoctorType,
} from "@/store/doctorAuthStore";
import type { doctorType } from "@/types/userTypes";
import toast from "react-hot-toast";
import { handleUserAuthentication } from "./userAuthService";

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
