import { Switch } from "@headlessui/react"
import { SunIcon } from "@heroicons/react/24/outline"
import { MouseEventHandler } from "react"

export const CustomSwitch = ({ isLoading, onClick, isActive }: { isLoading: boolean, onClick?: (bool:boolean)=>void, isActive: boolean }) => {
        return (
                <Switch
                        checked={isActive}
                        title="theme"
                        type="button"
                      
                        onChange={onClick}
                        className={({checked})=>`${checked ? 'bg-secondary-500' : 'bg-gray-200'
                                } relative inline-flex h-6 w-11 items-center rounded-md`}
                >
                        <span className="sr-only">Enable notifications</span>
                        <span
                                className={`${isActive ? 'translate-x-6' : 'translate-x-1'
                                        } inline-block h-4 w-4 transform rounded-md bg-white transition`}
                        />
                </Switch>);
}