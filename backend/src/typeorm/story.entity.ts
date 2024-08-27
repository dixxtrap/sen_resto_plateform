import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
import { CreationDetails } from './details.entity';
import { Partner } from './partner.entity';

export enum StoryEnum {
  expired,
  readable,
  delete,
}

@Entity()
export class Story  extends CreationDetails{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'nvarchar2',
    length: length,
    nullable: true,
    default: null,
  })
  imagePath: string;
  @ManyToOne(()=>Partner)
  partner:Partner;
  @Column({nullable:true, default:null})
  partnerId:number;

  @Column({
    type: 'enum',
    enum: StoryEnum,
    default: StoryEnum.readable,
  })
  status: StoryEnum;
}


