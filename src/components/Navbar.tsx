import { useRef, useState } from "react";
import { MenuIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutsideNavbarMenu from "@/lib/ClickOutsideNavbarMenu";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutsideNavbarMenu({ menuRef, setMenuOpen });
  const scrollToIdWithOffset = (id: string) => {
    const yOffset = -100; // Adjust this value to match your navbar height (px)
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        className="bg-[#151533] flex flex-row items-center md:justify-evenly m-auto w-full overflow-auto   fixed top-0 left-0 right-0  text-white"
        style={{ zIndex: 1000 }}
      >
        <a
          className="text-nowrap p-[22px] no-underline text-[24px] text-center "
          href="/"
        >
          Onco Care Ethiopia
        </a>
        <p
          onClick={() => {
            scrollToIdWithOffset("aboutus");
          }}
          className="md:flex hidden gap-2 items-center text-nowrap  p-[12px] no-underline text-lg text-center cursor-pointer "
        >
          About Us
        </p>
        <p
          onClick={() => {
            scrollToIdWithOffset("ourprofessionals");
          }}
          className="md:flex hidden gap-2 items-center text-nowrap  p-[12px] no-underline text-lg text-center cursor-pointer"
        >
          Our Professionals
        </p>
        <p
          onClick={() => {
            scrollToIdWithOffset("services");
          }}
          className="md:flex hidden gap-2 items-center text-nowrap  p-[12px] no-underline text-lg text-center cursor-pointer "
        >
          Services
        </p>
        <p
          onClick={() => {
            scrollToIdWithOffset("contactus");
          }}
          className="md:flex hidden gap-2 items-center text-nowrap  p-[12px] no-underline text-lg text-center cursor-pointer "
        >
          Contact Us
        </p>
        <p
          onClick={() => {
            scrollToIdWithOffset("location");
          }}
          className="md:flex hidden gap-2 items-center text-nowrap  p-[12px] no-underline text-lg text-center cursor-pointer "
        >
          Location
        </p>
        {!menuOpen && (
          <MenuIcon
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            size={30}
            className="md:hidden cursor-pointer absolute right-5"
          />
        )}
        {menuOpen && (
          <X
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            size={30}
            className="md:hidden cursor-pointer absolute right-5"
          />
        )}
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#151533] flex flex-col overflow-hidden md:hidden  mx-auto w-full  border border-solid border-borderColor  fixed top-18 left-0 right-0 text-white"
            style={{ zIndex: 1000 }}
          >
            <p
              onClick={() => {
                scrollToIdWithOffset("aboutus");
                setTimeout(() => setMenuOpen(false), 1000);
              }}
              className="flex md:hidden gap-2 items-center text-nowrap p-[12px] no-underline text-lg text-center cursor-pointer"
            >
              About Us
            </p>

            <p
              onClick={() => {
                scrollToIdWithOffset("ourprofessionals");
                setTimeout(() => setMenuOpen(false), 1000);
              }}
              className="flex md:hidden gap-2 items-center text-nowrap p-[12px] no-underline text-lg text-center cursor-pointer"
            >
              Our Professionals
            </p>
            <p
              onClick={() => {
                scrollToIdWithOffset("services");
                setTimeout(() => setMenuOpen(false), 1000);
              }}
              className="flex md:hidden gap-2 items-center text-nowrap p-[12px] no-underline text-lg text-center cursor-pointer"
            >
              Services
            </p>
            <p
              onClick={() => {
                scrollToIdWithOffset("contactus");
                setTimeout(() => setMenuOpen(false), 1000);
              }}
              className="flex md:hidden gap-2 items-center text-nowrap p-[12px] no-underline text-lg text-center cursor-pointer"
            >
              Contact Us
            </p>
            <p
              onClick={() => {
                scrollToIdWithOffset("location");
                setTimeout(() => setMenuOpen(false), 1000);
              }}
              className="flex md:hidden gap-2 items-center text-nowrap p-[12px] no-underline text-lg text-center cursor-pointer"
            >
              Location
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
