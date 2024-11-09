import {  shopApi} from "../../../core/features/shop.slice";
import { useParams } from "react-router-dom";
import { Img } from "../../components/image_updatable";
import { Title } from "../../components/title";
import { Alert } from "../../components/alert_success";
import { DetailItem } from "../../components/details_item";


export const ShopDetails = () => {
  const { id } = useParams();
  const {
    data: shop,
    isLoading,
    isSuccess,
  } = shopApi.useGetShopByIdQuery(parseInt(id!));
  return (
    <div>
      {isLoading&&<Alert type="loading" isOpen={isLoading} />}
      {isSuccess && shop  && (
        <>
          <div className="flex gap-x-3 shrink-0 items-center">
          <Img
          className="h-8  md:h-20"
          hasImg={shop.data.backgroundPath!==null}
          imgPath={shop?.data.backgroundPath}
        />
            {/* <Img
              className="h-8  md:h-20 rounded-md"
              hasImg={
                shop?.parent!.id === 1
                  ? shop!.profile!.size! > 0
                  : shop!.parent!.profile!.size! > 0
              }
              imgId={
                shop?.parent?.id === 1
                  ? shop?.profile?.id
                  : shop?.parent?.profile?.id
              }
            /> */}
            <Title
              title={shop?.data.name}
              subTitle={`les details du shop ${shop?.data.name}`}
            />
          </div>
          <div className="mt-6 border-t text-left border-gray-500/30">
            <dl className="divide-y divide-gray-500/30">
              <DetailItem label='Email' value={shop?.data.name}/>
              
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 textSubtile">
                  Addresse
                </dt>
                <dd className="mt-1 text-sm leading-6 ttextSubtileValue sm:col-span-2 sm:mt-0">
                  {shop?.data.address}
                </dd>
              </div>
              
             
              
            </dl>
          </div>
        </>
      )}
    </div>
  );
};
