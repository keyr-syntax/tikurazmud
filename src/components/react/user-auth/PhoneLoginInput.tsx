import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { userAuthenticationStore } from "@/store/userAuthStore";
import {
  userPhoneRedirectStore,
  type userPhoneRedirectType,
} from "@/store/userAuthStore";
import { handleUserRedirect } from "@/services/userAuthService";

function PhoneLoginInput() {
  const { isAuthenticated, isPatient, isPhysician, isAdmin } =
    userAuthenticationStore();
  const { loading } = userPhoneRedirectStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userPhoneRedirectType>();

  return (
    <>
      <AlertDialog>
        {!isAuthenticated && !isAdmin && !isPatient && !isPhysician && (
          <AlertDialogTrigger className="text-lg text-center ml-auto mr-18">
            Login
          </AlertDialogTrigger>
        )}
        <AlertDialogContent className="bg-[#151533]">
          <form
            onSubmit={handleSubmit(handleUserRedirect)}
            className="flex flex-col gap-2 mx-auto mt-1 w-[90%] max-w-[500px]  p-8 rounded"
          >
            <div className="grid gap-2 ">
              <AlertDialogTitle>Phone number</AlertDialogTitle>
              <AlertDialogDescription></AlertDialogDescription>
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
          <AlertDialogCancel className="bg-red-500 w-[40%] m-auto">
            Cancel
          </AlertDialogCancel>
          <div className="flex flex-row gap-2 mx-auto my-4">
            <span>You don't have account?</span>
            <a className="text-blue-700" href="/patients/patient-signup">
              Signup
            </a>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default PhoneLoginInput;
