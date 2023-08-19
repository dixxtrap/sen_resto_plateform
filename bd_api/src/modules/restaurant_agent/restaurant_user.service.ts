import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantUserDto } from 'src/dto/restaurant_user';
import { RestaurantUser } from 'src/typeorm';

@Injectable()
export class RestaurantUserService {
  constructor(
    @InjectRepository(RestaurantUser)
    private repos: Repository<RestaurantUser>,
  ) {}
  getS() {
    return this.repos.find({
      relations: {
        user: {
          profile: true,
          role: true,
        },
      },
    });
  }
  async get(id: number) {
    return await this.repos.findOne({
      where: { id },
      relations: {
        user: {
          profile: true,
          role: true,
        },
      },
    });
  }
  async create(item: RestaurantUserDto) {
    try {
      return await this.repos.save(this.repos.create(item));
    } catch (error) {
      throw new HttpException({ ...error }, error.code ?? 500);
    }
  }
  async update(id: number) {
    try {
      const oldRestoUser = await this.repos.findOneBy({ id });
      if (!oldRestoUser) throw new NotFoundException();
      await this.repos.update({ id: id }, { isActive: !oldRestoUser.isActive });
      return { ...oldRestoUser, isActive: !oldRestoUser.isActive };
    } catch (error) {
      throw new HttpException({ ...error }, error.code ?? 500);
    }
  }
}
