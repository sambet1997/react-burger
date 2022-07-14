import React from 'react';
import styles from './burgerConstructor.module.css';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';

const IngredientDetails = ({
    isDetailsOpen,
    handleClose,
    ingredientInfo,
    title,
}) => {
    return (
        <Modal show={isDetailsOpen} close={handleClose} title={title}>
            <div className={styles.modalContainer}>
                <img
                    alt="Картинка ингредиента"
                    src={ingredientInfo.image_large}
                    className={styles.image}
                />
                <p className="text text_type_main-medium mt-4">
                    {ingredientInfo.name}
                </p>
                <div className={styles.pfc}>
                    <div className="mr-5">
                        <p className="text text_type_main-small">
                            Калории, ккал
                        </p>
                        <p className="text text_type_digits-default mt-2">
                            {ingredientInfo.calories}
                        </p>
                    </div>
                    <div className="mr-5">
                        <p className="text text_type_main-small">Белки, г</p>
                        <p className="text text_type_digits-default mt-2">
                            {ingredientInfo.proteins}
                        </p>
                    </div>
                    <div className="mr-5">
                        <p className="text text_type_main-small">Жиры, г</p>
                        <p className="text text_type_digits-default mt-2">
                            {ingredientInfo.fat}
                        </p>
                    </div>
                    <div>
                        <p className="text text_type_main-small">Углеводы, г</p>
                        <p className="text text_type_digits-default mt-2">
                            {ingredientInfo.carbohydrates}
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

IngredientDetails.propTypes = {
    ingredientInfo: PropTypes.instanceOf(Object).isRequired,
    isDetailsOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    tittle: PropTypes.string,
};

export default IngredientDetails;
