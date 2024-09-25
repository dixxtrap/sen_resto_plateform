import { CameraIcon } from '@heroicons/react/24/solid';
import React from 'react'
import {Text} from '@mantine/core'
import { useId } from '@mantine/hooks';
export const ImgWithHandler = (handler:{
    htmlFor:string;
    handlerFile: (event: any) => void;
    setPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
    preview: string | undefined;
    file: File | undefined;
}) => {
    const id= useId()
  return (
    <label htmlFor={handler.htmlFor}>
    <input
      type="file"
      hidden
      id={handler.htmlFor}
      name={handler.htmlFor}
      onChange={handler.handlerFile}
    />
    {handler.preview ? (
      <img title="img" src={handler.preview} className="h-20" />
    ) : (
      <CameraIcon className="h-20 bg-slate-400/50 p-3 rounded-md ring-1 ring-gray-300 text-gray-500" />
    )}
    <Text className="font-serif">{handler.htmlFor}</Text>
  </label>
  )
}
