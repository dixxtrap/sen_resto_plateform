
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
         {productManagement?.data.product?.file?.length!>0? 
         <img title="image" src={`${productManagement?.data.product?.file![0].path!}` } className="h-20 rounded-md"/>
         :<CakeIcon className="h-8  md:h-20 text-secondary-500 bg-secondary-100 p-2 rounded-md"/>}
          <Title
            title={productManagement?.data.product?.name}
            subTitle={`les details du restaurant ${productManagement?.data.product?.name}`}
          />
        </div>
        <div className="mt-6 border-t text-left border-gray-500/20">
          <dl className="divide-y divide-gray-500/20">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 textSubtile">
                Nom{" "}
              </dt>
              <dd className="mt-1 text-sm leading-6 textSubtileValue sm:col-span-2 sm:mt-0">
                {productManagement?.data.product?.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 textSubtile">
                Prix
              </dt>
              <dd className="mt-1 text-sm leading-6 textSubtileValue sm:col-span-2 sm:mt-0">
                {productManagement?.data.product?.price} F CFA
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 textSubtile">
                Reduction
              </dt>
              <dd className="mt-1 text-sm leading-6 textSubtileValue sm:col-span-2 sm:mt-0">
                {productManagement?.data.product?.reduction}%
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 textSubtile">
                Description
              </dt>
              <dd className="mt-1 text-sm leading-6 textSubtileValue sm:col-span-2 sm:mt-0">
                {productManagement?.data.product?.description}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 textSubtile">
                Date de creation
              </dt>
              <dd className="mt-1 text-sm leading-6 textSubtileValue sm:col-span-2 sm:mt-0">
                {productManagement?.data.product?.details?.createdAt &&formatDate(productManagement?.data.product?.details?.createdAt!)}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 textSubtile">
                Jours de Vente
              </dt>
              <dd className="mt-1 text-sm leading-6 textSubtileValue flex gap-x-5 flex-wrap sm:col-span-2 sm:mt-0">
               {productManagement?.data.productManagementDay?.map(managementDay=> <div className="flex  text-slate-600  items-center gap-x-2">
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
                {productManagement?.data.product?.file! &&productManagement?.data.product.file!?.length>0 ? productManagement?.data.product?.file!.map((e) => (
                  // <Img
                  //   className="h-8  md:h-16 rounded-md"
                  //   hasImg={e.photo.filename!==null&&e.photo.size!=0}
                  //   imgId={e.photoId}
                  // />
                 <img title="daxx" src={`${e.path}`}  className="h-20 rounded-md" />
                )):<CakeIcon className="h-8  md:h-20 text-indigo-500 bg-indigo-100 p-2 rounded-md"/>}
              </dd>
            </div>
        
          </dl>
        </div>
      </div>
   </>
  );
};
