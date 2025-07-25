import { useEffect } from "react";
import type { RefObject } from "react";

interface UseClickOutsideProps {
  menuRef: RefObject<HTMLElement | null>;

  setMenuOpen: (menuOpen: boolean) => void;
}

function useClickOutsideNavbarMenu({
  menuRef,
  setMenuOpen,
}: UseClickOutsideProps) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef, setMenuOpen]);
}

export default useClickOutsideNavbarMenu;
