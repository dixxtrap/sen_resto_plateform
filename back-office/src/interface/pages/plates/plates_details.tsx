import React from "react";
import { useGetPlateByIdQuery } from "../../../core/features/plate.slice";
import { useParams } from "react-router-dom";
import { Alert } from "../../components/alert_success";
import { Title } from "../../components/title";
import { Img } from "../../components/image_updatable";
import { clsx } from "../../utils/clsx";
import { CakeIcon } from "@heroicons/react/20/solid";

export const PlatesDetails = () => {
  const { id } = useParams();
  const {
    data: plate,
    isLoading,
    isSuccess,
    isError,
  } = useGetPlateByIdQuery(parseInt(id!));
  return (
    <>
    <Alert isOpen={isLoading}/>
      <div>
        <div className="flex gap-x-3 shrink-0 items-center">
         {plate?.file?.length>0? <Img
            className="h-8  md:h-20"
            hasImg={true}
            imgId={plate?.file[0].photoId}
          />:<CakeIcon className="h-8  md:h-20 text-indigo-500 bg-indigo-100 p-2 rounded-md"/>}
          <Title
            title={plate?.name}
            subTitle={`les details du restaurant ${plate?.name}`}
          />
        </div>
        <div className="mt-6 border-t text-left border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Nom{" "}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {plate?.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Prix
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {plate?.price} F CFA
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Reduction
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {plate?.reduction}%
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Description
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {plate?.description}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Date de creation
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {plate?.createdAt}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Jours de Vente
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 flex gap-x-5 flex-wrap sm:col-span-2 sm:mt-0">
                <div className="flex  text-slate-600  items-center gap-x-2">
                  <span>Lun</span>
                  <div
                  className={clsx(
                    plate?.monday ? "bg-teal-400/20 " : "bg-slate-400/20",
                    " h-4 w-4 rounded-full p-1"
                  )}
                >
                  <div
                    className={clsx(
                      plate?.monday? "bg-teal-400  " : "bg-slate-400",
                      "rounded-full h-full w-full"
                    )}
                  ></div>
               
                  </div>
                </div>
                <div className="flex  text-slate-600  items-center gap-x-2">
                  <span>Mardi</span>
                  <div
                  className={clsx(
                    plate?.tuesday ? "bg-teal-400/20 " : "bg-slate-400/20",
                    " h-4 w-4 rounded-full p-1"
                  )}
                >
                  <div
                    className={clsx(
                      plate?.tuesday? "bg-teal-400  " : "bg-slate-400",
                      "rounded-full h-full w-full"
                    )}
                  ></div>
               
                  </div>
                </div>
                <div className="flex  text-slate-600  items-center gap-x-2">
                  <span>Mercredi</span>
                  <div
                  className={clsx(
                    plate?.wednesday ? "bg-teal-400/20 " : "bg-slate-400/20",
                    " h-4 w-4 rounded-full p-1"
                  )}
                >
                  <div
                    className={clsx(
                      plate?.wednesday? "bg-teal-400  " : "bg-slate-400",
                      "rounded-full h-full w-full"
                    )}
                  ></div>
               
                  </div>
                </div>
                <div className="flex  text-slate-600  items-center gap-x-2">
                  <span>Jeudi</span>
                  <div
                  className={clsx(
                    plate?.thursday ? "bg-teal-400/20 " : "bg-slate-400/20",
                    " h-4 w-4 rounded-full p-1"
                  )}
                >
                  <div
                    className={clsx(
                      plate?.thursday? "bg-teal-400  " : "bg-slate-400",
                      "rounded-full h-full w-full"
                    )}
                  ></div>
               
                  </div>
                </div>
                <div className="flex   text-slate-600 gap-x-2 items-center">
                  <span>Vendredi</span>
                  <div
                  className={clsx(
                    plate?.friday ? "bg-teal-400/20 " : "bg-slate-400/20",
                    " h-4 w-4 rounded-full p-1"
                  )}
                >
                  <div
                    className={clsx(
                      plate?.friday? "bg-teal-400  " : "bg-slate-400",
                      "rounded-full h-full w-full"
                    )}
                  ></div>
               
                  </div>
                </div>
                <div className="flex  text-slate-600  items-center gap-x-2">
                  <span>Samedi</span>
                  <div
                  className={clsx(
                    plate?.sunday ? "bg-teal-400/20 " : "bg-slate-400/20",
                    " h-4 w-4 rounded-full p-1"
                  )}
                >
                  <div
                    className={clsx(
                      plate?.sunday? "bg-teal-400  " : "bg-slate-400",
                      "rounded-full h-full w-full"
                    )}
                  ></div>
               
                  </div>
                </div>
                <div className="flex  text-slate-600  items-center gap-x-2">
                  <span>Dimanche</span>
                  <div
                  className={clsx(
                    plate?.saturday ? "bg-teal-400/20 " : "bg-slate-400/20",
                    " h-4 w-4 rounded-full p-1"
                  )}
                >
                  <div
                    className={clsx(
                      plate?.saturday? "bg-teal-400  " : "bg-slate-400",
                      "rounded-full h-full w-full"
                    )}
                  ></div>
               
                  </div>
                </div>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Image
              </dt>
              <dd className="mt-1 text-sm  flex text-gray-700 gap-x-2  sm:col-span-2 sm:mt-0">
                {plate?.file&& plate.file?.length>0 ? plate?.file!.map((e) => (
                  <Img
                    className="h-8  md:h-16 rounded-md"
                    hasImg={e.photo.filename!==null&&e.photo.size!=0}
                    imgId={e.photoId}
                  />
                )):<CakeIcon className="h-8  md:h-20 text-indigo-500 bg-indigo-100 p-2 rounded-md"/>}
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
      </div>
   </>
  );
};
