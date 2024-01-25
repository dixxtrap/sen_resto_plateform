import { CameraIcon } from "@heroicons/react/20/solid";
import  { FC, useState } from "react";
import { DialogAlert } from "../../components/alert_success";
import { handlePreview } from "../../utils/handle_preview";
import { useGetRefetchMutation } from "../../../core/features/product.slice";
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
  const [refetch, {}] = useGetRefetchMutation();
  const [preview, setPreview] = useState<string>();
  const [file, setFile] = useState<File>();
  const [changed, setChanged] = useState<boolean>(false);
  const handleImage = handlePreview({
    previewImage: preview!,
    setPreviewImage: setPreview,
    setFile: setFile,
    setChanged: setChanged,
  });
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const _onSubmit = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file!);
      formData.append("productId", `${productId}`);
      fetch(`/v1/product_file/update/${id}`, {
        method: "PUT",
        body: formData,
      }).then((value) => {
        if (value.ok) {
          refetch("");
          setPreview(undefined);
          setFile(undefined);
          setShowDialog(false);
        }
      });
    }
  };
  const _onDelete = () => {

      fetch(`/v1/product_file/delete/${id}`, { method: "DELETE" }).then(
        (value) => {
          console.log(value.json())
          if (value.ok) {
            refetch("");
            setPreview(undefined);
            setFile(undefined);
            setShowDialog(false);
          }
        }
      );
  
  };
  const _onReset = () => {
    setPreview(undefined);
    setFile(undefined);
    setShowDialog(false);
  };
  return (
    <div>
      <div onClick={() => setShowDialog(true)}>
        {path ? (
          <img src={`/v1/${path}`} className="h-20 w-20 rounded-md" />
        ) : (
          <CameraIcon className="h-20 text-primary-500 bg-secondary-400/30 ring-2 ring-inset ring-secondary-400 rounded-md p-2" />
        )}
      </div>
      {changed&& <></>}
      {showDialog && (
        <DialogAlert
          onClose={() => {
            setShowDialog(false);
          }}
          isOpen={true}
        >
          <label htmlFor="file">
            {path}
            <input
              type="file"
              hidden
              id="file"
              name="file"
              onChange={handleImage}
            />
            {preview ? (
              <img src={preview} className="" />
            ) : path ? (
              <img src={`/v1/${path}`} className="" />
            ) : (
              <CameraIcon className="w-full  text-secondary-300" />
            )}
          </label>
          <div className="flex  pt-2  justify-between ">
            <button className="button secondary" onClick={_onSubmit}>
              Valider
            </button>
            <button className="button  tertiary " onClick={_onDelete}>
              Supprimer l'imgae
            </button>
            <button
              className="button primary"
              onClick={_onReset}
            >
              Annuler
            </button>
          </div>
        </DialogAlert>
      )}
    </div>
  );
};
