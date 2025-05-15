import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-menubar";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  loginDoctorStore,
  type loginDoctorType,
} from "@/store/doctorAuthStore";
import { handleDoctorLogin } from "@/services/doctorAuthService";

function LoginDoctor() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loading } = loginDoctorStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginDoctorType>();

  const submitDoctorLoginData = async (formData: loginDoctorType) => {
    const success = await handleDoctorLogin(formData);
    if (success) {
      window.location.href = "/";
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center  mb-8 w-full mt-[80px]">
        <form
          onSubmit={handleSubmit(submitDoctorLoginData)}
          className="flex flex-col gap-2 mx-auto mt-1 w-[90%] max-w-[500px] border border-solid border-[rgb(255,255,255,0.2)] p-8 rounded"
        >
          <p className="text-center text-[24px] font-bold mb-5">Doctor Login</p>

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
        </form>
      </div>
    </>
  );
}

export default LoginDoctor;
