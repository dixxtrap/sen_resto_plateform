import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerDto } from 'src/dto/customer.dto';
import { Customer } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private repos: Repository<Customer>,
    private jwt: JwtService,
  ) {}
  async getS() {
    return await this.repos.find({});
  }

  async get(id: number) {
    return await this.repos.findOneBy({ id });
  }
  async getPhone(phone: string) {
    const user = await this.repos.findOneBy({ phone });
    return {
      ...user,
      token: this.jwt.sign({ ...user }, { secret: process.env.API_KEY }),
    };
  }
  async update(id: number, item: CustomerDto) {
    return await this.repos.update({ id }, { ...item });
  }
  async post(item: CustomerDto) {
    return await this.repos.save(this.repos.create({ ...item }));
  }
}
