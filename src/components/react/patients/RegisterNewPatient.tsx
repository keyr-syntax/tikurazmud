import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-menubar";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  registerNewPatientStore,
  type patientType,
} from "@/store/patientAuthStore";
import { handleRegisterNewPatient } from "@/services/patientAuthService";

function RegisterNewPatient() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loading } = registerNewPatientStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<patientType>();

  const submitPatientFormData = async (formData: patientType) => {
    const success = await handleRegisterNewPatient(formData);
    if (success) {
      window.location.href = "/";
      // after successful signup, display profile-pic, turn-off login/signup button, add profile page and Logout option
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center  mb-8 w-full mt-[80px]">
        <form
          onSubmit={handleSubmit(submitPatientFormData)}
          className="flex flex-col gap-2 mx-auto mt-1 w-[90%] max-w-[500px] border border-solid border-[rgb(255,255,255,0.2)] p-8 rounded"
        >
          <p className="text-center text-[24px] font-bold mb-5">
            Register Patient
          </p>
          <div className="flex flex-col  md:flex-row  gap-2">
            <div className="grid gap-2 w-full md:w-3/4">
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
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
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

          <div className="grid gap-2 ">
            <Label className="text-md">Password</Label>
            <div className="relative">
              <Input
                className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password must be at least 4 characters",
                  },
                })}
              />
              <span
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff color="red" size={30} />
                ) : (
                  <Eye color="white" size={30} />
                )}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <Button
            disabled={loading}
            type="submit"
            className="bg-[#00C8FF] hover:bg-[#0099ff] text-black font-semibold text-md mt-5 rounded"
          >
            {loading ? "Please wait" : "Submit"}
          </Button>
          <div className="flex flex-row gap-2 mx-auto my-4">
            <span>Already have an account?</span>
            <a className="text-blue-700" href="/patients/login">
              Login
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterNewPatient;
