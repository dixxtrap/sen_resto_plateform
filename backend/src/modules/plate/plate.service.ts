import {
  HttpException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { promises } from 'dns';
import { exceptionCode } from 'src/data/exception_code';
import { tagData } from 'src/data/tag_data';
import { PlateDto } from 'src/dto/plate.dto';
import {
  FileDocument,
  Plate,
  PlateFile,
  PlateHistory,
  Tag,
  TagPlate,
} from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlateService {
  constructor(
    @InjectRepository(Plate) private repos: Repository<Plate>,
    @InjectRepository(PlateHistory) private reposHis: Repository<PlateHistory>,
    @InjectRepository(PlateFile) private plateFileRepos: Repository<PlateFile>,
    @InjectRepository(TagPlate) private tagPlateRepos: Repository<TagPlate>,
    // @InjectRepository(Tag) private tagRepos: Repository<Tag>,
    @InjectRepository(FileDocument)
    private docRepos: Repository<FileDocument>,
  ) {}

  async getS(req: any) {
    console.log(req);
    console.log(
      '-----------------------------------restaurant-------------------',
      req.restaurantId,
    );
    if (req.restaurantId)
      return await this.repos.find({
        where: { restaurantId: req.restaurantId },
        relations: { file: { photo: true } },
      });

    return (
      await this.repos.find({
        relations: {
          file: { photo: true },
          restaurant: { company: { profile: true }, profile: true },
        },
        // select: {
        //   file: {
        //     photo: { id: true, size: true },
        //     photoId: true,
        //     plateId: true,
        //   },
        //   restaurant: {
        //     name: true,
        //     closingTime: true,
        //     openingTime: true,
        //     profile: { id: true, size: true },
        //     company: {
        //       name: true,
        //       short_name: true,
        //       profile: { id: true, size: true },
        //     },
        //   },
        // },
      })
    ).sort(() => Math.random() - 0.5);
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
  async create(data: PlateDto, user: any) {
    console.log(user);
    if (!user.restaurantId)
      throw new HttpException(
        {
          ...exceptionCode['FAILLURE'],
          message: 'Vous n avez le droit ajouter un restaurant',
        },
        500,
      );
    try {
      const plate = await this.repos.save(
        this.repos.create({ ...data, restaurantId: user.restaurantId }),
      );

      if (data.tagIds && data.tagIds.length > 0)
        await data.tagIds.forEach(async (ele) => {
          await this.tagPlateRepos.save(
            this.tagPlateRepos.create({ tagId: ele, plateId: plate.id }),
          );
        });
      const plateHist = await this.reposHis.save(
        this.reposHis.create({
          plateId: plate.id,
          price: plate.price,
          reduction: plate.reduction,
        }),
      );
      console.log(plateHist);
      return {
        ...exceptionCode['SUCCEEDED'],
        message: `Le plat ${plate.name} vient d étre creer avec succés pour votre restaurant`,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException({ ...error }, 500);
    }
  }
  async update(data: PlateDto) {
    const old = await this.repos.findOne({ where: { id: data.id } });

    const { tagIds, id, tag, ...plate } = data;
    console.log(tag);
    if (!old) throw new NotFoundException(`${data.name} not Found`);
    await this.repos.update({ id: data.id }, { ...plate });
    if (tagIds.length > 0) {
      await this.tagPlateRepos.delete({ plateId: data.id });
      await Promise.all(
        tagIds.map(async (ele) => {
          await this.tagPlateRepos.save(
            this.tagPlateRepos.create({ tagId: ele, plateId: id }),
          );
        }),
      );
    }

    if (
      (old.price != null && old.price != data.price) ||
      (old.reduction && old.reduction != data.reduction)
    ) {
      await this.reposHis.save(
        this.reposHis.create({
          plateId: old.id,
          price: data.price,
          reduction: data.reduction,
        }),
      );
    }
    return { ...old, data };
  }
  async addPhoto(id: number, file: Express.Multer.File) {
    const img = await this.docRepos.save(this.docRepos.create({ ...file }));
    const plateFile = await this.plateFileRepos.save(
      this.plateFileRepos.create({ photoId: img.id, plateId: id }),
    );
    return plateFile;
  }
  async getCurrentPlateHistory(id: number) {
    return await this.reposHis
      .createQueryBuilder('plate_history')
      .where('plate_history.plateId = :plateId', { id })
      .orderBy('plate_history.createdAt', 'DESC')
      .getOne();
  }
}
