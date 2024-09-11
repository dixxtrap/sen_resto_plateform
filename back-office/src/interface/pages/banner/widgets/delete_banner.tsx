import { CustomForm } from '../../../components/custom_form'
import { useDeleteBannerMutation } from '../../../../core/features/banner.slice'
import { useForm } from '@mantine/form'

export const DeleteBanner = ({id}:{id:number}) => {
    const [deleteBaneer,{}]=useDeleteBannerMutation();
    const form=useForm()
    const _onSubmit=form.onSubmit((data)=>{
        console.log(data)
        deleteBaneer(id+'')
    })
  return (
    <CustomForm confirmeBefore={true} nextText='supprimer' validationText='supprimer' btnClassName='last_td bg-secondary-500 font-normal' onSubmit={_onSubmit}></CustomForm>
  )
}
