import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { handleDeleteDoctorAccount } from "@/services/doctorAuthService";

function DeleteDoctorAccount() {
  const deleteDoctorAccount = async () => {
    const success = await handleDeleteDoctorAccount();
    if (success) {
      window.location.href = "/";
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="text-red-700">
          Delete Account
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[#151533]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This action cannot be undone. This will permanently delete your
              account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-white bg-green-500">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteDoctorAccount();
              }}
              className="bg-red-700 text-white"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default DeleteDoctorAccount;
