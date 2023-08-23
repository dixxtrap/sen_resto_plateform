import { Dispatch, SetStateAction } from "react";

export const handlePreview = ({ previewImage, setPreviewImage ,setFile, setChanged}:{previewImage:string, setPreviewImage:Dispatch<SetStateAction<string|undefined>>, setFile?:Dispatch<SetStateAction<File|undefined>>, setChanged?:Dispatch<SetStateAction<boolean>>}):((event: any) => void)=> {
        return (event) => {
          const file = event.target.files && event.target.files[0];
          console.log("------------------handleImga------------------", file);
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreviewImage(reader.result as string);
              console.log("--------------------file------------------", previewImage);
            };
            reader.readAsDataURL(file);
            setFile!(file);
            setChanged!(true)
          } else {
            setPreviewImage(undefined);
          }
        };
      };