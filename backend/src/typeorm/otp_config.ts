import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { CreationDetails } from './details.entity';
@Entity()
export class OtpConfig {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  label: string;
  @Column()
  maxAttemp: number;
  @Column()
  duration: number;
  @Column({ default: false })
  isHash: boolean;
  @Column(() => CreationDetails)
  details: CreationDetails;
}
