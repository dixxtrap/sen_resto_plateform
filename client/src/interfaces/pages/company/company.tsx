import { baseApi } from "../../../cores/apis/api"
import { HomeCompanyItem } from "../home/widget/home_company_item"

export const Company = () => {
    const companiApi=baseApi.useGetCompanyQuery();
  return (
    <>
    <div className="h-20">

    </div>
    <div className="grid grid-cols-2 gap-3  md:gap-8   sm:grid-cols-2 px-3 md:grid-cols-3 lg:grid-cols-4">
        {companiApi.data?.data.map((e)=><HomeCompanyItem  key={`/company/details/${e.id}`} company={e}/>)}
    </div>
    </>
  )
}
