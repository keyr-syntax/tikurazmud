import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-menubar";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  editPatientProfileStore,
  type patientType,
} from "@/store/patientAuthStore";
import { useEffect } from "react";
import {
  handleEditPatientProfile,
  handleFetchPatientProfile,
} from "@/services/patientAuthService";
import Loading from "@/components/ui/Loading";
function EditProfile() {
  const { editProfileForm, loading } = editPatientProfileStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<patientType>();

  useEffect(() => {
    handleFetchPatientProfile();
  }, []);
  useEffect(() => {
    if (editProfileForm) {
      setValue("fullName", editProfileForm.fullName || "");
      setValue("gender", editProfileForm.gender || "");
      setValue("phoneNumber", editProfileForm.phoneNumber || "");
    }
  }, [editProfileForm, setValue]);

  const submitPatientFormData = async (formData: patientType) => {
    const success = await handleEditPatientProfile(formData);
    if (success) {
      window.location.href = "/";
      // after successful signup, display profile-pic, turn-off login/signup button,
    }
  };

  return (
    <>
      {loading && editProfileForm === null && <Loading />}
      {!loading && editProfileForm !== null && (
        <div className="flex flex-col justify-center items-center  mb-8 w-full mt-[80px]">
          <form
            onSubmit={handleSubmit(submitPatientFormData)}
            className="flex flex-col gap-2 mx-auto mt-1 w-[90%] max-w-[500px] border border-solid border-[rgb(255,255,255,0.2)] p-8 rounded"
          >
            <p className="text-center text-[24px] font-bold mb-5">
              Edit Your Profile
            </p>
            <div className="flex flex-col  md:flex-row  gap-2">
              <div className="grid gap-2 w-full md:w-3/4">
                <Input
                  className="block border border-solid border-[rgb(255,255,255,0.2)] rounded "
                  id="uniqueID"
                  type="text"
                  value={`Your card number is ${editProfileForm?.uniqueID}`}
                  placeholder="Full name"
                  disabled
                />
                <Input
                  className="block border border-solid border-[rgb(255,255,255,0.2)] rounded "
                  id="uniqueID"
                  type="text"
                  value={`Profile picture`}
                  placeholder="Full name"
                  disabled
                />
                <Label className="text-md">Full Name</Label>
                <Input
                  className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
                  id="fullName"
                  type="text"
                  placeholder="Full name"
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2 w-full md:w-1/4">
                <Label className="text-md">Gender</Label>
                <select
                  id="gender"
                  className="block  w-full border border-solid border-[rgb(255,255,255,0.2)]  p-2 bg-transparent rounded"
                  {...register("gender", { required: "Gender is required" })}
                >
                  <option className="text-white bg-[#151533]" value="">
                    Select
                  </option>
                  <option className="text-white bg-[#151533]" value="male">
                    Male
                  </option>
                  <option className="text-white bg-[#151533]" value="female">
                    Female
                  </option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-2 ">
              <Label className="text-md">Phone number</Label>
              <Input
                className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
                type="tel"
                placeholder="09-xxxxxxx or 07-xxxxxxxx"
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

export default EditProfile;
