import { useForm } from "react-hook-form";
import { CustomForm } from "../../components/custom_form";
import { Input } from "../../components/input";
import { FolderIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { CardDto } from "../../../core/models/card.dto";
import { TablePagination } from "../../components/table_pagination";

export const CardCreate = () => {
        const [file, setFile]=useState<File>()
        const [cards, setCards]=useState<CardDto[]>()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      label: "",
      description: "",
    },
  });
  const _onSubmit = handleSubmit((data) => {
    console.log(data);
   
  });
  const handleFile=(event:any)=>{
        const file = event.target.files && event.target.files[0];
        setFile(file)
        const form=new FormData();
        form.append('file', file!);
        fetch("/v1/excel/card",{method:"POST", body:form}).then((response)=>{
           response.json().then(value=>{
                    console.log(value)
                    setCards((value as Map<string, string>[]).map(e=>{return {serial:e["Numero de serie"], number:e["Numero de carte"], uid:e["uid"]}}) )
            })
        })

  }
  return (
    <CustomForm onSubmit={_onSubmit} title="Emission des cartes">
        <label>
                <input type="file" onChange={handleFile}  />
                <FolderIcon className="h-20 text-secondary-500"/>
        </label>
      <Input label={"libellé"} >
        <input {...register('label')} className="input" />
      </Input>
      <Input label={"libellé"} >
        <textarea {...register('label')} className="input" />
      </Input>
      <TablePagination isPaginated={false}  th={["Serie", "Numéro",  "uid"]}  title="Card" trs={<>
      { cards?.length! <=10 ?  cards?.map(e=><tr key={e.number}><td>{e.serial}</td>
      <td>{e.number}</td>
      <td>{e.uid}</td>
      </tr>):cards?.slice(0,5).map(e=><tr key={e.number}><td>{e.serial}</td>
      <td>{e.number}</td>
      <td>{e.uid}</td>
      </tr>).concat(<tr key={"intersect"}><td>{"..."}</td>
      <td>{"..."}</td>
      <td>{"..."}</td>
      </tr>).concat(cards.slice(-5).map(e=><tr key={e.number}><td>{e.serial}</td>
      <td>{e.number}</td>
      <td>{e.uid}</td>
      </tr>))}
      </>}/>
    </CustomForm>
  );
};
