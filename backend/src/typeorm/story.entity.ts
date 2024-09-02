import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
import { CreationDetails } from './details.entity';
import { Partner } from './partner.entity';
import { CompanyRestaurantBase } from './company_restaurant.entity';
import { StoryGroup } from './story_group.entity';

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
    nullable: true,
    default: null,
  })
  imagePath: string;
  @ManyToOne(()=>StoryGroup)
  group:StoryGroup
  @Column({
    nullable: true,
    default: null,
  })
  groupId:number;
}


