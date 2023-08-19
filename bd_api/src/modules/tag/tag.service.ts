import {
  HttpException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tagData } from 'src/data/tag_data';
import { TagDto } from 'src/dto/tag.dto';
import { Tag } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService implements OnModuleInit {
  constructor(@InjectRepository(Tag) private repos: Repository<Tag>) {}
  onModuleInit() {
    // this.createTags();
  }
  async createTags() {
    tagData.forEach((e) => {
      this.repos.save(this.repos.create(e));
    });
  }
  getS() {
    return this.repos.find({});
  }
  async get(id: number) {
    return await this.repos.findOne({
      where: { id },
    });
  }
  async create(item: TagDto) {
    try {
      return await this.repos.save(this.repos.create(item));
    } catch (error) {
      throw new HttpException({ ...error }, error.code ?? 500);
    }
  }
  async update(item: TagDto) {
    try {
      const oldCompUser = await this.repos.findOneBy({ id: item.id });
      if (!oldCompUser) throw new NotFoundException();
      await this.repos.update({ id: item.id }, { ...item });
      return { ...oldCompUser, ...item };
    } catch (error) {
      throw new HttpException({ ...error }, error.code ?? 500);
    }
  }
}
