import { useParams } from "react-router-dom"
import { useGetBannerByIdQuery } from "../../../core/features/banner.slice"
import { Details } from "../../components/details"
import { DetailItem } from "../../components/details_item"
import { TextConstant } from "../../../core/data/textConstant"
import { formatDate } from "../../utils/date_format"


export const BannerDetails = () => {
  const {id}=useParams()
  const {data, isLoading, isError, isSuccess,error}=useGetBannerByIdQuery(id!)
  return (
    <Details isError={isError} isLoading={isLoading} isSuccess={isSuccess} error={error}>
{isSuccess&&<>
<DetailItem label={TextConstant.logo} value={<img alt="daxx" title='logo' className="h-20 rounded-md" src={data?.data?.imageUrl}/>}/>
<DetailItem label={TextConstant.name} value={data?.data?.title}/>
<DetailItem label={TextConstant.description} value={data?.data?.description}/>
<DetailItem label={TextConstant.startDate} value={formatDate(data?.data?.start!)}/>
<DetailItem label={TextConstant.endDate} value={formatDate(data?.data?.end!)}/></>}
    </Details>
  )
}
