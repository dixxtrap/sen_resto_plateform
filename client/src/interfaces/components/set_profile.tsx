import { Logo } from './logo'
import { useForm } from 'react-hook-form'
import { Input } from './input'
import { TextConstant } from '../../cores/constant/textConstant'
import { FC, useEffect } from 'react'
import { useProfileQuery, useUpdateProfileMutation } from '../../cores/apis/security.slice'
import { Customer } from '../../cores/models/customer'
import { AddressDto } from '../../cores/models/address.dto'
type SetProfileFormProps={
  action:()=>void
}
export const SetProfileForm:FC<SetProfileFormProps> = ({action}) => {
  const {data:profile, isSuccess}=useProfileQuery('')
  const [update,]=useUpdateProfileMutation()
    const {register, handleSubmit, setValue }=useForm<{firstname:string, lastname:string, address:AddressDto}>({})
    const _onSubmit=handleSubmit((data)=>{
console.log(data)
navigator.geolocation.getCurrentPosition((position)=>{update({...data,coordonates:{latitude:position.coords.latitude, longitude:position.coords.longitude}} as Customer).unwrap().then(result=>{
  console.log(result)
  action()
})})

    })
    useEffect(() => {
     if(profile){
setValue('firstname', profile.data.firstname!)
setValue('lastname', profile.data.lastname!)
     }
    }, [isSuccess])
    
  return (
    <form onSubmit={_onSubmit} className="flex items-center flex-col md:px-10">
    <Logo />
    <span className="font-bold  title text-2xl">{profile?.data.firstname?`${profile.data.firstname} ${profile.data.lastname}`:profile?.data?.phone}</span>
    <Input label={TextConstant.firstname}>
      <input {...register("firstname")} className="input" />
     
    </Input>
    <Input label={TextConstant.lastname}>
      <input {...register("lastname")} className="input" />
     
    </Input>
    <Input label={TextConstant.address}>
      <input {...register("address.streetAddress")} className="input" />
     
    </Input>
    <Input label={TextConstant.city}>
      <input {...register("address.city")} className="input" />
     
    </Input>
    <button className="button primary">Valider</button>
  </form>
  )
}
