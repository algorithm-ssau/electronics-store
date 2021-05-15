import { Dispatch } from "redux";
import { ProductProps } from "../../ui/product/ProductProps";
import { itemAddPerform, itemRemovePerform } from "../../ui/shopping-cart/ShoppingCartActions";
import { fetchProduct } from "../../network/fetchProduct";

export const addItemToCart = (productId: ProductProps["id"]) => {
  return async (dispatch: Dispatch) => {
    const product = await fetchProduct(productId);
    dispatch(itemAddPerform(product));
  };
};

export const removeItemFromCart = (productId: ProductProps["id"]) => {
  return async (dispatch: Dispatch) => {
    const product = await fetchProduct(productId);
    dispatch(itemRemovePerform(product));
  };
};
