import { useParams } from "react-router-dom"
import { useGetCustomerByIdQuery } from "../../../core/features/customer.slice"
import { Details } from "../../components/details";
import { DetailItem } from "../../components/details_item";
import { getWsMessage } from "../../../core/features/error_transformer";
import { TextConstant } from "../../../core/data/textConstant";

export const CustomerDetails = () => {
  const {id}=useParams()
  const {data,isLoading, isError, error , isSuccess}=useGetCustomerByIdQuery(id!);
  return (
    <Details title={data?.data.firstname?`${data?.data.firstname}`:data?.data.phone} isLoading={isLoading} isError={isError} error={error} isSuccess={isSuccess}>
      <DetailItem label={TextConstant.firstname} value={data?.data.firstname??TextConstant.notKnown}/>
      <DetailItem label={TextConstant.lastname} value={data?.data.lastname??TextConstant.notKnown}/>
      <DetailItem label={TextConstant.phone} value={data?.data.phone??TextConstant.notKnown}/>
    </Details>
  )
}
