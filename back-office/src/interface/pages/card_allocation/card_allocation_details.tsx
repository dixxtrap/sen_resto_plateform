
import { useGetCardAllocationDetailsQuery } from '../../../core/features/card_allocation.slice'
import { useParams } from 'react-router-dom'

import { DetailItem } from '../../components/details_item'
import { Details } from '../../components/details'
import { formatDate } from '../../utils/date_format'

export const CardAllocationDetails = () => {
  const {id}=useParams()
  const {data,isLoading, isError, isSuccess, error}=useGetCardAllocationDetailsQuery(id!)
console.log(data)
  return (
    <>
      <Details title={data?.data.label} error={error} isError={isError} isSuccess={isSuccess} isLoading={isLoading}>
        <>
      <DetailItem label={'label'} value={data?.data.label!}/>
               <DetailItem label={'Description'} value={data?.data.motif}/>
               <DetailItem label={'Quantité'} value={data?.data.quantity + ' Cartes'} />
               <DetailItem label={'Creer par'} value={`${data?.data.details?.by?.firstname} ${data?.data?.details?.by?.lastname!?? ''} (${+data?.data.details?.by?.phone!})  `} />
               {data?.data.acceptedBy&& <DetailItem label={'Actionner Par'} value={`${data?.data.acceptedBy?.firstname} ${data?.data?.acceptedBy?.lastname!?? ''} (${+data?.data.acceptedBy?.phone!})  `} />}
               {data?.data.rejectionMotif&& <DetailItem label={'raison du rejet'} value={`${data?.data.rejectionMotif}`} />}
               </>
            { data?.data.details?.createdAt!&&  <DetailItem label={'Creer au '} value={formatDate(data?.data.details?.createdAt!)} />}
            <DetailItem label={'Status'} value={<span className={data?.data.status}>{data?.data.status}</span>}/>
      </Details>

    </>
  )
}
