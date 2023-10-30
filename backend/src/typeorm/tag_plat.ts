import { PrimaryGeneratedColumn, Column, Entity, PrimaryColumn } from 'typeorm';
@Entity({ name: 'plate_tag_tag' })
export class TagPlate {
  @PrimaryColumn()
  plateId: number;

  @PrimaryColumn()
  tagId: number;
}
