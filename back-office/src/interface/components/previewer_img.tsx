import { CameraIcon } from "@heroicons/react/24/solid"
import { FC } from "react"

type PreviewerImgProps={
    preview:string,

}

export const PreviewerImg: FC<PreviewerImgProps>= ({preview}) => {
  return (
    <div>
      
        {preview ? <img title={'tile'}  className="h-20 rounded-md" src={preview}/>:<CameraIcon className="h-20 text-secondary-400"/>}
    </div>
  )
}
