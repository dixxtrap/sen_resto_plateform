import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { CreationDetails } from './details.entity';

export enum StoryEnum {
  expired,
  readable,
  delete,
}

@Entity()
export class Story {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'nvarchar2',
    length: length,
    nullable: true,
    default: null,
  })
  imagePath: string;
  @Column(() => CreationDetails)
  details: CreationDetails;
  @Column({
    type: 'enum',
    enum: StoryEnum,
    default: StoryEnum.readable,
  })
  status: StoryEnum;
}
