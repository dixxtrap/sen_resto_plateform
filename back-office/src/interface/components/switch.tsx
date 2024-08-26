import { Switch } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";


export const CustomSwitch = ({  onClick, isActive }: { isLoading: boolean, onClick?: (bool: boolean) => void, isActive: boolean }) => {
        console.log(isActive)
        return (
                <Switch
                        checked={isActive}
                        title="theme"
                        type="button"
                        onClick={(event) => onClick!(event.currentTarget.checked)}
                
                
                >
                </Switch>);
}

export const CustomSwitchInput=({label,itemKey ,form}:{label?:string,itemKey:string,form:  UseFormReturnType<any, any>,})=>{
        return (<div className="flex justify-between">
                <span className="">
                        {label??"Status"}
                </span>   
                <CustomSwitch
isLoading={false}
isActive={form.getValues()[itemKey]}
onClick={(val) =>form.setFieldValue(itemKey, val)}
/>
</div>)
}