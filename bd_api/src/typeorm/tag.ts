import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;
  @Column('varchar', { unique: true })
  name: string;
  @Column('varchar')
  description: string;
}
