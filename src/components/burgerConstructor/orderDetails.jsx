import React from "react";
import { Modal } from "../modal/modal";
import checkMarkIcon from "../../icons/graphics.svg";
import styles from "./burgerConstructor.module.css";
import PropTypes from "prop-types";

const OrderDetails = ({ isOrder, handleClose }) => {
  const orderNumber = Math.floor(Math.random() * 1000000);
  return (
    <>
      <Modal
        open={isOrder}
        handleClose={handleClose}
        closeIcon
        className={styles.orderModal}
      >
        <div className={styles.modalContainer}>
          <p
            className={`text text_type_digits-large mt-30 ${styles.orderNumber}`}
          >
            {orderNumber}
          </p>
          <p className="text text_type_main-medium mt-8">
            идентификатор заказа
          </p>
          <img alt="" className={styles.orderIcon} src={checkMarkIcon} />
          <p className="text text_type_main-small mt-15">
            Ваш заказ начали готовить
          </p>
          <p className={`text text_type_main-small mt-2 ${styles.customText}`}>
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      </Modal>
    </>
  );
};

OrderDetails.propTypes = {
  isOrder: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default OrderDetails;
