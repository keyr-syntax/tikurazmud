import { baseURL } from "@/lib/utils";
import { registerNewDoctorStore } from "@/store/doctorAuthStore";
import type { doctorType } from "@/types/userTypes";

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
