import React, { FC } from 'react'
import { CategoryDto } from '../../../core/models/category.dto';
import { clsx } from '../../utils/clsx';
import { CheckIcon } from '@heroicons/react/24/outline';
type ShowCategorySelectProps={
category:CategoryDto,
isChild:boolean;
categoryList:CategoryDto[],
setCategoryList:React.Dispatch<React.SetStateAction<CategoryDto[]>>
}
export const ShowCategorySelect :FC<ShowCategorySelectProps>= ({category, categoryList, setCategoryList, isChild}) => {
  const handleCategorie = (category: CategoryDto) => {
    categoryList.some((item) => item.id === category.id)
      ? setCategoryList((prev) => [...prev.filter((c) => c.id !== category.id)])
      : setCategoryList([...categoryList, category]);
  };
  return  <div>
                {category?.children?.length! > 0 ? (
                  <label
                    htmlFor={category.id + "_tag"}
                    key={category.id + "_tag"}
                    className={clsx(
                      "   text-left items-start justify-start  w-52  ",
                      isChild
                        ? "pl-10  flex flex-col items-start  justify-center"
                        : "flex flex-col items-start"
                    )}
                  >
                    <div className="flex items-center gap-2 font-bold text-gray-500">
                      
                      <span> {category.name}</span>
                    </div>
                   <ShowCategorySelect
                    category={ {name:"Defaut", children:[],id:category.id, parent:null }}
                  isChild={true}
                  setCategoryList={setCategoryList}
                  categoryList={categoryList}

                />
                    {category?.children?.length! > 0 &&
                      category.children?.map((item) =>  <ShowCategorySelect
                      category={ item}
                    isChild={true}
                    setCategoryList={setCategoryList}
                    categoryList={categoryList}
  
                  />)}
                  </label>
                ) : (
                  <label
                    htmlFor={category.id + "_tag"}
                    key={category.id + "_tag"}
                    onClick={() => handleCategorie(category)}
                    className={clsx(
                      "   text-left items-start justify-start  w-52  ",
                      isChild
                        ? "pl-10  flex flex-col items-start justify-center"
                        : "flex flex-col items-start"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className="ring-2 dark:ring-gray-500/30 ring-inset ring-gray-500/20 rounded-md h-4 w-4 ">
                        {categoryList.some((c) => c.id === category.id) && (
                          <CheckIcon className="text-teal-50 h-4 p-0.5 w-4 m-auto bg-secondary-500 rounded-md" />
                        )}
                      </div>{" "}
                      <span> {category.name}</span>
                    </div>
                  </label>
                )}
                </div>;
}
