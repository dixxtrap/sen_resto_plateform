import {
IconCamera
} from "@tabler/icons-react";
import React from 'react'
import {Image, Text} from '@mantine/core'
import { clsx } from "../utils/clsx";
export const ImgWithHandler = (handler:{
    htmlFor:string;
    handlerFile: (event: any) => void;
    setPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
    preview: string | undefined;fitContent?:boolean;
    file: File | undefined;
    className?:string
}) => {
   
  return (
    <div>
<label htmlFor={handler.htmlFor} className={ handler.className + " flex flex-col text-center"+ " "+handler.fitContent?"":"w-40"} >
    <input
      type="file"
      hidden
      id={handler.htmlFor}
      name={handler.htmlFor}
      onChange={handler.handlerFile}
    />
     <div className={clsx(" content-center  items-center justify-center rounded-md ring-primary-400 mt-2  ring-4", handler.fitContent?"grow":"size-40")}>
    {/* {handler.preview?.toString()} */}
    {handler.preview!=null ? (
     
<Image title="img" src={handler.preview} className="w-full rounded-md h-auto" />
     
      
    ) : (<center>
      <IconCamera className="size-20 self-center text-primary-500    " />
      </center>
    )}
     </div>
    {/* <IconCamera className=" p-3 rounded-md ring-1  " /> */}
    <Text className="font-serif text-center">{handler.htmlFor}</Text>
  </label>
    </div>
    
  )
}
