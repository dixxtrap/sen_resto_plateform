import { Order } from 'src/typeorm/order.entity';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

export const orderBagSelect: FindOptionsSelect<Order> = {
  id: true,
  partnerId: true,
  description: true,
  cityId: true,
  address: true,
  fees: true,
  city: {
    id: true,
    name: true,
    parent: {
      id: true,
      name: true,
      parent: {
        id: true,
        name: true,
      },
    },
  },
  details: {
    createdAt: true,
    updatedAt: true,
  },
  partner: {
    name: true,
    type: true,
    imagePath: true,
    shortname: true,
    backgroundPath: true,
    parent: {
      id: true,
      name: true,
      shortname: true,
      type: true,
      imagePath: true,
      backgroundPath: true,
    },
  },
  products: {
    quantity: true,
    productHistoryId: true,
    productHistory: {
      productId: true,
      price: true,
      reduction: true,
      product: {
        id: true,
        name: true,
        cookingTime: true,
        description: true,
        file: { path: true },
        category: { id: true, name: true },
      },
    },
  },
};
