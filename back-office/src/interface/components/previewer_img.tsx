import { IconCamera } from "@tabler/icons-react"
import { FC } from "react"

type PreviewerImgProps={
    preview:string,

}

export const PreviewerImg: FC<PreviewerImgProps>= ({preview}) => {
  return (
    <div>
      
        {preview ? <img title={'tile'}  className="h-20 rounded-md" src={preview}/>:<IconCamera className="h-20 text-secondary-400"/>}
    </div>
  )
}
