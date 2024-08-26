import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
@Injectable()
export class ExcelService {
  async readExcel<T>(filePath: string): Promise<T> {
    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);

      const worksheet = workbook.getWorksheet(1); // Assuming data is in the first worksheet
      // console.log(worksheet.columns);
      const rows = [];
      const headers = [];
      worksheet.eachRow(async (row, rowNumber) => {
        // console.log(`--------------row number ${rowNumber}--------------------`);
        const rowData = {};
        const r = row.getCell(1);
        row.eachCell((cell, colNumber) => {
          // console.log(`--------cellule:${colNumber}${cell}`);

          if (rowNumber === 1) {
            // console.log(
            //   `-----------------header : ${cell.value}----------------------`,
            // );
            headers.push(cell.value);
          } else {
            console.log(typeof cell.value);
            rowData[headers[colNumber - 1]] =
              (cell.value as { result: any }).result ?? cell.value;
          }
        });
        if (rowNumber !== 1) rows.push(rowData);
      });
      await fs.unlink(filePath, () => {
        `-------------------file delected: ${filePath}-------------------`;
      });
      return rows as T;
    } catch (error) {
      fs.unlink(filePath, () => {});
      throw error;
    }
  }
  transformFile({ path, body }: { body: Map<string, string>; path: string }) {
    const data = this.readExcel(path);
    console.log(data);
    return data;
  }
}
