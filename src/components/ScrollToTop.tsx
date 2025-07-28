import { CircleArrowUp } from "lucide-react";
import React, { useState, useEffect } from "react";

const showAfter = 200;
const size = 50;
const offset = 25;

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.pageYOffset > showAfter);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const style: React.CSSProperties = {
    position: "fixed",
    right: offset,
    bottom: offset,
    width: size,
    height: size,
    backgroundColor: "green",
    color: "#fff",
    borderRadius: "50%",
    border: "none",
    display: visible ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    opacity: visible ? 1 : 0,
    transition: "opacity 0.3s",
    zIndex: 1000,
  };

  return (
    <>
      <CircleArrowUp onClick={onClick} style={style} />
    </>
  );
};
