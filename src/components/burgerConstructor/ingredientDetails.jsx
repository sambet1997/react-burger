import React from "react";
import { Modal } from "../modal/modal";
import styles from "./burgerConstructor.module.css";
import PropTypes from "prop-types";

const IngredientDetails = ({ isDetailsOpen, handleClose, ingredientInfo }) => {
  return (
    <>
      <Modal
        className={styles.ingredientsModal}
        open={isDetailsOpen}
        handleClose={handleClose}
        closeIcon
      >
        <div className={styles.modalContainer}>
          <p
            className={`text text_type_main-large mt-8 ml-10 ${styles.ingredientsModalTitle}`}
          >
            Детали ингредиента
          </p>
          <img
            alt="Картинка ингредиента"
            src={ingredientInfo.image_large}
            className={styles.image}
          />
          <p className="text text_type_main-medium mt-4">
            {ingredientInfo.name}
          </p>
          <div className={styles.pfc}>
            <div>
              <p className="text text_type_main-small mr-5">Калории, ккал</p>
              <p className="text text_type_digits-default mt-2">
                {ingredientInfo.calories}
              </p>
            </div>
            <div>
              <p className="text text_type_main-small mr-5">Белки, г</p>
              <p className="text text_type_digits-default mt-2">
                {ingredientInfo.proteins}
              </p>
            </div>
            <div>
              <p className="text text_type_main-small mr-5">Жиры, г</p>
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
    </>
  );
};

IngredientDetails.propTypes = {
  ingredientInfo: PropTypes.instanceOf(Object).isRequired,
  isDetailsOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default IngredientDetails;
