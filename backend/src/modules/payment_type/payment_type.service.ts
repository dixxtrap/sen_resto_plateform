import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTypeDto } from 'src/dto/payment_type.dto';
import { PaymentType, PaymentTypeHistory } from 'src/typeorm';
import { Repository } from 'typeorm';

export class PaymentTypeService {
  constructor(
    @InjectRepository(PaymentType) private repos: Repository<PaymentType>,
    @InjectRepository(PaymentTypeHistory)
    private reposHistory: Repository<PaymentTypeHistory>,
  ) {}
  async getS() {
    return await this.repos.find({ relations: { profile: true } });
  }

  async get(id: number) {
    return await this.repos.findOne({
      where: { id },
      relations: { profile: true },
    });
  }

  async update(id: number, item: PaymentTypeDto) {
    return await this.repos.update({ id }, { ...item });
  }
  async post(item: PaymentTypeDto, user: any) {
    const paymentType = await this.repos.save(
      this.repos.create({ ...item, createById: user.id, profile: { size: 0 } }),
    );
    await this.reposHistory.save(
      this.reposHistory.create({
        ...item,
        createById: user.id,
        paymentTypeId: paymentType.id,
      }),
    );
  }
}
