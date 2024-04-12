import { CustomForm } from '../../../components/custom_form'
import { useDeleteBannerMutation } from '../../../../core/features/banner.slice'
import { useForm } from 'react-hook-form'

export const DeleteBanner = ({id}:{id:number}) => {
    const [deleteBaneer,{}]=useDeleteBannerMutation();
    const {handleSubmit}=useForm()
    const _onSubmit=handleSubmit((data)=>{
        console.log(data)
        deleteBaneer(id+'')
    })
  return (
    <CustomForm confirmeBefore={true} nextText='supprimer' validationText='supprimer' btnClassName='last_td reject' onSubmit={_onSubmit}></CustomForm>
  )
}
