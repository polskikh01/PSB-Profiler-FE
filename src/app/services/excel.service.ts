import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'ts-xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';

  constructor() {
  }
}
