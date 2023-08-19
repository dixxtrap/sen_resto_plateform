import { FileDocumentDto } from 'src/dto/file.dto';
import { FileDocument } from 'src/typeorm';
import { Repository } from 'typeorm';
export declare class DocumentService {
    private doc;
    constructor(doc: Repository<FileDocument>);
    create(file: FileDocumentDto): Promise<FileDocument>;
    update(file: FileDocumentDto): Promise<FileDocument>;
}
