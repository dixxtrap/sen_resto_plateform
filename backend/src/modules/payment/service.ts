import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class PaymentService {
  constructor(@InjectRepository(Payment) private repos: Repository<Payment>) {}

  get() {
    // doing : something
  }
  getById() {
    // doing : something
  }
  create() {
    // doing : something
  }
  update() {
    // doing : something
  }
}
