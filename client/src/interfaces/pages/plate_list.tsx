import { useGetPlatesQuery, useGetTagsQuery } from "../../cores/apis/api";
import { initPagination } from "../../cores/models/pagination.model";
import { PlateItem } from "../components/plate_item";
import clsx from "clsx";
import { AutoCompletionCompanies } from "../components/auto-completion";
import { Input } from "../components/input";

export const PlateList = () => {
  const {
    data: plates,
    isLoading,
    isSuccess,
  } = useGetPlatesQuery(initPagination);
  const { data: tags = [] } = useGetTagsQuery("");
  return (
    <>
      {isLoading && <div>loding....</div>}
      {plates && isSuccess && (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>
            <div className="flex items-center w-full justify-between py-3">
              <Input className="max-w-xs">
              <input className="input bg-white"  placeholder="Rechercher"  />
              </Input>
              <AutoCompletionCompanies />
            </div>
            <div className="grid grid-cols-8 gap-5 gap-x-3 flex-wrap py-2 pb-8">
              {tags.slice(0, 8).map((tag) => (
                <div
                  className={clsx(
                    "whitespace-nowrap text-center bg-gradient-to-tr   ring-1 ring-inset  ring-red-50  rounded-2xl py-1 px-6 text-sm",
                    tag.id! % 5 == 0 ?
                      "from-red-500 to-red-300 text-white font-bold":"from-slate-500/20 to-slate-500/5"
                  )}
                >
                  {tag.name}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {plates!.data!.map((plate) => (
                <PlateItem plate={plate} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
