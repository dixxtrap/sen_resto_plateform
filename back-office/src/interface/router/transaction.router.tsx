import { RouteObject } from "react-router-dom";
import {TransactionList} from "../pages/transaction/transaction_list";
import { TransactionDetails } from "../pages/transaction/transaction_details";
import { PathRouter } from "./path.route";

export const paymentRouter: RouteObject = {
  path:PathRouter.transaction,
  children: [
    {
      path: PathRouter.default,
      index: true,
      element: <TransactionList />,
    },
    {
      path: PathRouter.details,
      element: <TransactionDetails />,
    },
  ],
};
