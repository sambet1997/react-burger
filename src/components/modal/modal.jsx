import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import * as React from "react";

const Modal = ({ show, close, title, children }) => {
  useEffect(() => {
    const onClose = (e) => {
      if (e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", onClose);
    return () => window.removeEventListener("keydown", onClose);
  }, [close]);
  return ReactDOM.createPortal(
    <>
      {show ? (
        <div className={styles.modalContainer} onClick={() => close()}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <header className={styles.header}>
              <p className="text text_type_main-large">{title}</p>
              <CloseIcon type="primary" onClick={() => close()} />
            </header>
            <main> {children} </main>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
