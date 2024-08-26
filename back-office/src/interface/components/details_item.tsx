import { FC, ReactNode } from "react"

type DetailItemProps={
    label?:ReactNode,
    value?:ReactNode
  }
  export const DetailItem:FC<DetailItemProps>=({label, value})=>{
    return (
      <dl className="px-4 py-6 sm:grid  sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm capitalize font-medium leading-6 textSubtile text-left">
          {label}
        </dt>
        <dd className="mt-1 text-sm capitalize leading-6 ttextSubtileValue sm:col-span-2 sm:mt-0 text-left">
          {value}
        </dd>
      </dl>
    );
  }