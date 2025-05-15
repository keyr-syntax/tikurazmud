import { baseURL } from "@/lib/utils";
import {
  userAuthenticationStore,
  userPhoneRedirectStore,
  type userPhoneRedirectType,
} from "@/store/userAuthStore";
import toast from "react-hot-toast";

export const handleUserAuthentication = async () => {
  try {
    const data = await fetch(`${baseURL}/auth/authenticate-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const response = await data.json();

    if (response?.success) {
      console.log("Response", response);
      userAuthenticationStore.setState({
        isAuthenticated: response?.isAuthenticated,
        isPatient: response?.isPatient,
        isPhysician: response?.isPhysician,
        isAdmin: response?.isAdmin,
        username: response?.username,
        profilePicture: response?.profilePicture,
      });
      localStorage.setItem("username", response?.username);
      localStorage.setItem("profilePicture", response?.profilePicture);
    } else {
      console.log("Response", response);
      userAuthenticationStore.setState({
        isAuthenticated: response?.isAuthenticated,
        isPatient: response?.isPatient,
        isPhysician: response?.isPhysician,
        isAdmin: response?.isAdmin,
        username: response?.username,
        profilePicture: response?.profilePicture,
      });
      localStorage.setItem("username", response?.username);
      localStorage.setItem("profilePicture", response?.profilePicture);
    }
  } catch (error) {
    userAuthenticationStore.setState({
      isAuthenticated: false,
      isPatient: false,
      isPhysician: false,
      isAdmin: false,
      username: null,
      profilePicture: null,
    });
  }
};

export const handleUserRedirect = async (formData: userPhoneRedirectType) => {
  userPhoneRedirectStore.setState({
    loading: true,
  });

  try {
    const data = await fetch(`${baseURL}/auth/phone-redirect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        phoneNumber: formData.phoneNumber,
      }),
    });
    const response = await data.json();
    if (
      response?.success &&
      response?.isPatient &&
      !response?.isPhysician &&
      !response?.isAdmin
    ) {
      userPhoneRedirectStore.setState({
        loading: false,
      });
      //pass the phone number to login state
      window.location.href = "/patients/patient-login";
      return;
    } else if (
      response?.success &&
      !response?.isPatient &&
      response?.isPhysician &&
      !response?.isAdmin
    ) {
      userPhoneRedirectStore.setState({
        loading: false,
      });
      window.location.href = "/doctors/doctor-login";
      return;
    } else if (response?.success && !response?.isPatient && response?.isAdmin) {
      userPhoneRedirectStore.setState({
        loading: false,
      });
      window.location.href = "/admin/admin-login";
      return;
    } else if (!response?.success && response?.redirectToSignup) {
      toast.error(response?.message);
      userPhoneRedirectStore.setState({
        loading: false,
      });
      window.location.href = "/patients/patient-signup";
      return;
    }
  } catch (error) {
    toast.error(error.message);
    userPhoneRedirectStore.setState({
      loading: false,
    });
  }
};
