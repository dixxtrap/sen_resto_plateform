import React, { FC, useEffect, useState } from 'react'
import { CardAllocationDto } from '../../../../core/models/card_allocation.dto'
import { DialogAlert } from '../../../components/alert_success'
import { CustomForm } from '../../../components/custom_form'
import { Input } from '../../../components/input'
import { useAcceptAllocationMutation } from '../../../../core/features/card_allocation.slice'
import { useForm } from 'react-hook-form'
import { getWsMessage } from '../../../../core/features/error_transformer'
type AcceptesCardAllocationProps={
    cardAllocation:CardAllocationDto
}
export const AccepteCardAllocation :FC<AcceptesCardAllocationProps>= ({cardAllocation}) => {
  const [accept, {isLoading, isSuccess, isError, error, reset}]=useAcceptAllocationMutation();
  const {handleSubmit, register}=useForm({
    defaultValues:{
      motif:''
    }
  })
    const [isOpen, setIsOpen]=useState<boolean>(false)
const _onSubmit=handleSubmit((data)=>{
 
  console.log('==========data=====', data);
  accept({id:cardAllocation.id!, motif:data.motif})
});
useEffect(()=>{
if(isSuccess==true){
 setTimeout(() => {
  setIsOpen(false);
 }, 300);
}
},[isSuccess])
  return (
    <>
      {isOpen && (
        <DialogAlert isOpen={isOpen} onClose={() => {setIsOpen(false)}}>
          <CustomForm onFinish={reset} validationText='Accepter' successPath='#' isError={isError} isLoading={isLoading} isSuccess={isSuccess} errorMessage={getWsMessage(error??{})} onSubmit={_onSubmit} title="Accepter les Carte">
            <Input label="Label">
              <input readOnly value={cardAllocation.label} className="input"/>
            </Input>
            <Input label="Quantité">
            <input readOnly value={cardAllocation.quantity} className="input"/>
            </Input>
            <Input label="Description">
            <textarea readOnly value={cardAllocation.motif} className="input"></textarea>
            </Input>
            <Input label="Motif">
              <textarea className="input"></textarea>
            </Input>
          </CustomForm>
        </DialogAlert>
      )}
      <button onClick={() => setIsOpen(true)} className="last_td accept">
        Accepter
      </button>
    </>
  );
}
