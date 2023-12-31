import React, { FC } from "react";
type TitleProps = {
  title?: string;
  subTitle?: string;
};
export const Title: FC<TitleProps> = ({ title, subTitle }) => {
  return (
    <div className="sm:flex sm:items-start justify-between items-start ">
      <div className="sm:flex flex-col items-start justify-start grow">
        {title && (
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </h1>
        )}
        {subTitle && (
          <p className="mt-2 text-sm text-gray-700">
           {subTitle}
          </p>
        )}
      </div>
    </div>
  );
};
