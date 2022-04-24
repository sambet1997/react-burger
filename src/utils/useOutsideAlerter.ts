// util from my own DS
import * as React from "react";
const { useEffect } = React;

export const useOutsideAlerter = (
  cb: (props?: any) => void,
  ...refs: React.RefObject<any>[]
) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      refs.every(
        (ref) =>
          (ref.current && !ref.current.contains(event.target)) || !ref.current
      )
    ) {
      cb();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};
