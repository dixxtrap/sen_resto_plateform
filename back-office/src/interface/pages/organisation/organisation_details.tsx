import { useGetCompanyByIdQuery } from "../../../core/features/company.slice";
import { useParams } from "react-router-dom";
import { Img } from "../../components/image_updatable";
import { Title } from "../../components/title";
import { Alert } from "../../components/alert_success";

export const OrganisationDetails = ({}:{type?:string}) => {
  
  const { id } = useParams();
  const {
    data: company,
    isLoading,
  } = useGetCompanyByIdQuery(id!);
  return (<> <Alert isOpen={isLoading} type="loading" />
   { company&&<div>
      <div className="flex gap-x-3 shrink-0 items-center">
        <Img
          className="h-8  md:h-20"
          hasImg={company!.data.imagePath!==null}
          imgPath={company?.data.imagePath}
        />
        <Title
          title={company?.data.name}
          subTitle={`les details du restaurant ${company?.data.name}`}
        />
      </div>
      <div className="mt-6 border-t text-left border-gray-500">
        <dl className="divide-y  divide-gray-500/20">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 textSubtitle  text subtitle">
              Nom 
            </dt>
            <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0 text value">
              {company?.data.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6  text subtitle">
              Email
            </dt>
            <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0  text value">
              {company?.data.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6   text subtitle">
              Addresse
            </dt>
            <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0  text value">
              {company?.data.address}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text subtitle ">
              Salary expectation
            </dt>
            <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0 text value">
              $120,000
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6  text subtitle">
              Description
            </dt>
            <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0 text value">
              {company?.data.description}
            </dd>
          </div>
          {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div> */}
        </dl>
      </div>
    </div>}
  </>);
};
