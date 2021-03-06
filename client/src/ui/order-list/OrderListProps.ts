import { ProductProps } from "../product/ProductProps";
import { ActionMessage } from "../../interfaces/ActionMessage";

export interface CartDB {
  product_id: string;
  count: number;
}

export interface OrderDB {
  status: string;
  products: CartDB[];
  date: string;
  total: number;
}

export interface OrderEntrance {
  productId: ProductProps["id"];
  count: number;
}

export interface Order {
  orderId: string;
  orderStatus: string;
  products: OrderEntrance[];
  date: string;
  total: number;
}

export interface OrderListProps {
  orders: Order[];
  loading: boolean;
  message: ActionMessage;
}
