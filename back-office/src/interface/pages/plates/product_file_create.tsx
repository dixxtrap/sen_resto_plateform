import  { FC} from 'react'
import {  handlePreviewV2 } from '../../utils/handle_preview';
import { IconCamera } from '@tabler/icons-react';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ImgWithHandler } from '../../components/img_with_handler';
import { productApi } from '../../../core/features/product.slice';
type ProductCreateFileProps={
        productId:number;

}
export const ProductCreateFile:FC<ProductCreateFileProps> = ({productId}) => {
  const [refetch,{}]= productApi.useGetRefetchMutation();
const handler=handlePreviewV2({});
  

const [opened, {close, open}]=useDisclosure(false)
const _onSubmit=()=>{
  if(handler.file){
    const formData = new FormData();
    formData.append("file", handler.file!);
    formData.append("productId", `${productId}`);
    fetch("/v1/product_file/create",{method:"POST", body:formData}).then(value=>{
      if(value.ok){
        refetch("")
        handler.setPreview(undefined)
        
        close()
      }
    })
  }
}
  return (
    <div>
        <IconCamera className='size-20 text-primary-500  ring-1 ring-inset ring-primary-400 rounded-md p-5' onClick={()=>open()}/>
       <Modal onClose={()=>{close()}} opened={opened}>
       
        <ImgWithHandler  className='min-h-96' fitContent={true} key={"File"} htmlFor="File" {...handler}/>
 
        
         
       <div className='flex  pt-2  justify-between'>
        <button className='button secondary'  >annuler</button>
        <button className='button primary' onClick={_onSubmit}>valider</button>
       </div>
       </Modal>
       
        
    </div>
  )
}
