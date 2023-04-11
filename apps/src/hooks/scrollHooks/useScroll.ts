import React, { useEffect, useState } from "react";

const useScroll = () => {
  const [stickyTop, setStickyTop] = useState<boolean>(false);
  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = (): void => {
      window.scrollY > 16 ? setStickyTop(true) : setStickyTop(false);
      const currentScrollPos = window.pageYOffset;
      setIsScrollDown(currentScrollPos > prevScrollPos && window.scrollY > 64);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { stickyTop, isScrollDown };
};

export default useScroll;
