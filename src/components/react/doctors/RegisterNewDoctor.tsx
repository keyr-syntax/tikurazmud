import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-menubar";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import {
  registerNewDoctorStore,
  type doctorType,
} from "@/store/doctorAuthStore";
import { handleRegisterNewDoctor } from "@/services/doctorAuthService";
import { Button } from "@/components/ui/button";

function RegisterNewDoctor() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loading } = registerNewDoctorStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<doctorType>();

  const submitDoctorFormData = async (formData: doctorType) => {
    const success = await handleRegisterNewDoctor(formData);
    if (success) {
      window.location.href = "/";
      // window.location.href = "/blog/ReactBlog";
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center  mb-8 w-full mt-[80px]">
        <form
          onSubmit={handleSubmit(submitDoctorFormData)}
          className="flex flex-col gap-2 mx-auto mt-1 w-[90%] max-w-[500px] border border-solid border-[rgb(255,255,255,0.2)] p-8 rounded"
        >
          <p className="text-center text-[24px] font-bold mb-5 ">
            Register Doctor
          </p>
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
          <div className="grid gap-2 w-1/2">
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
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <span
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
        </form>
      </div>
    </>
  );
}

export default RegisterNewDoctor;
