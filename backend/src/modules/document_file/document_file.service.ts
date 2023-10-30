import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileDocumentDto } from 'src/dto/file.dto';
import { FileDocument } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(FileDocument)
    private doc: Repository<FileDocument>,
  ) {}
  create(file: FileDocumentDto) {
    const doc = this.doc.create(file);
    return this.doc.save(doc);
  }
  async update(file: FileDocumentDto) {
    const doc = await this.doc.findOneBy({ id: file.id });
    const result = await this.doc.update({ id: doc.id }, { ...file });
    if (result.affected > 0) return doc;
    throw new NotFoundException('File Document not Found');
  }
}
