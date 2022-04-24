// modal from my own DS (можно плиз не переписывать на портал? я понимаю разницу, оверлей и все остальное по дизайну :) )
import * as React from "react";
import styled from "styled-components";
import { useOutsideAlerter } from "../../utils/useOutsideAlerter";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import PropTypes from "prop-types";

export const Modal = ({
  children,
  className = "",
  closeIcon = false,
  color = "#262626",
  open = false,
  title,
  handleClose = () => {
    /**/
  },
}) => {
  const wrapperRef = React.useRef(null);
  useOutsideAlerter(handleClose, wrapperRef);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        handleClose(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [handleClose]);

  return (
    <ModalOverlay open={open}>
      <Dialog className={className} ref={wrapperRef}>
        <Header>
          <Title color={color}>{title}</Title>
          {closeIcon && (
            <Button onClick={handleClose}>
              <CloseIcon type="primary" />
            </Button>
          )}
        </Header>
        {children}
      </Dialog>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${({ open }) => (open ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 90;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Dialog = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px 24px 24px 24px;
  border-radius: 40px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.12),
    0px 12px 24px -6px rgba(0, 0, 0, 0.12);
  background-color: #1c1c21;
  overflow: scroll;
`;

const Title = styled.div`
  font-family: "SBSansInterface-Semibold";
  color: ${({ color }) => color};
  font-size: 20px;
  line-height: 28px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  position: relative;
`;

const Button = styled.button`
  position: absolute;
  top: 52px;
  right: 28px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0;
  min-width: 24px;
  min-height: 24px;
  border-radius: 12px;
  color: transparent;
  border-image: none;
  border: none;
  appearance: none;
  outline: none;
  transition: background-color 300ms cubic-bezier(0.37, 0, 0.63, 1) 0ms;
  background-color: ${"#1C1C21"};

  &:hover {
    background-color: transparent;
  }
`;

Modal.defaultProps = {
  title: "",
  color: "",
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  closeIcon: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
