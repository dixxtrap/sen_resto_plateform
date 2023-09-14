/// <reference types="multer" />
import { FileDocument } from 'src/typeorm';
import { Repository } from 'typeorm';
import { DocumentService } from './document_file.service';
export declare class DocumentController {
    private doc;
    private docService;
    constructor(doc: Repository<FileDocument>, docService: DocumentService);
    getFile(res: any, id: number): Promise<any>;
    updateFile(file: Express.Multer.File, id: number, _req: unknown): Promise<FileDocument>;
}
