import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useEffect, type RefObject } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const baseURL = "http://localhost:5000";

interface UseClickOutsideProps {
  menuRef: RefObject<HTMLElement>;
  setMenuOpen: (menuOpen: boolean) => void;
}

function useClickOutside({ menuRef, setMenuOpen }: UseClickOutsideProps) {
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

export default useClickOutside;
