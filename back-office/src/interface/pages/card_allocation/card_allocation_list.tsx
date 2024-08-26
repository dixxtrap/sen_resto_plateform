
import { useGetCardAllocationQuery } from '../../../core/features/card_allocation.slice'
import { TablePagination } from '../../components/table/table'
import { formatDate } from '../../utils/date_format'
import { Link } from 'react-router-dom'
import { PathRouter } from '../../router/path.route'
import { AccepteCardAllocation } from './widget/accepted'
import { AllocationStatusEnum } from '../../../core/models/card_allocation.dto'
import { useProfileQuery } from '../../../core/features/security.slice'
import { RejectCardAllocation } from './widget/rejected'

export const CardAllocationList = () => {
    const{data:profile}=useProfileQuery('')
    const {data, isLoading, isError, isSuccess ,error}=useGetCardAllocationQuery('')
  return (
    <>
     
      <TablePagination
       isError={isError} isSuccess={isSuccess} isLoading={isLoading} error={error}
        createPath={`/${PathRouter.cardAllocation}/${PathRouter.create}`}
        createTitle='Nouvelle Allocatioin'

        th={[
          "label",
          "start Serial number",
          "end Serial number",
          "Quantity",
          "Date",
          "status",
          "",
        ]}
        trs={
          <>
            {data?.data.map((e) => (
              <tr>
                <td>{e.label}</td>
                <td>{e.startSerial}</td>
                <td>{e.endSerial}</td>
                <td>{e.quantity} Card</td>
                <td>{formatDate(e.details?.createdAt!)}</td>
                <td>
                  <span className={e.status?.replace(/\s/g, "")}>
                    {e.status}
                  </span>
                </td>
                <td className="last_td_container flex items-end justify-end">
                  {e.status == AllocationStatusEnum.initiate && (
                    <>
                      {" "}
                     <RejectCardAllocation  cardAllocation={e}/>
                    {profile?.parentId== e.receiverId&&  <AccepteCardAllocation cardAllocation={e} />}
                    </>
                  )}

                  <Link to={`/${PathRouter.cardAllocation}/details/${e.id}`} className="last_td default">
                    <span className="py-2">Details</span>
                  </Link>
                </td>
              </tr>
            ))}
          </>
        }
      />
    </>
  );
}
