import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileDocument, Plate } from '.';

@Entity()
export class PlateFile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  plateId: number;
  @Column({ name: 'file_document_id' })
  photoId: number;
  @ManyToOne(() => Plate, {
    onUpdate: 'NO ACTION',
    onDelete: 'CASCADE',
    cascade: true,
  })
  plate: Plate[];
  @OneToOne(() => FileDocument, { cascade: true })
  @JoinColumn({ name: 'file_document_id' })
  photo: FileDocument;
}
