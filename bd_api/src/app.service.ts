import { Injectable } from '@nestjs/common';
import { CompanyService } from './modules/company/company.service';

@Injectable()
export class AppService {
  constructor(public companyService: CompanyService) {}
  getHello(): string {
    return 'Hello World!';
  }
}
