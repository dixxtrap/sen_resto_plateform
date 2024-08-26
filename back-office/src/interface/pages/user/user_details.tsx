import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../../core/features/auth.slice";
import { Details } from "../../components/details";
import { DetailItem } from "../../components/details_item";
import { TextConstant } from "../../../core/data/textConstant";

export const UserDetails = () => {
  const {id}=useParams()
  const {
    data,
    isSuccess,
    isLoading,

     isError,
     error
  } = useGetUserByIdQuery(parseInt(id!));
  return (
   <Details isError={isError} title={`${data?.data.firstname} ${data?.data.lastname}`} isSuccess={isSuccess} error={error} isLoading={isLoading}>
<DetailItem label={TextConstant.firstname} value={data?.data.firstname}/>
<DetailItem label={TextConstant.lastname} value={data?.data.lastname}/>
<DetailItem label={TextConstant.phone} value={data?.data.phone}/>
<DetailItem label={TextConstant.email} value={data?.data.email}/>
<DetailItem label={TextConstant.address} value={`${data?.data.address?.streetAddress}-${data?.data.address?.city}-${data?.data.address?.country}`}/>
{data?.data.parent&&<DetailItem label={'Organisation'} value={<div className="flex items-center gap-3">
  <img title="logo/org" className="h-8 rounded-md" src={data.data.parent.imagePath}/>
 { data?.data.parent?.name}
</div>}/>}
   </Details>
  )
}
