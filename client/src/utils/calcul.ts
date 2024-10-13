import { OrderDto } from "../cores/models/order.dto";

export const reductionPrice = ({
  price,
  reduction,
}: {
  price: number;
  reduction: number;
}) => {
  return `${Math.round(price * (1 - reduction / 100))} ${
    import.meta.env.VITE_REACT_CURRENCY
  }`;
};

export const priceFormated = ({ price }: { price: number }) =>
  `${Math.round(price)} ${import.meta.env.VITE_REACT_CURRENCY}`;

export const totalPrice = (order: OrderDto,{add=0}:{add:number}) =>
  order.products
    .map((_e, j) => j)
    .map(
      (i) =>
        (Number(
          order.products[i]?.productHistory.price *
            (100 - (order.products[i]?.productHistory.reduction! ?? 0))
        ) /
          100) *
        order.products[i].quantity
    )
    .reduce((p1, p2) => p1 + p2) + add;

export const totalPriceFormated = (order: OrderDto, {add=0}:{add:number}) =>
  `${totalPrice(order,{add})} ${import.meta.env.VITE_REACT_CURRENCY}`;


export const formatDate = (date: string) =>
  date.substring(0, 16).replace("T", " ");
