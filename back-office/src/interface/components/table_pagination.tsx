import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronLeftIcon,  
  ChevronRightIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import React, { FC, Fragment, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
type TablePaginationProps = {
  th?: string[];
  trs?: ReactNode;
  title?: string;
  subtitle?: string;
  createPath?: string;
  isPaginated?: boolean;
  createTitle?:string,

};
export const TablePagination: FC<TablePaginationProps> = ({
  trs,
  title,
  subtitle,
  th,
  createTitle,
  createPath,
  isPaginated = true,
}) => {
  const [selected, setSelected] = useState(10);
  return (
    <div className="px-1 sm:px-2 lg:px-2   py-4 rounded-md" >
      <div className="sm:flex sm:items-start justify-between items-start">
        <div className="sm:flex flex-col items-start justify-start grow">
          <h1 className="text-base font-semibold leading-6 title">
            {title}
          </h1>
          <p className="mt-2 text-sm ">{subtitle}</p>
        </div>
        {createPath && (
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link
              to={createPath}
              type="button"
              className="button primary"
               
            >
               {createTitle??`Ajouter ${title}`}
            </Link>
          </div>
        )}
      </div>
     {isPaginated&& <div className="flex pt-5  items-center relative justify-between">
        <div className="relative w-60">
          <div className="relative z-0 flex flex-1 items-center justify-center  sm:absolute sm:inset-0">
            <div className="w-full sm:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full rounded-md border-0  py-1.5 pl-10 pr-3  bgInput  shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-kdark-divider/25 darkDivider placeholder:text-gray-400 focus:ring-[1.0px] focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
        </div>
        <input type="date" className="input max-w-xs" />
      </div>}
      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y dark:divide-kdarkdivider">
              <thead>
                <tr>
                  {th?.map((s, i) => (
                    <th
                      scope="col"
                      key={i + "_th"}
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-kdarktext sm:pl-0"
                    >
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 darkDivider text-xs ">{trs}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flow-root mt-4">
        {isPaginated&&<div className="flex justify-between">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="  relative cursor-default rounded-lg bg-slate-100 ring-slate-600/40 py-2 pl-3 pr-10 text-left ring-1 focus:outline-none focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm max-w-sm bgInput">
                <span className="block truncate">
                  {selected} lignes par page
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className=" absolute mt-1 max-h-60 w-full min-w-max overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {[10, 20, 50].map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person} par ligne
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          <div>
            <nav
              className="isolate inline-flex -space-x-px overflow-hidden rounded-md shadow-sm bgInput ring-1 ring-inset  text-gray-500 ring-gray-500/50"
              aria-label="Pagination"
            >
              <button
              
                className="relative inline-flex items-center  px-2 py-2    border-r border-gray-500/50  hover:bg-gray-500/20  focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5 stroke-gray-500" aria-hidden="true" />
              </button>
              {/* Current: "z-10 bg-primary-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              <a
                href="#"
                aria-current="page"
                className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                1
              </a>

              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 border-l border-gray-500/50 hover:bg-gray-500/20 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>}
      </div>
    </div>
  );
};
