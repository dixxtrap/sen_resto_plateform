import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Weekday {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column({ unique: true })
  dayNumber: number;
}
