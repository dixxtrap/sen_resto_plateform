import { Switch } from "@headlessui/react";

export const CustomSwitch = ({ isLoading, onClick, isActive }: { isLoading: boolean, onClick?: (bool: boolean) => void, isActive: boolean }) => {
        console.log(isLoading)
        return (
                <Switch
                        checked={isActive}
                        title="theme"
                        type="button"
                      
                        onChange={onClick}
                        className={({checked})=>`${checked ? 'bg-secondary-500/10 ring-secondary-300 ' : 'bg-gray-500/10 ring-primary-300'
                                } relative inline-flex h-6 w-11 items-center rounded-md  ring-inset ring-1`}
                >
                        <span className="sr-only">Enable notifications</span>
                        <span
                                className={`${isActive ? 'translate-x-6 bg-secondary-500' : 'translate-x-1 bg-primary-500'
                                        } inline-block h-4 w-4 transform rounded-md  transition`}
                        />
                </Switch>);
}