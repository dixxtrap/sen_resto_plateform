import { Injectable } from '@nestjs/common';
import { PlateService } from '../plate/plate.service';
import { IPagination } from 'src/dto/pagination';

@Injectable()
export class WebService {
  constructor(private plat: PlateService) {}
  getPlate(filter: IPagination) {
    return this.plat.getPlateForWeb(filter);
  }
}
