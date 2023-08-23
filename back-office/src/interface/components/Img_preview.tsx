import { ReactNode, useState } from "react";
import { useFormContext } from "react-hook-form";


import { handlePreview } from "../utils/handle_preview";
import {
  CameraIcon,
  CheckIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";
import { FileDocument } from "../../core/models/file_document";

export const ImgPreview = ({
  img,
  name,
  className,
  url,
  method,
  destination,
  refresh,
  isDelectable,
  icon,
  canUpdateAfter = false,
}: {
  img: FileDocument;
  name: string;
  className?: string;
  url?: string;
  method?: string;
  isDelectable?: boolean;
  destination?: string;
  icon?: ReactNode;
  refresh?: () => void;
  canUpdateAfter?: boolean;
}) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    img!.path ? `/v1/document/file/${img!.id}` : undefined
  );
  const [file, setFile] = useState<File | undefined>();
  const [changed, setChanged] = useState<boolean>(false);
  const handleImage = handlePreview({
    previewImage: previewImage!,
    setPreviewImage: setPreviewImage,
    setFile,
    setChanged,
  });
  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file!);
    formData.append("oldPath", img!.path!);
    if (destination) formData.append("destination", destination);
    const response = await fetch(url ?? `/v1/document/${img!.id}`, {
      method: method ?? "PUT",
      body: formData,
    });
    if (response.ok) {
      console.log(response.body);
      if (canUpdateAfter)
        setPreviewImage(img!.path ? `/v1/document/file/${img!.id}` : undefined);
      if (refresh) refresh();
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      action=""
      className="m-2    flex input_bg items-center max-w-xs   p-2 flex-col justify-center "
    >
      <label htmlFor={`${name}`}>
        <input
          key={`${name}`}
          title={`${name}`}
          hidden={true}
          // onChange={handleFileChange}
          id={`${name}`}
          type={`file`}
          name={`${name}`}
          onChange={handleImage}
        />
        {previewImage && previewImage !== undefined ? (
          <img
            src={previewImage}
            alt="no file"
            className={className ?? "w-full rounded-sm"}
          />
        ) : (
          icon ?? (
            <CameraIcon className={className ?? " text-7xl text-rose-400"} />
          )
        )}
      </label>
      <div className="flex w-full   items-center justify-around content-center ">
       
        { changed&& <button type="submit" className="p-2 z-50 text-rose-500">
            <CheckIcon  className="text-slate-800 h-8 w-8" />Valide
          </button>}
       
        {isDelectable && (
          <button type="submit">
            <LockClosedIcon />
          </button>
        )}
      </div>
    </form>
  );
};
