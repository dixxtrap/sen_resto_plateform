import { useGetRestaurantByIdQuery } from "../../../core/features/restaurant.slice";
import { useParams } from "react-router-dom";
import { Img } from "../../components/image_updatable";
import { Title } from "../../components/title";
import { Alert } from "../../components/alert_success";
import { DetailItem } from "../../components/details_item";


export const RestaurantDetails = () => {
  const { id } = useParams();
  const {
    data: restaurant,
    isLoading,
    isSuccess,
  } = useGetRestaurantByIdQuery(parseInt(id!));
  return (
    <div>
      {isLoading&&<Alert type="loading" isOpen={isLoading} />}
      {isSuccess && restaurant  && (
        <>
          <div className="flex gap-x-3 shrink-0 items-center">
          <Img
          className="h-8  md:h-20"
          hasImg={restaurant.data.imagePath!==null}
          imgPath={restaurant?.data.imagePath}
        />
            {/* <Img
              className="h-8  md:h-20 rounded-md"
              hasImg={
                restaurant?.parent!.id === 1
                  ? restaurant!.profile!.size! > 0
                  : restaurant!.parent!.profile!.size! > 0
              }
              imgId={
                restaurant?.parent?.id === 1
                  ? restaurant?.profile?.id
                  : restaurant?.parent?.profile?.id
              }
            /> */}
            <Title
              title={restaurant?.data.name}
              subTitle={`les details du restaurant ${restaurant?.data.name}`}
            />
          </div>
          <div className="mt-6 border-t text-left border-gray-500/30">
            <dl className="divide-y divide-gray-500/30">
              <DetailItem label='Email' value={restaurant?.data.email}/>
              
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 textSubtile">
                  Addresse
                </dt>
                <dd className="mt-1 text-sm leading-6 ttextSubtileValue sm:col-span-2 sm:mt-0">
                  {restaurant?.data.address}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 textSubtile">
                  Salary expectation
                </dt>
                <dd className="mt-1 text-sm leading-6 ttextSubtileValue sm:col-span-2 sm:mt-0">
                  $120,000
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 textSubtile">
                  Description
                </dt>
                <dd className="mt-1 text-sm leading-6 ttextSubtileValue sm:col-span-2 sm:mt-0">
                  {restaurant?.data.description}
                </dd>
              </div>
              {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
           <dt className="text-sm font-medium leading-6 textSubtile">Attachments</dt>
           <dd className="mt-2 text-sm textSubtile sm:col-span-2 sm:mt-0">
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
        </>
      )}
    </div>
  );
};
