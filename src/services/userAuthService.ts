import { baseURL } from "@/lib/utils";
import { userAuthenticationStore } from "@/store/userAuthStore";

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
