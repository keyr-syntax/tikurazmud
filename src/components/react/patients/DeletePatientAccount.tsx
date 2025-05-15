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
import { handleDeletePatientAccount } from "@/services/patientAuthService";

function DeletePatientAccount() {
  const deleteAccount = async () => {
    const success = await handleDeletePatientAccount();
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
                deleteAccount();
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

export default DeletePatientAccount;
