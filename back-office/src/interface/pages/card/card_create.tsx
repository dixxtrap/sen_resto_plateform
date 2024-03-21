import { useForm } from "react-hook-form";
import { CustomForm } from "../../components/custom_form";
import { Input } from "../../components/input";
import { useEffect, useState } from "react";
import { CardDto } from "../../../core/models/card.dto";
import {Row, Workbook} from 'exceljs';
import { Constant } from "../../../core/data/constante";
import { Title } from "../../components/title";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import {saveAs} from'file-saver';
import { DialogAlert } from "../../components/alert_success";
import { TextConstant } from "../../../core/data/textConstant";
export const CardCreate = () => {
        const [file, setFile]=useState<File>()
        const [cards, setCards]=useState<{total?:number,start?:CardDto,end?:CardDto}>()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      label: "",
      description: "",
    },
  });
  const _onSubmit = handleSubmit((data) => {
    console.log(data);
   
  });
  const handleFile=async (event:any)=>{
    try {
      const file = event.target.files && event.target.files[0];
      setFile(file)
      const form=new FormData();
      form.append('file', file!);
      const workbook = new Workbook();
      await workbook.xlsx.load(file);
      const sheet = workbook.getWorksheet(1);
    const header = sheet?.getRow(0);
    const first = sheet?.getRow(1);
    const last = sheet?.getRow(sheet.rowCount-1);
    const startCard=new CardDto();
    startCard.serial=first?.getCell(1).value?.toString()??undefined;
    startCard.number=first?.getCell(2).value?.toString()??undefined;
    startCard.uid=first?.getCell(3).value?.toString()??undefined;
    const endCard=new CardDto();
    endCard.serial=last?.getCell(1).value?.toString()??undefined;
    endCard.number=last?.getCell(2).value?.toString()??undefined;
    endCard.uid=last?.getCell(3).value?.toString()??undefined;
   setCards({start:startCard,end:endCard,total:sheet?.rowCount})
    } catch (error) {
      
    }

  }
  const exportProto=async ()=>{
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet('Sheet 1');

    // Add some data to the sheet
    sheet.addRow(Constant.cardExcelHeader);
  

    // Save the workbook as an Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'example.xlsx');
  }
 useEffect(() => {
 
 
 }, [])
 
  return (
   
    <CustomForm onSubmit={_onSubmit} >
     <div className="flex  items-center justify-between">
     <Title title="Emission des cartes"/>
     <button className="button primary" onClick={exportProto}>Export Prototype</button>
     </div> 
        <label className="flex items-center justify-center h-40 ring-1 rounded-sm ring-gray-400/30 bgInput">
                <input hidden type="file" onChange={handleFile}  />
              { !file&& <DocumentTextIcon className="h-20 text-secondary-500"/>}
                {file && cards&&<div className="flex flex-col text-black w-full">
                  <div>{file.name}</div>
                  <div>{cards.total!-1}</div>
                  <div>{cards.start?.number}, {cards.start?.serial}, {cards.start?.uid}</div>
                  <div>{cards.end?.number}, {cards.end?.serial}, {cards.end?.uid}</div>
                  </div>}
        </label>
      <Input label={"Libellé"} >
        <input {...register('label')} className="input" />
      </Input>
      <Input label={"Commentaire"} >
        <textarea {...register('label')} className="input" />
      </Input>
  
    
    </CustomForm>
  );
};
