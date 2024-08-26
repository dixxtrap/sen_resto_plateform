import { useGetBagQuery } from '../../../cores/apis/order.slice'
import { Fetchingdata } from '../../components/fetching_data'
import { OrderWidget } from './widget/order_widget';

export const OrderList = () => {
  const order=useGetBagQuery('')
  return (
    <Fetchingdata {...order}>
      
        <div className="flex flex-col gap-3 p-3">
          {order.data?.data.map((e) => (
            <OrderWidget order={e} />
          ))}
        </div>
      
    </Fetchingdata>
  );
}
