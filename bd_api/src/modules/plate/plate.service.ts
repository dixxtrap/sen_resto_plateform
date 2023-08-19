import {
  HttpException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { tagData } from 'src/data/tag_data';
import { PlateDto } from 'src/dto/plate.dto';
import { FileDocument, Plate, PlateFile, Tag, TagPlate } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlateService {
  constructor(
    @InjectRepository(Plate) private repos: Repository<Plate>,
    @InjectRepository(PlateFile) private plateFileRepos: Repository<PlateFile>,
    @InjectRepository(TagPlate) private tagPlateRepos: Repository<TagPlate>,
    // @InjectRepository(Tag) private tagRepos: Repository<Tag>,
    @InjectRepository(FileDocument)
    private docRepos: Repository<FileDocument>,
  ) {}

  getS() {
    return this.repos.find({ relations: { file: { photo: true } } });
  }
  async get(id: number) {
    return await this.repos.findOne({
      where: { id },
      relations: { file: { photo: true }, tag: true },
    });
  }
  async getByRestaurant(id: number) {
    return await this.repos.find({
      where: { restaurantId: id },
      relations: { file: { photo: true }, tag: true },
    });
  }
  async create(data: PlateDto) {
    try {
      return this.repos.save(this.repos.create(data));
    } catch (error) {
      throw new HttpException({ ...error }, 500);
    }
  }
  async update(data: PlateDto) {
    const old = await this.repos.findOne({ where: { id: data.id } });
    await this.tagPlateRepos.delete({ plateId: data.id });
    const { tag, id, ...plate } = data;
    await tag.forEach(async (ele) => {
      await this.tagPlateRepos.save(
        this.tagPlateRepos.create({ tagId: ele.id, plateId: data.id }),
      );
    });

    if (!old) throw new NotFoundException(`${data.name} not Found`);
    await this.repos.update({ id: data.id }, { ...plate });
    return { ...old, data };
  }
  async addPhoto(id: number, file: Express.Multer.File) {
    const img = await this.docRepos.save(this.docRepos.create({ ...file }));
    const plateFile = await this.plateFileRepos.save(
      this.plateFileRepos.create({ photoId: img.id, plateId: id }),
    );
    return plateFile;
  }
}
