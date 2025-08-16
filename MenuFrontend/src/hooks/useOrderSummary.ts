
import { useSelector } from "react-redux";
import type { RootState } from "../app/app";

export function useOrderSummary() {
  const { orders } = useSelector((state: RootState) => state.menu);

  const totalPrice = orders.reduce((total, order) => {
    const price = order.item.discountedPrice ?? order.item.price;
    return total + price * order.count;
  }, 0);

  const totalCount = orders.reduce((count, order) => count + order.count, 0);

  return { totalPrice, totalCount };
}
