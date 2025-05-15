import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeletePatientAccount from "../patients/DeletePatientAccount";
import ChangePatientPassword from "../patients/ChangePatientPassword";
import { handlePatientLogout } from "@/services/patientAuthService";
import { userAuthenticationStore } from "@/store/userAuthStore";

function DropdownMenuForAdmin() {
  const { isAuthenticated, isPatient, isAdmin, username, profilePicture } =
    userAuthenticationStore();

  const getFirstLetterOfName = (username: string) =>
    username.charAt(0).toUpperCase();
  // Replace the login/signup button with a login-triage component which will identify user type with appropriate redirecting
  //   add physician and admin state
  return (
    <>
      {isAuthenticated && !isPatient && isAdmin && username !== null && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-3 ml-auto mr-16">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold text-lg cursor-pointer">
                {profilePicture !== null ? "" : getFirstLetterOfName(username)}
              </div>
              <span className="hidden sm:block text-white text-base font-medium cursor-pointer">
                {username}(Admin)
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 my-4 mr-2 bg-[#151533]">
            <DropdownMenuLabel
              onClick={() => {
                window.location.href = "/doctors/doctor-profile";
              }}
              className="border border-[rgb(255,255,255,0.2)] font-normal text-[18px] cursor-pointer"
            >
              Edit profile
            </DropdownMenuLabel>
            <DropdownMenuLabel className="border border-[rgb(255,255,255,0.2)] font-normal text-[18px] cursor-pointer">
              <ChangePatientPassword />
            </DropdownMenuLabel>
            <DropdownMenuLabel
              onClick={() => {
                handlePatientLogout();
              }}
              className="border border-[rgb(255,255,255,0.2)] font-normal text-[18px] cursor-pointer"
            >
              Logout
            </DropdownMenuLabel>

            <DropdownMenuLabel className="border border-[rgb(255,255,255,0.2)] font-normal text-[18px] cursor-pointer ">
              <DeletePatientAccount />
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}

export default DropdownMenuForAdmin;
