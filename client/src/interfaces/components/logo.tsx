import { Image } from "@mantine/core"
import logo from "/assets/react.svg"

export const Logo=({className}:{className?:string})=>{
        return <div className={className}>
                <Image   src={logo}/>
        </div>
}