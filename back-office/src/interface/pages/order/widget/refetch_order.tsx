import {  useState } from "react"

import { getSocket } from "../../../../core/features/get_socket"

export const RefetcOrder = () => {
const [data, setData]=useState()
   
     getSocket()?.on("messageFrom", (data)=>{
        
        setData(data)
     })
    
    
  return (
    <div>RefetcOrder

{JSON.stringify(data)}
    </div>
  )
}
