import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-menubar";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { useEffect } from "react";

import Loading from "@/components/ui/Loading";
import {
  editDoctorProfileStore,
  type doctorType,
} from "@/store/doctorAuthStore";
import {
  handleEditDoctorProfile,
  handleFetchDoctorProfile,
} from "@/services/doctorAuthService";

function EditDoctorProfile() {
  const { editDoctorProfileForm, loading } = editDoctorProfileStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<doctorType>();

  useEffect(() => {
    handleFetchDoctorProfile();
  }, []);
  useEffect(() => {
    if (editDoctorProfileForm) {
      setValue("phoneNumber", editDoctorProfileForm.phoneNumber || "");
      setValue("firstName", editDoctorProfileForm.firstName || "");
      setValue("lastName", editDoctorProfileForm.lastName || "");
      setValue("gender", editDoctorProfileForm.gender || "");
      setValue("email", editDoctorProfileForm.email || "");
    }
  }, [editDoctorProfileForm, setValue]);

  const submitDoctorFormData = async (formData: doctorType) => {
    const success = await handleEditDoctorProfile(formData);
    if (success) {
      window.location.href = "/";
      // after successful signup, display profile-pic, turn-off login/signup button,
    }
  };

  return (
    <>
      {loading && editDoctorProfileForm === null && <Loading />}
      {!loading && editDoctorProfileForm !== null && (
        <div className="flex flex-col justify-center items-center  mb-8 w-full mt-[80px]">
          <form
            onSubmit={handleSubmit(submitDoctorFormData)}
            className="flex flex-col gap-2 mx-auto mt-1 w-[90%] max-w-[500px] border border-solid border-[rgb(255,255,255,0.2)] p-8 rounded"
          >
            <p className="text-center text-[24px] font-bold mb-5">
              Edit Your Profile
            </p>
            <div className="grid gap-2 w-full ">
              <Input
                className="block border border-solid border-[rgb(255,255,255,0.2)] rounded "
                id="uniqueID"
                type="text"
                value={`Your Doctor ID is ${editDoctorProfileForm?.uniqueID}`}
                disabled
              />
            </div>
            <div className="flex flex-row  gap-5">
              <div className="grid gap-2 w-1/2">
                <Label className="text-md">First Name</Label>
                <Input
                  className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
                  id="first_name"
                  type="text"
                  placeholder="First name"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2 w-1/2">
                <Label className="text-md">Last Name</Label>
                <Input
                  className="block  border border-solid border-[rgb(255,255,255,0.2)] rounded"
                  type="text"
                  placeholder="Last name"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-2 w-full">
              <Label className="text-md">Gender</Label>
              <select
                id="gender"
                className="block  w-full border border-solid border-[rgb(255,255,255,0.2)]  p-2 bg-transparent rounded"
                {...register("gender", { required: "Gender is required" })}
              >
                <option className="text-white bg-[#151533]" value="">
                  Select Gender
                </option>
                <option className="text-white bg-[#151533]" value="male">
                  Male
                </option>
                <option className="text-white bg-[#151533]" value="female">
                  Female
                </option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>
            <div className="grid gap-2 ">
              <Label className="text-md">Email</Label>
              <Input
                className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
                type="email"
                placeholder="Your email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-2 ">
              <Label className="text-md">Phone number</Label>
              <Input
                className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
                type="tel"
                placeholder="09 12 34 56 78"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^(09|07)\d{8}$/,
                    message: "Invalid phone number",
                  },
                })}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <Button
              disabled={loading}
              type="submit"
              className="bg-[#00C8FF] hover:bg-[#0099ff] text-black font-semibold text-md mt-5 rounded"
            >
              {loading ? "Please wait" : "Submit"}
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditDoctorProfile;
