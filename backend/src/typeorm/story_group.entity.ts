import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { CreationDetails } from './details.entity';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';
import { Story } from './story.entity';
import { Column } from 'typeorm/decorator/columns/Column';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Company } from './partner/company.entity';
@Entity()
export class StoryGroup extends CreationDetails{
@PrimaryGeneratedColumn()
id:number
@ManyToOne((type) => Company )
partner:Company
@Column({
  nullable: true,
  default: null,
}) 
partnerId:number
@OneToMany(() => Story, (alias) =>alias.group )
story:Story[]

}