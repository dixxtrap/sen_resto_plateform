
import {  useGetProductManagementByIdQuery } from "../../../core/features/product.slice";
import { useParams } from "react-router-dom";
import { Alert } from "../../components/alert_success";
import { Title } from "../../components/title";

import { clsx } from "../../utils/clsx";
import { CakeIcon } from "@heroicons/react/20/solid";
import { formatDate } from "../../utils/date_format";

export const PlatesDetails = () => {
  const { id } = useParams();
  const {
    data: productManagement,
    isLoading
  } = useGetProductManagementByIdQuery(parseInt(id!));
  console.log(productManagement)
  return (
    <>
    <Alert isOpen={isLoading}/>
      <div>
        <div className="flex gap-x-3 shrink-0 items-center">
         {productManagement?.product?.file?.length!>0? 
         <img src={`/v1/${productManagement?.product?.file![0].path!}` } className="h-20 rounded-md"/>
         :<CakeIcon className="h-8  md:h-20 text-secondary-500 bg-secondary-100 p-2 rounded-md"/>}
          <Title
            title={productManagement?.product?.name}
            subTitle={`les details du restaurant ${productManagement?.product?.name}`}
          />
        </div>
        <div className="mt-6 border-t text-left border-gray-500/20">
          <dl className="divide-y divide-gray-500/20">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 textSubtile">
                Nom{" "}
              </dt>
              <dd className="mt-1 text-sm leading-6 textSubtileValue sm:col-span-2 sm:mt-0">
                {productManagement?.product?.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 textSubtile">
                Prix
              </dt>
              <dd className="mt-1 text-sm leading-6 textSubtileValue sm:col-span-2 sm:mt-0">
                {productManagement?.product?.price} F CFA
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 textSubtile">
                Reduction
              </dt>
              <dd className="mt-1 text-sm leading-6 textSubtileValue sm:col-span-2 sm:mt-0">
                {productManagement?.product?.reduction}%
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 textSubtile">
                Description
              </dt>
              <dd className="mt-1 text-sm leading-6 textSubtileValue sm:col-span-2 sm:mt-0">
                {productManagement?.product?.description}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 textSubtile">
                Date de creation
              </dt>
              <dd className="mt-1 text-sm leading-6 textSubtileValue sm:col-span-2 sm:mt-0">
                {productManagement?.product?.details?.createdAt &&formatDate(productManagement?.product?.details?.createdAt!)}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 textSubtile">
                Jours de Vente
              </dt>
              <dd className="mt-1 text-sm leading-6 textSubtileValue flex gap-x-5 flex-wrap sm:col-span-2 sm:mt-0">
               {productManagement?.productManagementDay?.map(managementDay=> <div className="flex  text-slate-600  items-center gap-x-2">
                  <span className="textSubtileValue">{managementDay.day?.name}</span>
                  <div
                  className={clsx(
                   managementDay.isActive ? "bg-secondary-400/20 " : "bg-slate-400/20",
                    " h-4 w-4 rounded-full p-1"
                  )}
                >
                  <div
                    className={clsx(
                      managementDay.isActive ? "bg-secondary-500  " : "bg-primary-400",
                      "rounded-full h-full w-full"
                    )}
                  ></div>
               
                  </div>
                </div>)}
              
                </dd>
                </div>
              
              
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 textSubtile">
                Image
              </dt>
              <dd className="mt-1 text-sm  flex textSubtileValue gap-x-2  sm:col-span-2 sm:mt-0">
                {productManagement?.product?.file! && productManagement?.product.file!?.length>0 ? productManagement?.product?.file!.map((e) => (
                  // <Img
                  //   className="h-8  md:h-16 rounded-md"
                  //   hasImg={e.photo.filename!==null&&e.photo.size!=0}
                  //   imgId={e.photoId}
                  // />
                 <img src={`/v1/${e.path}`}  className="h-20 rounded-md" />
                )):<CakeIcon className="h-8  md:h-20 text-indigo-500 bg-indigo-100 p-2 rounded-md"/>}
              </dd>
            </div>
            {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 textSubtile">Attachments</dt>
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
      </div>
   </>
  );
};
