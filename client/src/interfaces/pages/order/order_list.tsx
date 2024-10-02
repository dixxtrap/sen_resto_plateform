import { useGetBagQuery } from '../../../cores/apis/order.slice'
import { Fetchingdata } from '../../components/fetching_data'
import { OrderWidget } from './widget/order_widget';

export const OrderList = () => {
  const order=useGetBagQuery()
  return (
    <Fetchingdata {...order}>
      
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 p-3">
          {order.data?.data.map((e) => (
            <OrderWidget key={e.partnerId} order={e} />
          ))}
        </div>
      
    </Fetchingdata>
  );
}
