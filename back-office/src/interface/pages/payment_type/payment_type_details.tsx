import { useParams } from "react-router-dom"
import { useGetPaymentTypeByIdQuery } from "../../../core/features/payment_type.slice"
import { Details } from "../../components/details"
import { DetailItem } from "../../components/details_item"
import { TextConstant } from "../../../core/data/textConstant"

export const PaymentTypeDetails = () => {
  const {id}=useParams()
  const {data, isLoading , isSuccess, isError, error}=useGetPaymentTypeByIdQuery(id!)
  return (
   <Details title={data?.data.name} isError={isError} isSuccess={isSuccess} isLoading={isLoading} error={error}>
<DetailItem label={TextConstant.logo} value={<img title='logo'  className="h-20 rounded-md" src={data?.data.imagePath}/>}/>
<DetailItem label={TextConstant.lastname} value={data?.data.name}/>
<DetailItem label={TextConstant.shortname} value={data?.data.shortname}/>
<DetailItem label={TextConstant.email} value={data?.data.email}/>
<DetailItem label={TextConstant.phone} value={data?.data.phone}/>
<DetailItem label={TextConstant.fees} value={data?.data.fees+'%'}/>
<DetailItem label={TextConstant.revertFees} value={data?.data.fees+'%'}/>
   </Details>
  )
}
