import {
  IconCamera
  } from "@tabler/icons-react";
import  { FC, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import {  handlePreviewV2 } from "../../utils/handle_preview";
import { Modal } from "@mantine/core";
import { ImgWithHandler } from "../../components/img_with_handler";
import { productApi } from "../../../core/features/product.slice";
type ProductCreateFileProps = {
  productId: number;
  path: string;
  id: number;
};
export const ProductFileUpdate: FC<ProductCreateFileProps> = ({
  productId,
  path,
  id,
}) => {
  const [refetch, {isLoading}] = productApi.useGetRefetchMutation();
  
 

  const handleImage = handlePreviewV2({
    previewImage: path!,
  });
  const [opened, {close, open}] = useDisclosure(false);
  const _onSubmit = () => {
    if (handleImage.file) {
      const formData = new FormData();
      formData.append("file", handleImage.file!);
      formData.append("productId", `${productId}`);
      fetch(`/v1/product_file/update/${id}`, {
        method: "PUT",
        body: formData,
      }).then((value) => {
        if (value.ok) {
          refetch("");
         handleImage.setPreview(path)
          close();
        }
      });
    }
  };
  useEffect(() => {
    
  }, [isLoading])
  
  const _onDelete = () => {

      fetch(`/v1/product_file/delete/${id}`, { method: "DELETE" }).then(
        (value) => {
          console.log(value.json())
          if (value.ok) {
            refetch("");
            
            handleImage.setPreview(undefined);
            close();
          }
        }
      );
  
  };
  const _onReset = () => {
   
    close();
  };
  return (
    <div>
     { !isLoading&&<div onClick={() => open()}>
        {path ? (
          <img title='image' src={`${path}`} className="h-20 w-20 rounded-md" />
        ) : (
          <IconCamera className="h-20 text-primary-500 bg-secondary-400/30 ring-2 ring-inset ring-secondary-400 rounded-md p-2" />
        )}
      </div>}
      {<></>}
     
        <Modal
          onClose={() => {
            close();
          }}
          opened={opened}
        >
        <ImgWithHandler fitContent htmlFor="File" {...handleImage}/>
          <div className="flex  pt-2  justify-between ">
            <button className="button  secondary "  onClick={_onReset}>
              Annuler
            </button>
            <button className="button  tertiary " onClick={_onDelete}>
              Supprimer l'imgae
            </button>
            <button
              className="button primary"
              onClick={_onSubmit}  
            >
              Valider
            </button>
          </div>
        </Modal>
     
    </div>
  );
};
