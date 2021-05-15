import React from "react";
import { useDispatch } from "react-redux";
import { Product } from "../product/Product";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { addItemToCart, removeItemFromCart } from "../../store/action-creators/shoppingCartActionCreator";
import { MakePurchaseComponent } from "../button-make-purchase/MakePurchaseComponent";

export const ShoppingCart = () => {
  const { productsInCart, totalPrice } = useTypedSelector((state) => state.shoppingCart);
  const { products } = useTypedSelector((state) => state.productList);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <div>Итоговая стоимость: ${totalPrice}</div>
      </div>
      <MakePurchaseComponent />
      <div className="product">
        {Array.from(productsInCart).map((itemInCart) => {
          const productId = itemInCart[0];
          const productAmount = itemInCart[1];
          const product = products.find((curProduct) => curProduct.id === productId);
          if (product === undefined) {
            return <div>Продукт не найден</div>;
          }
          return (
            <div key={product.id}>
              <Product {...product} />
              <div>
                <button type="button" onClick={() => dispatch(removeItemFromCart(productId))}>
                  -
                </button>
                <p>{productAmount}</p>
                <button type="button" onClick={() => dispatch(addItemToCart(productId))}>
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
