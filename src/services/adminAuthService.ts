import { baseURL } from "@/lib/utils";
import { loginAdminStore, type loginAdminType } from "@/store/adminAuthStore";
import toast from "react-hot-toast";

export const handleAdminLogin = async (
  formData: loginAdminType
): Promise<boolean> => {
  loginAdminStore.setState({
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
      loginAdminStore.setState({
        loading: false,
      });
      return true;
    } else {
      toast.error(response?.message);
      loginAdminStore.setState({
        loading: false,
      });
      return false;
    }
  } catch (error) {
    toast.error("Login failed");
    loginAdminStore.setState({
      loading: false,
    });
    return false;
  }
};
