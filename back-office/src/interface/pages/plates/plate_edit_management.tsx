
import { useEffect, useState } from "react";
import { Title } from "../../components/title";
import { CustomForm } from "../../components/custom_form";
import { useForm } from "react-hook-form";
import {

  useGetProductManagementByIdQuery,
  useUpdateProductManagementDayMutation,
} from "../../../core/features/product.slice";
import { useParams } from "react-router-dom";
import { CustomSwitch } from "../../components/switch";
import { Alert } from "../../components/alert_success";
import { ProductManagementDayDto } from "../../../core/models/product_management_day";
export const PlateEditManagement = () => {
  const id = parseInt(useParams().id!);
  const {handleSubmit}=useForm()
  const [update, { isLoading, isSuccess, isError }] = useUpdateProductManagementDayMutation();
const [listProductManagement, setListProductManagement]= useState<ProductManagementDayDto[]>([])
  const {
    data: old,
    isLoading: isOldLoading,

  } = useGetProductManagementByIdQuery(id);


  useEffect(() => {
    if (old) {
    // setValue("name", old.data.name);
    //   setValue("description", old.data.description);
    //   setValue("price", old.data.price);
    //   setValue("reduction", old.data.reduction);
    //   setValue("tag", old.data.tag);
    //   console.log(watch("tagIds"));

setListProductManagement(old.data.productManagementDay!);
    }
  }, [old]);
const handleManagement=(item:ProductManagementDayDto)=>{
  console.log("---------------clicj-----------")
  setListProductManagement(prev=>{return [...prev.map((man)=>item.dayId===man.dayId?{...item, isActive:!item.isActive}:man)]})
}

const onsubmit=handleSubmit(()=>{

  update(listProductManagement)
})
  return (
    <>
      <Alert isOpen={isOldLoading } type="loading"  title="Recuperation"/>
      <Alert isOpen={isError} type="loading"  title="Recuperation"/>
      {old?.data&&
        <div className="flex flex-col divide-y darkDivider">
          <Title title="Plat" subTitle="Modifier le plat" />
          <div className="flex flex-wrap gap-2 py-2">
            {old?.data.product?.file?.map((e) => (
              <img
              title="daxxion"
                src={`${e.path}`}
                className="h-14 w-14 md:h-28 md:w-28 rounded-md"
      
              />
            ))}
            
          </div>

          <CustomForm
            isError={isError}
            isSuccess={isSuccess}
            isLoading={isLoading}
            onSubmit={onsubmit}
          >
            <div className="flex justify-between">
              <span>Nom du plat</span>
              <span className="detailsValue">{old.data.product?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Prix</span>
              <span className="detailsValue">{old.data.product?.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Reduction</span>
              <span className="detailsValue">{old.data.product?.reduction}</span>
            </div>
            <div className="flex  items-start text-start flex-col ">
              <span className="detailsValue">Description</span>
              <span className="subtitle">{old.data.product?.description}</span>
            </div>
         <div className="flex gap-4">
            
        {listProductManagement?.length!>0 && listProductManagement?.map((managementDay, index)=><div key={`day_${index}`} className="flex items-center gap-2 mr-3" ><span className="textSubtile">{managementDay.day?.name}</span> <CustomSwitch isActive={managementDay.isActive!} isLoading={false} onClick={()=>{handleManagement(managementDay)}}/></div>)}
            
            
         </div>
          </CustomForm>
        </div>
      }
    </>
  );
};
