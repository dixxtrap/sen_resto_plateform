import classes from  "./mask.module.css"
import    "./mask.module.css"

export const GlobMask = ({url}:{url:string}) => {
  return (
<>
<div className="h-[400px] w-[400px]">
<img src={url} className={  " blobmaskedimage  m-auto border-2 border-gray-500 "}></img>
</div>
</>
  )
}
