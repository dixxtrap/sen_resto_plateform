import React from 'react'
import { useGetBagQuery } from '../../../cores/apis/order.slice'
import { Fetchingdata } from '../../components/fetching_data'
import { OrderWidget } from './widget/order_widget';

export const OrderList = () => {
  const {data,isLoading, isSuccess, isError}=useGetBagQuery('')
  return (
    <Fetchingdata isError={isError} isSuucess={isSuccess} isLoading={isLoading}>
      {data && (
        <div className="flex flex-col gap-3 p-3">
          {data.data.map((e) => (
            <OrderWidget order={e} />
          ))}
        </div>
      )}
    </Fetchingdata>
  );
}
