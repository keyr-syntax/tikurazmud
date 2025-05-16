import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-menubar";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  changeDoctorPasswordStore,
  type changeDoctorPasswordInterface,
} from "@/store/doctorAuthStore";
import { handleChangeDoctorPassword } from "@/services/doctorAuthService";

function ChangeDoctorPassword() {
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const { loading } = changeDoctorPasswordStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<changeDoctorPasswordInterface>();

  const submitDoctorPassword = async (
    formData: changeDoctorPasswordInterface
  ) => {
    const success = await handleChangeDoctorPassword(formData);
    if (success) {
      window.location.href = "/";
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="cursor-pointer">
          Change password
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[#151533]">
          <form
            onSubmit={handleSubmit(submitDoctorPassword)}
            className="flex flex-col gap-2 mx-auto mt-1 w-[90%] max-w-[500px]  p-8 rounded"
          >
            <p className="text-center text-[18px] font-bold mb-5">
              Change password
            </p>
            <div className="grid gap-2 ">
              <Label className="text-md">Old password</Label>
              <div className="relative">
                <Input
                  className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
                  type={showOldPassword ? "text" : "oldPassword"}
                  placeholder="Old password"
                  {...register("oldPassword", {
                    required: "Old password is required",
                    minLength: {
                      value: 4,
                      message: "Password must be at least 4 characters",
                    },
                  })}
                />
                <span
                  onClick={() => {
                    setShowOldPassword(!showOldPassword);
                  }}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                >
                  {showOldPassword ? (
                    <EyeOff color="red" size={30} />
                  ) : (
                    <Eye color="white" size={30} />
                  )}
                </span>
              </div>
              {errors.oldPassword && (
                <p className="text-red-500 text-sm">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>
            <div className="grid gap-2 ">
              <Label className="text-md">New password</Label>
              <div className="relative">
                <Input
                  className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
                  type={showNewPassword ? "text" : "newPassword"}
                  placeholder="New password"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 4,
                      message: "Password must be at least 4 characters",
                    },
                  })}
                />
                <span
                  onClick={() => {
                    setShowNewPassword(!showNewPassword);
                  }}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                >
                  {showNewPassword ? (
                    <EyeOff color="red" size={30} />
                  ) : (
                    <Eye color="white" size={30} />
                  )}
                </span>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
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
          <AlertDialogCancel className="bg-red-500 w-[40%] m-auto">
            Cancel
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ChangeDoctorPassword;
