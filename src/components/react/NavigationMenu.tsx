import useClickOutside from "@/lib/utils";
import { MenuIcon, Search, X } from "lucide-react";
import React from "react";
import { useRef, useState } from "react";
import { SearchInput } from "../ui/input";
import { searchSuggestionStore } from "@/store/searchStore";
import SearchSuggestion from "./search/SearchSuggestion";

const NavigationMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside({ menuRef, setMenuOpen });

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

        <a
          className="md:flex hidden gap-2 items-center text-nowrap  p-[12px] no-underline text-lg text-center ml-auto mr-8"
          href="/patients/login"
        >
          Login/Signup
        </a>
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
          <a
            className="md:hidden gap-2 items-center text-nowrap  p-[12px] no-underline text-lg text-center mr-auto ml-8"
            href="/patients/login"
          >
            Login/Signup
          </a>
        </div>
      )}
      <SearchSuggestion />
    </>
  );
};

export default NavigationMenu;
