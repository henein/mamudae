import React, { createContext, useEffect, useState } from 'react';

export const ScrollContext = createContext({
  stickyTop: false,
  isScrollDown: false,
});

export const ScrollProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [stickyTop, setStickyTop] = useState(false);
  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = (): void => {
      window.scrollY > 16 ? setStickyTop(true) : setStickyTop(false);
      const currentScrollPos = window.pageYOffset;
      setIsScrollDown(currentScrollPos > prevScrollPos && window.scrollY > 64);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ stickyTop, isScrollDown }}>
      {props.children}
    </ScrollContext.Provider>
  );
};
