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
import { Alert, DialogAlert } from "../../components/alert_success";
import { TextConstant } from "../../../core/data/textConstant";
import { TablePagination } from "../../components/table_pagination";
import { useNavigate } from "react-router-dom";
import { useGetCardQuery } from "../../../core/features/card.slice";
export const CardCreate = () => {
  const nav=useNavigate();
  const {refetch}=useGetCardQuery('');
        const [file, setFile]=useState<File>()
        const [isLoading, setIsLoading]=useState<boolean>();
        const [isError, setIsError]=useState<boolean>();
        const [cards, setCards]=useState<{total?:number,header:CardDto,start?:CardDto,end?:CardDto}>()
  const { register, handleSubmit,  } = useForm({
    defaultValues: {
      label: "",
      motif: "",
    },
  });
  const _onSubmit = handleSubmit((data) => {
    console.log(data);
    setIsLoading(true);
    const form= new FormData()
    form.append('file', file!)
    form.append('label', data.label!)
    form.append('motif', data.motif!)
    form.append('quantity', `${cards?.total}`)
    form.append('startSerial', cards?.start?.serial!)
    form.append('endSerial', cards?.start?.serial!)

   fetch('/v1/card/bulk',{method:"POST", body:form}).then(async (resul)=>{
    if(resul.ok){
     refetch()
      nav('/card'); 0
    }
   else{
    const dataResult= await resul.json()
    console.log(dataResult)
    setIsError(true)
   }
   }).catch(err=>{
    setIsError(true)
    console.log(err)})
  });
  const handleFile=async (event:any)=>{
    try {
      const file = event.target.files && event.target.files[0];
      setFile(file)
      const workbook = new Workbook();
      await workbook.xlsx.load(file);
      const sheet = workbook.getWorksheet(1);
   
    const top = sheet?.getRow(1);
    const first = sheet?.getRow(2);
    const last = sheet?.getRow(sheet.rowCount-1);
    const header=getCard(top);
    const startCard=getCard(first);
    const endCard=getCard(last);
   setCards({start:startCard,end:endCard,header,total:sheet?.rowCount})
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
 const getCard=(data:Row | undefined)=>{
const card=new CardDto()
card.serial=data?.getCell(1).value?.toString()??undefined;
card.pan=data?.getCell(2).value?.toString()??undefined;
card.uid=data?.getCell(3).value?.toString()??undefined;
return card;
 }
  return (
    <CustomForm onSubmit={_onSubmit}>
    
      <div className="flex  items-center justify-between">
        <Title title="Emission des cartes" />
        <button className="button primary" onClick={exportProto}>
          Export Prototype
        </button>
      </div>
      <label className="flex items-center justify-center  ring-1 rounded-sm ring-gray-400/30 bgInput">
        <input hidden type="file" onChange={handleFile} />
        {!file && <DocumentTextIcon className="h-20 text-secondary-500" />}
        {file && cards && (
          <div className="flex flex-col pt-5  w-full">
           
            <div className="text-2xl font-bold">{cards.total! - 1} Cartes</div>
            <div>{file.name}</div>
            <TablePagination
              th={[
                cards.header?.serial!,
                cards.header?.pan!,
                cards.header?.uid!,
              ]}
              isPaginated={false}
              trs={
                <>
                  <tr>
                    <td>{cards.start?.serial}</td>
                    <td>{cards.start?.pan}</td>
                    <td>{cards.start?.uid}</td>
                  </tr>
                  <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                  </tr>
                  <tr>
                    <td>{cards.end?.serial}</td>
                    <td>{cards.end?.pan}</td>
                    <td>{cards.end?.uid}</td>
                  </tr>
                </>
              }
            />
          </div>
        )}
      </label>
      <Input label={"Libellé"}>
        <input {...register("label")} className="input" />
      </Input>
      <Input label={"Commentaire"}>
        <textarea {...register("label")} className="input" />
      </Input>
    </CustomForm>
  );
};
