import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-menubar";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  loginPatientStore,
  type loginPatientType,
} from "@/store/patientAuthStore";
import { handlePatientLogin } from "@/services/patientAuthService";
import { userPhoneRedirectStore } from "@/store/userAuthStore";

function LoginPatient() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loading } = loginPatientStore();
  const { phoneNumber } = userPhoneRedirectStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<loginPatientType>();

  useEffect(() => {
    if (phoneNumber) {
      setValue("phoneNumber", phoneNumber);
    }
  }, [phoneNumber, setValue]);

  const submitPatientLoginData = async (formData: loginPatientType) => {
    const success = await handlePatientLogin(formData);
    if (success) {
      window.location.href = "/";
      // after successful signup, display profile-pic, turn-off login/signup button, add profile page and Logout option
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center  mb-8 w-full mt-[80px]">
        <form
          onSubmit={handleSubmit(submitPatientLoginData)}
          className="flex flex-col gap-2 mx-auto mt-1 w-[90%] max-w-[500px] border border-solid border-[rgb(255,255,255,0.2)] p-8 rounded"
        >
          <p className="text-center text-[24px] font-bold mb-5">
            Patient Login
          </p>

          <div className="grid gap-2 ">
            <Label className="text-md">Phone number</Label>
            <Label className="text-md">Pass Phone number:{phoneNumber}</Label>
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
            <span>Are you new patient?</span>
            <a className="text-blue-700" href="/patients/patient-signup">
              Signup
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPatient;
