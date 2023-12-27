import { ChildEntity } from 'typeorm';
import { Partner } from './partner.entity';

@ChildEntity()
export class PaymentType extends Partner {}
