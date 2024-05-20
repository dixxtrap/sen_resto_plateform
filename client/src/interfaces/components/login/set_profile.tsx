import { Logo } from '../logo'
import { useForm } from 'react-hook-form'
import { Input } from '../input'
import { TextConstant } from '../../../cores/constant/textConstant'
import { FC, useEffect, useState } from 'react'
import { useProfileQuery, useUpdateProfileMutation } from '../../../cores/apis/security.slice'
import { Customer } from '../../../cores/models/customer'
import { AddressDto } from '../../../cores/models/address.dto'
type SetProfileFormProps={
  action:()=>void
}
export const SetProfileForm:FC<SetProfileFormProps> = ({action}) => {
  const {data:profile, isSuccess}=useProfileQuery('')
  const [update,]=useUpdateProfileMutation()
const [position, setPosition]=useState<{latitude:number,longitude:number}>()
    const {register, handleSubmit, setValue }=useForm<{firstname:string, lastname:string, address:AddressDto}>({defaultValues:{address:{country:'Senegal'}}})
    const handleGetLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (positionResult) => {
            setPosition({
              latitude: positionResult.coords.latitude,
              longitude: positionResult.coords.longitude,
            });
          },
          (error) => {
           console.log(error)
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    };


const _onSubmit=handleSubmit(async (data)=>{
 await  handleGetLocation();
 update({...data,coordonates:{latitude:position?.latitude, longitude:position?.longitude}} as Customer).unwrap().then(result=>{
  console.log(result)
  action()
})

})
    useEffect(() => {
     if(isSuccess&& profile){
setValue('firstname', profile.data.firstname!)
setValue('lastname', profile.data.lastname!)
     }
    }, [isSuccess, profile, setValue])
    
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
