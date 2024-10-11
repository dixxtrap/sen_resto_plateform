import { Button , Modal} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { CustomForm } from '../../../components/custom_form'
import { OrderStatus } from '../../../../core/models/order.dto'
import { useForm } from '@mantine/form'
import { orderApi } from '../../../../core/features/order.slice'

export const ChangeStatus = ({id,title, message,variant, status}:{id:number,title:string,variant:"success"|"danger", message:string, status:OrderStatus}) => {
    const [opened, {open, close}]=useDisclosure();
    const [change, changeState]=orderApi.useChangeStatusMutation()
    const form =useForm()
    const _onsubmit=form.onSubmit(()=>{
change({id, status})
    })
  return (
    <>
    <Modal withCloseButton={false} title={title} opened={opened} onClose={close}>
        <CustomForm  successPath='.' btnClassName='hidden' {...changeState} onSubmit={_onsubmit} >
        <span>{message}</span>
        <div className='flex justify-between items-center'>
<Button onClick={close}>
    Annuler
</Button>
<Button type='submit'>
    Valider
</Button>
        </div>
        </CustomForm>

    </Modal>
    <Button fw={400} size='compact-sm' onClick={open}  color={variant=="danger"?"secondary.5":"kprimary.5"}>{status}</Button>
    </>
    
  )
}

