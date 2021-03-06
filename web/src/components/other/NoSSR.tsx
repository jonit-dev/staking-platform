import { Fragment, useEffect, useState } from "react";

//@ts-ignore
export const NoSSR = ({ children, fallback = null }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <Fragment>{isMounted ? children : fallback}</Fragment>;
};
