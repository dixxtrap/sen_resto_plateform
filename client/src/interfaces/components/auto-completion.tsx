import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useGetCompanyQuery } from "../../cores/apis/api";
import clsx from "clsx";
import { constant } from "../../utils/constant";
import { CompanyDto } from "../../cores/models/company.dto";

export const AutoCompletionCompanies = () => {
  const [query, setQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const { data: companies = [], isLoading, isSuccess } = useGetCompanyQuery("");
  console.log(companies);
  const [filteredPeople, setFilteredPeople] = useState<CompanyDto[]>([]);
  useEffect(() => {
    if (isSuccess && companies) {
      setFilteredPeople(
        query === ""
          ? companies
          : companies.filter((company) => {
              return company.name!.toLowerCase().includes(query.toLowerCase());
            })
      );
    }
  }, [companies, isSuccess, query]);

  return (
    companies &&
    isSuccess && (
      <Combobox as="div" value={selectedCompany} onChange={setSelectedCompany}>
        {/* <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
          Assigned to
        </Combobox.Label> */}
        <div className="relative mt-2">
          <Combobox.Input
            className="w-full rounded-md border-none bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(company:CompanyDto)=>company?.name??"Tout"}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          {filteredPeople.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:border-none focus:outline-none sm:text-sm focus:ring-red-500">
              {filteredPeople.map((company) => (
                <Combobox.Option
                  key={company.id}
                  value={company}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      active ? "bg-red-600 text-white" : "text-gray-900"
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <div className="flex items-center">
                        <img
                          src={`${constant.filePath}/${company.profile?.id}`}
                          alt=""
                          className="h-6 w-6 flex-shrink-0 rounded-full"
                        />
                        <span
                          className={clsx(
                            "ml-3 truncate",
                            selected && "font-semibold"
                          )}
                        >
                          {company.name}
                        </span>
                      </div>

                      {selected && (
                        <span
                          className={clsx(
                            "absolute inset-y-0 right-0 flex items-center pr-4",
                            active ? "text-white" : "text-red-600"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    )
  );
};
