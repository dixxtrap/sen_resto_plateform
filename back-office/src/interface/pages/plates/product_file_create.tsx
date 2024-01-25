import { CameraIcon } from '@heroicons/react/20/solid';
import  { FC, useState } from 'react'
import { DialogAlert } from '../../components/alert_success';
import { handlePreview } from '../../utils/handle_preview';
import { useGetRefetchMutation } from '../../../core/features/product.slice';
type ProductCreateFileProps={
        productId:number;

}
export const ProductCreateFile:FC<ProductCreateFileProps> = ({productId}) => {
  const [refetch,{}]= useGetRefetchMutation();
  const [preview, setPreview]=useState<string>();
  const [file, setFile]=useState<File>();
  const [changed, setChanged]=useState< boolean>(false);
console.log(changed)
  const handleImage=handlePreview({previewImage:preview!, setPreviewImage:setPreview, setFile:setFile, setChanged:setChanged})
const [showDialog, setShowDialog]=useState<boolean>(false)
const _onSubmit=()=>{
  if(file){
    const formData = new FormData();
    formData.append("file", file!);
    formData.append("productId", `${productId}`);
    fetch("/v1/product_file/create",{method:"POST", body:formData}).then(value=>{
      if(value.ok){
        refetch("")
        setPreview(undefined)
        setFile(undefined)
        setShowDialog(false)
      }
    })
  }
}
  return (
    <div>
        <CameraIcon className='h-20 text-primary-500 bg-secondary-400/30 ring-2 ring-inset ring-secondary-400 rounded-md p-2' onClick={()=>setShowDialog(true)}/>
       { showDialog&&<DialogAlert onClose={()=>{setShowDialog(false)}} isOpen={true}>
        <label  htmlFor='file'>
       <input type="file" hidden  id="file" name="file" onChange={handleImage}/>
       {preview?<img src={preview} className=""/>:  <CameraIcon className='w-full  text-secondary-300'/>}
       </label>  
       <div className='flex  pt-2  justify-between'>
        <button className='button secondary' onClick={_onSubmit} >Valider</button>
        <button className='button primary'>Valider</button>
       </div>
       </DialogAlert>
       
        }
    </div>
  )
}
