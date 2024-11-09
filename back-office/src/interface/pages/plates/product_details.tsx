
import { useParams } from "react-router-dom";
import { Title } from "../../components/title";

import { formatDate } from "../../utils/date_format";
import { Fetchingdata } from "../../components/fetching_data";
import {Image} from "@mantine/core"
import { productApi } from "../../../core/features/product.slice";
export const PlatesDetails = () => {
  const { id } = useParams();
  const product= productApi.useGetProductByIdQuery(parseInt(id!));

  return (
    <>
    {/* <Alert isOpen={isLoading}/> */}
      <Fetchingdata {...product}>
        <div className="flex gap-x-3 shrink-0 items-center">
        
         <Image alt="img" title="image" src={`${product.data?.data?.file![0].path!}` } className="h-20 rounded-md"/>

          <Title
            title={product.data?.data?.name}
            subTitle={`les details du restaurant ${product.data?.data?.name}`}
          />
        </div>
        <div className="mt-6 border-t text-left border-gray-500/20">
          <dl className="divide-y divide-gray-500/20">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 textSubtile">
                Nom{" "}
              </dt>
              <dd className="mt-1 text-sm leading-6 textSubtileValue sm:col-span-2 sm:mt-0">
                {product.data?.data?.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 textSubtile">
                Prix
              </dt>
              <dd className="mt-1 text-sm leading-6 textSubtileValue sm:col-span-2 sm:mt-0">
                {product.data?.data?.price} F CFA
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 textSubtile">
                Reduction
              </dt>
              <dd className="mt-1 text-sm leading-6 textSubtileValue sm:col-span-2 sm:mt-0">
                {product.data?.data?.reduction}%
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 textSubtile">
                Description
              </dt>
              <dd className="mt-1 text-sm leading-6 textSubtileValue sm:col-span-2 sm:mt-0">
                {product.data?.data?.description}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 textSubtile">
                Date de creation
              </dt>
              <dd className="mt-1 text-sm leading-6 textSubtileValue sm:col-span-2 sm:mt-0">
                {product.data?.data?.details?.createdAt &&formatDate(product.data?.data?.details?.createdAt)}
              </dd>
            </div>
           
              
              
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 textSubtile">
                Image
              </dt>
              <dd className="mt-1 text-sm  flex textSubtileValue gap-x-2  sm:col-span-2 sm:mt-0">
           { product.data?.data?.file?.map((e) => (<img key={`${e.path}`}  title="daxx" alt={`${product.data?.data?.description}`} src={`${e.path}`}  className="h-20 rounded-md" />
                ))}
              </dd>
            </div>
        
          </dl>
        </div>
      </Fetchingdata>
   </>
  );
};
