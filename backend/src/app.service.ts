import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserService } from './modules/user/user.service';
import { CompanyRestaurantService } from './modules/partner/company_restaurant/company.service';
import { RoleService } from './modules/role/role.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private dataSource: DataSource,
    private user: UserService,
    private company: CompanyRestaurantService,
    private role: RoleService,
  ) {}
  onModuleInit() {
    // this.iniPlateForm();
  }
  async iniPlateForm() {
    this.role.initRole().then((role) => {
      return this.user.createAdmin(role.id).then((user) => {
        return this.company.itinitCompany();
      });
    });
  }
  async getHello() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.query('use sen_resto_test ');
    const tables = await queryRunner.query('show tables  ');
    await queryRunner.release();
    return (tables as unknown as { Tables_in_sen_resto_test: string }[]).map(
      (item) => item.Tables_in_sen_resto_test,
    );
  }
}
