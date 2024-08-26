import { FC, useEffect, useState } from 'react'
import { CardAllocationDto } from '../../../../core/models/card_allocation.dto'
import { DialogAlert } from '../../../components/alert_success'
import { CustomForm } from '../../../components/custom_form'
import { useRejectAllocationMutation } from '../../../../core/features/card_allocation.slice'
import { useForm } from '@mantine/form'
import { Textarea, TextInput } from '@mantine/core'
type AcceptesCardAllocationProps={
    cardAllocation:CardAllocationDto
}
export const RejectCardAllocation :FC<AcceptesCardAllocationProps>= ({cardAllocation}) => {
   
  const [reject, {isLoading, isSuccess, isError, error, reset}]=useRejectAllocationMutation();
  const form=useForm({
    initialValues:{
      motif:''
    }
  })
    const [isOpen, setIsOpen]=useState<boolean>(false)
const _onSubmit=form.onSubmit((data)=>{
 
  console.log('==========data=====', data);
  reject({id:cardAllocation.id!, motif:data.motif})
});
useEffect(()=>{
if(isSuccess==true){
 setTimeout(() => {
  setIsOpen(false);
 }, 500);
}
},[isSuccess])
  return (
    <>
      {isOpen && (
        <DialogAlert isOpen={isOpen} onClose={() => {setIsOpen(false)}}>
          <CustomForm onFinish={reset} validationText='Retourner' successPath='#' isError={isError} isLoading={isLoading} isSuccess={isSuccess} error={error} onSubmit={_onSubmit} title="Retourner les cartes">
              <TextInput  label="Label" readOnly value={cardAllocation.label} className="input"/>
          
            <TextInput label="Quantité" readOnly value={cardAllocation.quantity} className="input"/>
          
            <TextInput label="Description" readOnly value={cardAllocation.motif} className="input"/>
          
              <Textarea label="Motif" className="input"/>
            
          </CustomForm>
        </DialogAlert>
      )}
     <button onClick={() => setIsOpen(true)}  className="last_td reject ">
        Retourner
      </button>
    </>
  );
}
