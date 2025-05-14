import useClickOutside from "@/lib/utils";
import { MenuIcon, Search, X } from "lucide-react";
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { SearchInput } from "../ui/input";
import { searchSuggestionStore } from "@/store/searchStore";
import SearchSuggestion from "./search/SearchSuggestion";
import {
  handleDeletePatientAccount,
  handlePatientAuthentication,
  handlePatientLogout,
} from "@/services/patientAuthService";
import { authenticatePatientStore } from "@/store/patientAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
const NavigationMenu: React.FC = () => {
  const { query } = searchSuggestionStore();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { isAuthenticated, isPatient, username } = authenticatePatientStore();
  const getFirstLetterOfName = (username: string) =>
    username.charAt(0).toUpperCase();

  useEffect(() => {
    handlePatientAuthentication();
  }, []);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside({ menuRef, setMenuOpen });

  const deleteAccount = async () => {
    const success = await handleDeletePatientAccount();
    if (success) {
      window.location.href = "/";
    }
  };

  return (
    <>
      <div
        className="flex flex-row items-center md:justify-evenly m-auto w-full overflow-auto border border-solid 
        border-[rgb(255,255,255,0.2)] fixed top-0 left-0 right-0"
        style={{ zIndex: 1000 }}
      >
        <a
          className="text-nowrap p-[16px] no-underline text-[22px] text-center mr-auto ml-6"
          href="/"
        >
          Tikur Azmud
        </a>

        <a
          className="md:flex hidden gap-2 items-center text-nowrap  p-[12px] no-underline text-lg text-center mr-auto"
          href="/"
        >
          Emergency
        </a>
        <a
          className="md:flex hidden gap-2 items-center text-nowrap  p-[12px] no-underline text-lg text-center mr-auto"
          href="/"
        >
          Doctors
        </a>
        <a
          className="md:flex hidden gap-2 items-center text-nowrap  p-[12px] no-underline text-lg text-center mr-auto"
          href="/"
        >
          Download App
        </a>

        {isAuthenticated && isPatient && username !== null ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-3 ml-auto mr-16">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold text-lg cursor-pointer">
                  {getFirstLetterOfName(username)}
                </div>
                <span className="hidden sm:block text-white text-base font-medium cursor-pointer">
                  {username}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 my-4 mr-2 bg-[#151533]">
              <DropdownMenuLabel
                onClick={() => {
                  window.location.href = "/patients/profile";
                }}
                className="border border-[rgb(255,255,255,0.2)] font-normal text-[18px] cursor-pointer"
              >
                Profile
              </DropdownMenuLabel>
              <DropdownMenuLabel
                onClick={() => {
                  // window.location.href = "/patients/profile";
                }}
                className="border border-[rgb(255,255,255,0.2)] font-normal text-[18px] cursor-pointer"
              >
                Change password
              </DropdownMenuLabel>
              <DropdownMenuLabel
                onClick={() => {
                  handlePatientLogout();
                }}
                className="border border-[rgb(255,255,255,0.2)] font-normal text-[18px] cursor-pointer"
              >
                Logout
              </DropdownMenuLabel>

              <DropdownMenuLabel
                onClick={() => {
                  // window.location.href = "/patients/profile";
                }}
                className="border border-[rgb(255,255,255,0.2)] font-normal text-[18px] cursor-pointer text-red-700"
              >
                <AlertDialog>
                  <AlertDialogTrigger>Delete Account</AlertDialogTrigger>
                  <AlertDialogContent className="bg-[#151533]">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-white">
                        This action cannot be undone. This will permanently
                        delete your account.
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
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2 items-center text-nowrap  p-[12px] no-underline text-lg text-center ml-auto mr-14">
            <a href="/patients/login">Login</a>
            <a className="hidden sm:block" href="/patients/signup">
              /Signup
            </a>
          </div>
        )}

        {!menuOpen && (
          <MenuIcon
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            size={32}
            className="md:hidden cursor-pointer absolute right-5"
          />
        )}
        {menuOpen && (
          <X
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            size={32}
            className="md:hidden cursor-pointer absolute right-5"
          />
        )}
      </div>
      <div className="w-[90%] md:w-[50%] mt-20 mx-auto relative">
        <SearchInput
          className="w-full pl-12 pr-4 py-2 border border-[rgb(255,255,255,0.2)] rounded"
          type="text"
          placeholder="Symptoms, Doctors, Specialty..."
          value={query}
          onChange={(e) => {
            searchSuggestionStore.setState({
              query: e.target.value,
            });
          }}
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      {menuOpen && (
        <div
          ref={menuRef}
          className="flex flex-col overflow-hidden md:hidden  mr-auto w-[90%] h-full   fixed top-16 left-0 right-0  border-r-[rgb(255,255,255,0.2)]"
          style={{ zIndex: 1000 }}
        >
          <a
            className="md:hidden  gap-2 items-center text-nowrap  p-[12px] no-underline text-lg text-center mr-auto ml-8"
            href="/"
          >
            Emergency
          </a>
          <a
            className="md:hidden  gap-2 items-center text-nowrap  p-[12px] no-underline text-lg text-center mr-auto ml-8"
            href="/"
          >
            Doctors
          </a>
          <a
            className="md:hidden  gap-2 items-center text-nowrap  p-[12px] no-underline text-lg text-center mr-auto ml-8"
            href="/"
          >
            Download App
          </a>
        </div>
      )}
      <SearchSuggestion />
    </>
  );
};

export default NavigationMenu;
