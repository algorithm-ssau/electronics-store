import React from "react";
import { useDispatch } from "react-redux";
import { ButtonBuyProps } from "./ButtonBuyProps";
import { addItemToCart } from "../../store/action-creators/shoppingCartActionCreator";

export const ButtonBuy: React.FC<ButtonBuyProps> = (props) => {
  const { productId } = props;
  const dispatch = useDispatch();
  return (
    <div className="productButtonBlock">
      <button className="buttonBlock" type="button" onClick={async () => dispatch(addItemToCart(productId))}>
        Купить
      </button>
    </div>
  );
};
