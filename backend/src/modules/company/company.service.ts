import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyDto } from 'src/dto/company.dto';
import { CompanyContactDto } from 'src/dto/contact.dto';
import { RestaurantDto } from 'src/dto/restaurant.dto';
import { Company, CompanyContact, Restaurant, User } from 'src/typeorm';
import { MustBeEntityError, Repository } from 'typeorm';
import { PermissionService } from '../permission/permission.service';
import { DocumentService } from '../document_file/document_file.service';
import { FileDocumentDto } from 'src/dto/file.dto';

@Injectable()
export class CompanyService implements OnModuleInit {
  constructor(
    @InjectRepository(Restaurant)
    private restosService: Repository<Restaurant>,
    @InjectRepository(Company)
    private company: Repository<Company>,
    @InjectRepository(CompanyContact)
    private companycontact: Repository<CompanyContact>,
    @InjectRepository(User)
    private user: Repository<User>,
    private permission: PermissionService,
    private doc: DocumentService,
  ) {}
  onModuleInit() {
    // this.getHello()
  }
  getHello() {
    this.createCompany({
      userId: 1,
      description: 'no description',
      email: 'senresto@gmail.com',
      name: 'Sen Resto',
      phone: '221772371668',
      short_name: 'SR',
      laltitude: 0,
      longitude: 0,
      profile: new FileDocumentDto(),
    });
  }
  async createCompany(companyDto: CompanyDto) {
    const role = await this.permission.getRoleByName('ADMIN', 'COMPANY');
    const cp = this.company.create({ ...companyDto, profile: { size: 0 } });
    const company = await this.company.save(cp);
    return company;
  }
  async getCompanys() {
    return await this.company.find({
      relations: { profile: true, restaurants: { profile: true } },
    });
  }
  async getCompany(id: number) {
    return await this.company.findOne({
      where: { id: id },
      relations: { profile: true, restaurants: { profile: true } },
    });
  }

  async updateCompany(company: CompanyDto) {
    console.log(company);

    const result = await this.company.update(company.id, {
      ...company,
    });
    if (result.affected && result.affected > 0) {
      return true; // Update successful
    }

    return false;
  }
  // Contanct
  async createCompanyContact(companyContact: CompanyContactDto) {
    const contactDoc = await this.companycontact.create(companyContact);
    return await this.companycontact.save(contactDoc);
  }
  async updateCompanyContact(id: number, companyContact: CompanyContactDto) {
    const contactDoc = await this.companycontact.update(id, companyContact);
    return await contactDoc;
  }
  // Restaurant
  async getRestaurants() {
    return await this.restosService.find({
      where: { isDelecetd: false },
      relations: { company: { profile: true }, profile: true },
    });
  }
  async getRestaurantParticulier() {
    return await this.restosService.find({
      where: { isDelecetd: false, company: { short_name: 'SR' } },
      relations: { company: true, profile: true },
    });
  }
  async getRestaurant(id: number) {
    return await this.restosService.findOne({
      where: { isDelecetd: false, id: id },
      relations: { company: { profile: true }, profile: true },
    });
  }
  async createRestaurant(restos: RestaurantDto, company?: Company) {
    const rst = this.restosService.create({
      ...restos,
      company: company,
      profile: { size: 0 },
    });
    return await this.restosService.save(rst);
  }
  async deleteRestaurant(id: number) {
    return await this.restosService.update(id, { isDelecetd: true });
  }
  async updateRestaurant(id: number, restos: RestaurantDto) {
    console.log(restos);
    const result = await this.restosService.findOneBy({ id });
    if (result) {
      await this.restosService.save({ id: id, ...result, ...restos });

      return { message: 'Transaction affectuer avec success' };
    }

    throw new MustBeEntityError('Oups!!! Something went wrong', 'message 2');
  }
}
