import { FileDocument } from 'src/typeorm';
declare const FileDocumentDto_base: import("@nestjs/common").Type<Partial<FileDocument>>;
export declare class FileDocumentDto extends FileDocumentDto_base {
    [x: string]: any;
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
    createdDate?: Date;
    updatedDate?: Date;
}
export {};
