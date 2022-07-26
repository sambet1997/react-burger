import React from 'react';
import checkMarkIcon from '../../icons/graphics.svg';
import styles from './burgerConstructor.module.css';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import { useSelector } from 'react-redux';

const OrderDetails = ({ isOrder, handleClose }) => {
    const orderNumber = useSelector((state) => state.data.order);
    return (
        <Modal show={isOrder} close={handleClose}>
            <div className={styles.modalContainer}>
                <p
                    className={`text text_type_digits-large mt-4 ${styles.orderNumber}`}
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
                <p
                    className={`text text_type_main-small mt-2 mb-15 ${styles.customText}`}
                >
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </Modal>
    );
};

OrderDetails.propTypes = {
    isOrder: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default OrderDetails;
