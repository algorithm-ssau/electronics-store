import { ProductListProps } from "./ProductListProps";
import { ProductAction } from "./ProductActionType";

const initialState: ProductListProps = { products: [], loading: false, error: "" };

export const productListReducer = (state = initialState, action: ProductAction): ProductListProps => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      return { ...state, products: [...state.products, action.payload] };
    }
    case "REMOVE_PRODUCT": {
      return { ...state, products: state.products.filter((product) => product.id === action.payload) };
    }
    case "UPDATE_PRODUCT": {
      return {
        ...state,
        products: [...state.products.filter((product) => product.id !== action.payload.id), action.payload],
      };
    }
    case "FETCH_PRODUCTS": {
      return {
        ...state,
        loading: true,
      };
    }
    case "FETCH_PRODUCTS_ERROR": {
      return { ...state, error: action.payload, loading: false };
    }
    case "FETCH_PRODUCTS_SUCCESS": {
      return { ...state, products: action.payload, loading: false };
    }
    default:
      return state;
  }
};