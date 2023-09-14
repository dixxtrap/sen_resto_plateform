import { ReactNode, useState } from "react";


import { handlePreview } from "../utils/handle_preview";
import {
  CameraIcon,
  CheckCircleIcon,
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
      className="    flex input_bg items-center   p-2 flex-col   "
    >
      <label htmlFor={`${name}`} className="w-full h-full min-w-fit">
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
      <div className="flex w-full   my-2 items-center justify-around content-center ">
       
        { changed&& <button type="submit" className="px-2 z-50 w-14 h-7 rounded-md bg-teal-100 flex text-xs items-center   justify-center">
            <CheckCircleIcon  className="text-teal-800 h-6 w-6 m-auto  my-auto " /><span>OK</span>
          </button>}
       
        {isDelectable && (
          <button type="submit" className="p-2 z-50 w-14 h-8  text-rose-500">
            <LockClosedIcon />
          </button>
        )}
      </div>
    </form>
  );
};
